import os
import pandas as pd

# Detect environment and choose output path. Allow override via env.
DEFAULT_CONTAINER_PATH = "/app/public/sample_pos_template.xlsx"
DEFAULT_HOST_PATH = "/Users/henrymai/Chelton/EcoOmni/public/sample_pos_template.xlsx"

# If running inside container, /app should exist
is_container = os.path.exists("/app")

OUTPUT_PATH = os.getenv(
    "OUTPUT_PATH",
    DEFAULT_CONTAINER_PATH if is_container else DEFAULT_HOST_PATH,
)

# Example columns a coffee shop might export
columns = [
    "Product",
    "Qty",
    "Unit Price",
    "Transaction Date",
]

# A few sample rows
rows = [
    {"Product": "Latte", "Qty": 12, "Unit Price": 4.5, "Transaction Date": "2025-10-01"},
    {"Product": "Cappuccino", "Qty": 8, "Unit Price": 4.0, "Transaction Date": "2025-10-01"},
    {"Product": "Espresso", "Qty": 15, "Unit Price": 3.0, "Transaction Date": "2025-10-01"},
]

df = pd.DataFrame(rows, columns=columns)

os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
df.to_excel(OUTPUT_PATH, index=False)
print(f"Wrote template to: {OUTPUT_PATH}")
