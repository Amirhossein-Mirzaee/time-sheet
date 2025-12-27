# Deployment Guide for Iran 🇮🇷

This guide provides Iran-friendly deployment options that work without VPN.

## ✅ Recommended Setup (Works in Iran)

### Frontend: GitHub Pages
### Backend: Railway.app

Both services work without restrictions in Iran!

---

## Step 1: Deploy Backend (Railway.app)

1. **Go to [Railway.app](https://railway.app)**
   - Sign up with GitHub
   - Railway works in Iran ✅

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure Service**
   - Click on the deployed service
   - Go to Settings → General:
     - **Root Directory**: `server`
     - **Start Command**: `npm start`

4. **Add Environment Variables**
   - Go to Variables tab
   - Add:
     - `JWT_SECRET`: (any random string, e.g., `my-secret-key-12345`)

5. **Get Your Backend URL**
   - Railway will provide a URL like: `https://your-app.up.railway.app`
   - Copy this URL!

---

## Step 2: Deploy Frontend (GitHub Pages)

### Option A: Automatic Deployment (GitHub Actions)

1. **Add GitHub Secret:**
   ```
   Repository → Settings → Secrets and variables → Actions
   → New repository secret
   ```
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.up.railway.app/api`
   - (Replace with your Railway URL from Step 1)

2. **Update vite.config.js:**
   ```js
   base: '/your-repo-name/', // Change to your GitHub repo name
   ```
   Or use `/` if deploying to custom domain.

3. **Enable GitHub Pages:**
   ```
   Repository → Settings → Pages
   → Source: GitHub Actions
   ```

4. **Push to main branch:**
   - GitHub Actions will automatically deploy
   - Your site: `https://yourusername.github.io/your-repo-name/`

### Option B: Manual Deployment

1. **Build locally:**
   ```powershell
   npm run build
   ```

2. **Deploy to gh-pages:**
   ```powershell
   npm run deploy
   ```

3. **Enable Pages:**
   - Go to Settings → Pages
   - Source: `gh-pages` branch
   - Folder: `/ (root)`

---

## Step 3: Alternative Frontend Options

### Cloudflare Pages (Works in Iran ✅)

1. **Go to [Cloudflare Pages](https://pages.cloudflare.com)**
2. **Sign up** (free account)
3. **Create project** → Connect to Git
4. **Configure:**
   - Framework: **Vite**
   - Build command: `npm run build`
   - Build output: `dist`
5. **Environment Variables:**
   - `VITE_API_URL`: `https://your-backend-url.up.railway.app/api`

---

## Summary

✅ **Frontend**: GitHub Pages (Free, Works in Iran)
✅ **Backend**: Railway.app (Free tier, Works in Iran)
✅ **Database**: JSON file (stored on Railway, persistent)
✅ **Total Cost**: $0/month

---

## Your URLs

After deployment:
- **Frontend**: `https://yourusername.github.io/your-repo-name/`
- **Backend**: `https://your-app.up.railway.app`
- **Health Check**: `https://your-app.up.railway.app/api/health`

---

## Troubleshooting

### Frontend can't connect to backend?
- Check `VITE_API_URL` is set correctly in GitHub Secrets
- Verify Railway backend is running
- Check CORS settings in `server/server.js`

### GitHub Pages shows 404?
- Make sure `base` in `vite.config.js` matches your repo name
- Check GitHub Pages is enabled in Settings
- Wait 1-2 minutes for deployment to complete

### Backend not responding?
- Check Railway logs
- Verify environment variables are set
- Ensure database file has write permissions

---

## Advantages

✅ **No VPN needed** - Both GitHub and Railway work in Iran
✅ **Free** - All services have free tiers
✅ **Auto-deploy** - Deploys automatically on git push
✅ **Persistent data** - Railway stores your JSON database permanently
