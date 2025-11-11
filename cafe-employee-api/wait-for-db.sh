#!/bin/sh
set -e

echo "⏳ Waiting for database at $DATABASE_URL..."
until nc -z db 5432; do
  sleep 1
done

echo "✅ Database is ready, running Prisma setup..."
npx prisma db push
npm run seed || true
echo "🚀 Starting server..."
npm start