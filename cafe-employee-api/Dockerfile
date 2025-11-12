# ---- Base image ----
FROM node:18.19.0-alpine

WORKDIR /app

# Install OS utilities for wait script
RUN apk add --no-cache netcat-openbsd

# ---- Install dependencies ----
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ---- Copy source ----
COPY . .

# ---- Build the app ----
RUN npm run build

# ---- Expose API port ----
EXPOSE 8080

# ---- Start server ----
# Run migrations & seed AFTER container starts (when DB is reachable)
CMD ["sh", "-c", "npx prisma migrate deploy && npx prisma db seed && npm start"]