#!/bin/sh
set -e

echo "🔧 Running database migrations..."
node node_modules/prisma/build/index.js db push --accept-data-loss

echo "📊 Seeding database (if needed)..."
npm run seed || echo "⚠️ Seed failed or already seeded, continuing..."

echo "🚀 Starting server..."
npm start