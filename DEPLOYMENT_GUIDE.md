# Deployment Guide - Cafe Employee Manager

## Prerequisites
- GitHub account (to connect repositories)
- Render/Railway account (for backend)
- Netlify account (for frontend)

---

## Step 1: Deploy Backend (API + Database)

### Option A: Deploy to Render (Recommended - Free Tier Available)

1. **Push your code to GitHub** (if not already done)
   ```bash
   cd cafe-employee-api
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Create PostgreSQL Database on Render**
   - Go to [render.com](https://render.com) and sign in
   - Click "New +" → "PostgreSQL"
   - Name: `cafe-db`
   - Plan: Free
   - Click "Create Database"
   - **Copy the "Internal Database URL"** (starts with `postgresql://`)

3. **Deploy API on Render**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `cafe-employee-api` folder (or root if monorepo)
   - Configure:
     - **Name**: `cafe-employee-api`
     - **Environment**: Node
     - **Build Command**: `npm install && npm run prisma:generate && npm run build`
     - **Start Command**: `npm start`
   - Add Environment Variables:
     - `DATABASE_URL` = (paste the Internal Database URL from step 2)
     - `PORT` = `8080`
   - Click "Create Web Service"

4. **Run Database Migration**
   - After deployment, go to your service's Shell tab
   - Run: `npx prisma db push`
   - Optional: Run seed data: `npm run seed`

5. **Copy Your API URL**
   - Your backend will be at: `https://cafe-employee-api.onrender.com`
   - API endpoints will be at: `https://cafe-employee-api.onrender.com/api`

---

### Option B: Deploy to Railway (Alternative)

1. **Go to [railway.app](https://railway.app)**
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add PostgreSQL:
   - Click "+ New" → "Database" → "Add PostgreSQL"
   - Railway auto-connects it with `DATABASE_URL`
5. Configure your service:
   - **Build Command**: `npm install && npm run prisma:generate && npm run build`
   - **Start Command**: `npm start`
   - Add env var: `PORT=8080`
6. Run migration in Railway's terminal: `npx prisma db push`
7. Copy your API URL from Railway dashboard

---

## Step 2: Deploy Frontend

1. **Update Frontend with Backend URL**
   - Create `.env.production` in `cafe-employee-frontend/`:
     ```
     VITE_API_URL=https://your-backend-url.onrender.com/api
     ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com) and sign in
   - Click "Add new site" → "Import an existing project"
   - Connect GitHub and select your repository
   - Configure:
     - **Base directory**: `cafe-employee-frontend`
     - **Build command**: `npm run build`
     - **Publish directory**: `cafe-employee-frontend/dist`
   - Add Environment Variable:
     - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`
   - Click "Deploy site"

3. **Your app is live!**
   - Frontend: `https://your-site-name.netlify.app`
   - Backend: `https://your-backend-url.onrender.com`

---

## Important Notes

⚠️ **Render Free Tier**: Services spin down after 15 minutes of inactivity and may take 30-60 seconds to wake up.

⚠️ **CORS**: The backend is already configured with CORS enabled for all origins. In production, you may want to restrict this.

⚠️ **Database**: PostgreSQL free tier on Render expires after 90 days. Consider upgrading or using another provider for long-term hosting.

---

## Quick Deployment Commands

```bash
# Backend - Run after deploying to Render/Railway
npx prisma db push
npm run seed  # Optional: seed initial data

# Frontend - Test production build locally
npm run build
npm run preview
```

---

## Troubleshooting

**Backend not connecting to database:**
- Verify `DATABASE_URL` environment variable is set correctly
- Check database is running and accessible
- Run `npx prisma db push` in the deployment shell

**Frontend shows CORS errors:**
- Verify backend CORS is enabled (already configured in your code)
- Check `VITE_API_URL` environment variable is set in Netlify

**API returns 404:**
- Ensure your backend routes are properly prefixed with `/api`
- Check build logs for errors
