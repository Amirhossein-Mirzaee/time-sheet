# Quick Deployment Guide

## 🚀 Deploy in 10 Minutes

### Backend Deployment (Railway.app)

1. Go to https://railway.app → Sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Click on the service → Settings:
   - Root Directory: `server`
   - Start Command: `npm start`
5. Add Environment Variable:
   - Key: `JWT_SECRET`
   - Value: (generate random string)
6. Copy your Railway URL (e.g., `https://your-app.up.railway.app`)

### Frontend Deployment (GitHub Pages - Works in Iran ✅)

**Option 1: GitHub Pages (Automatic via GitHub Actions)**

1. **Add GitHub Secret:**
   - Go to repo → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.up.railway.app/api`

2. **Enable GitHub Pages:**
   - Go to repo → **Settings** → **Pages**
   - Source: **GitHub Actions**

3. **Push to main branch:**
   - GitHub Actions will automatically build and deploy
   - Your site: `https://yourusername.github.io/your-repo-name/`

**Option 2: Netlify (Alternative)**

1. Go to https://netlify.com → Sign up with GitHub
2. Click "Add new site" → "Import an existing project"
3. Select your repository
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.up.railway.app/api`
6. Click "Deploy site"

**Option 3: Cloudflare Pages (Works in Iran ✅)**

1. Go to https://pages.cloudflare.com → Sign up
2. Create project → Connect to Git
3. Select repository
4. Framework: **Vite**
5. Build command: `npm run build`
6. Build output: `dist`
7. Add Environment Variable: `VITE_API_URL`

### Done! ✅

Your app is now live:
- Frontend: `https://yourusername.github.io/your-repo-name/` (GitHub Pages)
- Backend: `https://your-app.railway.app`

## 🔄 Auto-Deploy

- **GitHub Pages**: Deploys automatically via GitHub Actions on every push
- **Railway**: Auto-deploys on every push
- **Netlify/Cloudflare**: Auto-deploys on every push

## 📝 Notes

- Railway provides persistent storage (your JSON database will work!)
- All services are **free** for small apps
- No credit card required for free tiers
- **GitHub Pages and Cloudflare Pages work in Iran** ✅

## 🌍 Iran-Friendly Options

- ✅ **GitHub Pages** - Free, works in Iran
- ✅ **Cloudflare Pages** - Free, works in Iran
- ✅ **Railway** - Backend hosting, works in Iran
- ⚠️ **Vercel** - Blocked in Iran
- ✅ **Netlify** - Alternative frontend option

See `DEPLOYMENT.md` for detailed instructions.

