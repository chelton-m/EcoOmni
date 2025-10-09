import io
import json
import re
import os
from typing import Dict, Any, List, Tuple

import httpx
import pandas as pd
from fastapi import UploadFile

OLLAMA_BASE_URL_DEFAULT = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL_DEFAULT = os.getenv("OLLAMA_MODEL", "llama3")
OLLAMA_TIMEOUT_SECONDS = int(os.getenv("OLLAMA_TIMEOUT_SECONDS", "120"))


def _read_headers_from_upload(
    upload_file: UploadFile,
) -> Tuple[List[str], bytes]:
    """Read only the header row from CSV/XLSX without loading full data.

    Returns a tuple of (headers, raw_bytes) where raw_bytes are the original
    file bytes for any downstream processing if needed.
    """
    content: bytes = upload_file.file.read()
    if not content:
        raise ValueError("Empty file uploaded")

    buffer = io.BytesIO(content)
    filename = upload_file.filename or ""
    lower_name = filename.lower()

    try:
        if lower_name.endswith(".csv"):
            df = pd.read_csv(buffer, nrows=0)
        elif lower_name.endswith(".xlsx") or lower_name.endswith(".xls"):
            df = pd.read_excel(buffer, nrows=0, engine="openpyxl")
        else:
            # Try CSV as a fallback
            buffer.seek(0)
            df = pd.read_csv(buffer, nrows=0)
    except Exception as exc:
        raise ValueError(f"Failed to parse file headers: {exc}")

    headers = [str(c) for c in df.columns.tolist()]
    return headers, content


def _build_prompt(headers: List[str]) -> str:
    headers_list = ", ".join([f'"{h}"' for h in headers])
    return (
        "You are assisting with onboarding point-of-sale export files for a "
        "coffee shop. Given a list of column headers, return a STRICT JSON "
        "object that maps to canonical keys: item_name, quantity_sold, "
        "sale_price.\n\n"
        "Rules:\n"
        "- Respond ONLY with a compact JSON object. No prose.\n"
        "- Use keys exactly: item_name, quantity_sold, sale_price.\n"
        "- Values must be from headers, or null if not present.\n"
        "- Prefer semantic matches (e.g., 'Product' -> item_name; "
        "'Qty' -> quantity_sold; 'Unit Price' -> sale_price).\n"
        "- If multiple headers could match, pick the most likely.\n\n"
        f"Headers: [{headers_list}]\n\n"
        "Return JSON only, e.g.: {\"item_name\": \"Product\", "
        "\"quantity_sold\": \"Qty\", \"sale_price\": null}"
    )


def _call_ollama(
    prompt: str,
    model: str = OLLAMA_MODEL_DEFAULT,
    base_url: str = OLLAMA_BASE_URL_DEFAULT,
    timeout_s: int = OLLAMA_TIMEOUT_SECONDS,
) -> str:
    """Call a local Ollama server and return the raw text response with simple retry."""
    url = f"{base_url.rstrip('/')}/api/generate"
    payload = {
        "model": model,
        "prompt": prompt,
        "stream": False,
        "options": {"temperature": 0},
    }

    def do_request(client_timeout: int) -> str:
        with httpx.Client(timeout=client_timeout) as client:
            resp = client.post(url, json=payload)
            resp.raise_for_status()
            data = resp.json()
            return data.get("response", "").strip()

    try:
        return do_request(timeout_s)
    except httpx.ReadTimeout:
        # One-time retry with longer timeout to allow first-load model warmup
        return do_request(timeout_s * 2)


def _parse_json_object(text: str) -> Dict[str, Any]:
    """Parse a JSON object from model output.

    Tolerates minor wrapping text by extracting the first {...} block
    if needed.
    """
    try:
        parsed = json.loads(text)
        if isinstance(parsed, dict):
            return parsed
    except Exception:
        pass

    match = re.search(r"\{[\s\S]*\}", text)
    if not match:
        raise ValueError("Model did not return a JSON object")
    obj_text = match.group(0)
    try:
        return json.loads(obj_text)
    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Invalid JSON from model: {exc}"
        )


def _sanitize_mapping(
    raw: Dict[str, Any],
    headers: List[str],
) -> Dict[str, Any]:
    canonical_keys = ["item_name", "quantity_sold", "sale_price"]
    headers_set = set(headers)
    result: Dict[str, Any] = {}
    for key in canonical_keys:
        value = raw.get(key)
        if isinstance(value, str) and value in headers_set:
            result[key] = value
        else:
            result[key] = None
    return result


async def create_mapping_from_file(
    upload_file: UploadFile,
    model_name: str = OLLAMA_MODEL_DEFAULT,
    ollama_url: str = OLLAMA_BASE_URL_DEFAULT,
) -> Dict[str, Any]:
    """
    Orchestrate creation of a column mapping using a local LLM.

    - Reads only the header row using pandas.
    - Calls a private local Ollama model with a constrained prompt.
    - Parses and validates the returned JSON mapping.

    Returns a dictionary like:
      {"item_name": "Product", "quantity_sold": "Qty", "sale_price": "Price"}
    """
    try:
        headers, _ = _read_headers_from_upload(upload_file)
    finally:
        try:
            upload_file.file.seek(0)
        except Exception:
            pass

    prompt = _build_prompt(headers)

    try:
        raw_text = _call_ollama(
            prompt=prompt,
            model=model_name,
            base_url=ollama_url,
        )
        raw_obj = _parse_json_object(raw_text)
        mapping = _sanitize_mapping(raw_obj, headers)
    except httpx.HTTPError as http_exc:
        raise RuntimeError(f"LLM HTTP error: {http_exc}")
    except httpx.ReadTimeout:
        raise RuntimeError("LLM HTTP error: timed out")
    except ValueError as val_exc:
        raise RuntimeError(
            f"Failed to generate mapping: {val_exc}"
        )

    return {"mapping": mapping, "columns": headers}
