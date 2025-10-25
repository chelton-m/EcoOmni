# syntax=docker/dockerfile:1
FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# Install runtime dependencies and build tools for testing
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies (including testing dependencies)
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code, scripts, and tests
COPY app ./app
COPY public ./public
COPY scripts ./scripts
COPY tests ./tests

# Default envs (override in compose/k8s)
ENV DATABASE_URL="sqlite:////app/app.db" \
    SECRET_KEY="docker-test-secret-key-change-in-production"

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
