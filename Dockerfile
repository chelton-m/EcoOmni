# syntax=docker/dockerfile:1
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install only runtime dependencies (no build tools)
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies using pre-built wheels
COPY requirements.txt ./
RUN pip install --no-cache-dir --only-binary=all -r requirements.txt

# Copy application code and public assets
COPY app ./app
COPY public ./public

# Default envs (override in compose/k8s)
ENV DATABASE_URL="sqlite:////app/app.db" \
    OLLAMA_BASE_URL="http://ollama:11434" \
    OLLAMA_MODEL="llama3"

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
