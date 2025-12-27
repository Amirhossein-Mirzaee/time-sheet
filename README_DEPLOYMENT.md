# Complete Deployment Guide - GitHub Pages + Backend

## ⚠️ Important: GitHub Pages Limitation

**GitHub Pages CANNOT run Node.js backends** - it only hosts static HTML/CSS/JS files.

### Solution:
- ✅ **Frontend**: GitHub Pages (yourusername.github.io/time-sheet)
- ✅ **Backend**: Railway.app (free, works in Iran)

Both will be accessible and work together!

---

## Quick Setup (5 minutes)

### Step 1: Deploy Backend to Railway

1. Go to **https://railway.app** → Sign up with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Select repository: **time-sheet**
4. **Settings** → **General**:
   - Root Directory: `server`
   - Start Command: `npm start`
5. **Variables** tab → Add:
   - Name: `JWT_SECRET`
   - Value: `my-secret-key-12345`
6. **Copy your Railway URL** (e.g., `https://time-sheet-production.up.railway.app`)

### Step 2: Configure Frontend

1. **Add GitHub Secret:**
   - Go to: `https://github.com/Amirhossein-Mirzaee/time-sheet/settings/secrets/actions`
   - **New repository secret**
   - Name: `VITE_API_URL`
   - Value: `https://your-railway-url.up.railway.app/api`

2. **Enable GitHub Pages:**
   - Go to: `https://github.com/Amirhossein-Mirzaee/time-sheet/settings/pages`
   - Source: **GitHub Actions**

### Step 3: Push and Deploy

```powershell
git add .
git commit -m "Ready for deployment"
git push origin main
```

GitHub Actions will automatically deploy your frontend!

### Step 4: Your Live URLs

- **Frontend**: `https://amirhossein-mirzaee.github.io/time-sheet/`
- **Backend**: `https://your-railway-url.up.railway.app`

---

## Why This Setup?

✅ **Frontend on GitHub Pages:**
- Free forever
- Works in Iran
- Auto-deploys on every push
- Accessible at `github.io` domain

✅ **Backend on Railway:**
- Free tier available
- Works in Iran
- Persistent storage (database saved)
- Can run Node.js servers

---

## Alternative: Everything on GitHub (Not Possible)

Unfortunately, GitHub Pages **cannot** run Node.js backends. There is no way to host both on `github.io`.

**Options if you want "everything on GitHub":**
1. Convert backend to serverless functions (major code rewrite)
2. Use GitHub Codespaces (complex, expensive)
3. **Best**: Use Railway for backend (5 minutes setup, free, works in Iran)

---

## Your Repository

- **Repo Name**: `time-sheet`
- **GitHub URL**: `https://github.com/Amirhossein-Mirzaee/time-sheet`
- **Frontend URL**: `https://amirhossein-mirzaee.github.io/time-sheet/` (after deployment)

The `vite.config.js` is already configured with the correct repo name!

