# ---- Base image ----
FROM node:22-bullseye

WORKDIR /app

# Install OS utilities for wait script
RUN apt-get update && apt-get install -y netcat-openbsd && rm -rf /var/lib/apt/lists/*

# ---- Install dependencies ----
COPY package.json package-lock.json* ./
RUN npm ci --no-audit

# ---- Copy source ----
COPY . .

# ---- Build the app ----
RUN npm run build

# ---- Start command ----
# Always ensure dist exists before start (for extra safety)
CMD ["/bin/sh", "-c", "if [ ! -d dist ]; then npm run build; fi && npm start"]