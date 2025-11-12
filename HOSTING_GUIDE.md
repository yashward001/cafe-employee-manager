# Hosting Guide for Cafe Employee Manager

This project consists of:
- **Backend**: Node.js + Express API (port 8080)
- **Frontend**: React + Vite SPA (served separately)
- **Database**: PostgreSQL (via Docker Compose or managed service)

## Recommended Hosting Options

### Option 1: Railway.app (⭐ Recommended for Beginners)

**Pros**: Free tier, GitHub integration, automatic deployments, built-in PostgreSQL
**Cons**: Limited free tier resources

#### Steps:
1. Push code to GitHub (already done ✓)
2. Go to [railway.app](https://railway.app) and sign up with GitHub
3. Create new project → Import GitHub repo
4. Add PostgreSQL plugin
5. Configure environment variables:
   ```
   DATABASE_URL=postgres://user:pass@host:port/db
   NODE_ENV=production
   ```
6. Deploy backend and frontend separately
7. Update frontend `api.ts` to point to deployed backend URL

---

### Option 2: Vercel + Render (Popular & Free Tier)

**Vercel**: Perfect for React frontend
**Render**: Good for Node.js backend + PostgreSQL

#### Frontend (Vercel):
1. Go to [vercel.com](https://vercel.com) → Import project
2. Select `cafe-employee-frontend` folder
3. Build command: `npm run build`
4. Output: `dist`
5. Deploy

#### Backend (Render):
1. Go to [render.com](https://render.com) → New Web Service
2. Connect GitHub repo
3. Build command: `npm install && npm run build`
4. Start command: `npm start`
5. Add PostgreSQL database
6. Set environment variables

#### Connect Frontend to Backend:
Update `cafe-employee-frontend/src/services/api.ts`:
```typescript
const API_BASE_URL = process.env.VITE_API_URL || 'https://your-backend.onrender.com';
```

Add to `cafe-employee-frontend/.env.production`:
```
VITE_API_URL=https://your-backend.onrender.com
```

---

### Option 3: Docker + Cloud Run (Google Cloud)

**Pros**: Scalable, competitive pricing
**Cons**: Slightly steeper learning curve

#### Steps:
1. Create separate Dockerfiles for backend and frontend
2. Push images to Google Container Registry
3. Deploy to Cloud Run
4. Create Cloud SQL PostgreSQL instance
5. Connect services via environment variables

---

### Option 4: AWS (Fargate + RDS)

**Pros**: Enterprise-grade, scalable
**Cons**: Can get expensive, more configuration needed

#### Steps:
1. Use ECS Fargate for containers
2. RDS for PostgreSQL
3. CloudFront for static frontend assets
4. API Gateway or ALB for backend

---

## Pre-Deployment Checklist

- [ ] Fix type imports in frontend (change `import { Cafe }` to `import type { Cafe }`)
- [ ] Update Dockerfile to use pinned Node version: `node:18.19.0-alpine`
- [ ] Create `.env.production` files with production URLs
- [ ] Run `npm run build` locally to ensure no errors
- [ ] Test with `docker-compose up --build` locally
- [ ] Update CORS in backend to allow frontend domain
- [ ] Remove `console.log` statements from production code
- [ ] Set `NODE_ENV=production`

---

## Database Setup for Hosting

### Option A: Managed PostgreSQL (Recommended)
- Railway, Render, Supabase, or AWS RDS handle backups & updates
- Just provide `DATABASE_URL` connection string

### Option B: Self-Hosted PostgreSQL Container
- Use Docker container (more maintenance required)
- Ensure volume persistence for data

---

## Environment Variables

Create `.env` file for backend:
```
NODE_ENV=production
DATABASE_URL=postgres://user:password@host:5432/cafe_db
PORT=8080
```

Create `.env.production` for frontend:
```
VITE_API_URL=https://your-api-domain.com
```

---

## Post-Deployment

1. Verify backend health: `GET https://your-api/health`
2. Check frontend loads: `https://your-frontend-domain.com`
3. Test API calls from frontend
4. Monitor logs for errors
5. Set up automated backups for database

---

## Next Steps

**Quickest path**: 
1. Use **Railway.app** or **Vercel + Render**
2. Fix remaining TypeScript errors
3. Push to GitHub
4. Deploy in 5-10 minutes

Need help with a specific platform?
