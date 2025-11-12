# ---- Base image ----
FROM node:20-alpine

WORKDIR /app

# ---- Install OpenSSL for Prisma ----
RUN apk add --no-cache openssl

# ---- Install ALL dependencies (including dev for build & seed) ----
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Copy source & prisma schema ----
COPY prisma ./prisma
COPY . .

# ---- Generate Prisma Client ----
RUN npx prisma generate

# ---- Build the app ----
RUN npm run build

# ---- Keep tsx for seeding at runtime ----
# Note: We keep dev deps to ensure tsx/esbuild work correctly for seeding

# ---- Expose API port ----
EXPOSE 8080

# ---- Copy startup script ----
COPY start.sh ./
RUN chmod +x start.sh

# ---- Start server ----
CMD ["./start.sh"]