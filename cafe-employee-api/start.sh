#!/bin/sh
set -e

echo "🔧 Running database migrations..."
npx prisma db push --accept-data-loss

echo "📊 Seeding database (if needed)..."
npm run seed || echo "⚠️ Seed failed or already seeded, continuing..."

echo "🚀 Starting server..."
npm start
