# Simple Deployment - Step by Step

## Your Repository
- **Name**: `time-sheet`
- **GitHub**: `github.com/Amirhossein-Mirzaee/time-sheet`
- **Will be live at**: `amirhossein-mirzaee.github.io/time-sheet`

---

## ⚠️ Important Note

**GitHub Pages cannot run Node.js backends**.
We'll use:
- Frontend: GitHub Pages ✅
- Backend: Railway.app (free, works in Iran) ✅

---

## Steps to Deploy

### 1️⃣ Deploy Backend (Railway) - 3 minutes

1. Visit: **https://railway.app**
2. Click **"Start a New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose **time-sheet** repository
5. After deployment, click on the service
6. Go to **Settings** → **General**:
   - Change **Root Directory** to: `server`
   - Change **Start Command** to: `npm start`
7. Go to **Variables** tab:
   - Click **+ New Variable**
   - Name: `JWT_SECRET`
   - Value: `secret123456` (any random string)
8. **Copy your Railway URL** from the top (e.g., `https://time-sheet-production-xxxx.up.railway.app`)

### 2️⃣ Configure Frontend - 2 minutes

1. Go to: `https://github.com/Amirhossein-Mirzaee/time-sheet/settings/secrets/actions`
2. Click **"New repository secret"**
3. Name: `VITE_API_URL`
4. Value: `https://your-railway-url.up.railway.app/api` (paste your Railway URL + `/api`)
5. Click **"Add secret"**

### 3️⃣ Enable GitHub Pages - 1 minute

1. Go to: `https://github.com/Amirhossein-Mirzaee/time-sheet/settings/pages`
2. Under **"Source"**, select: **"GitHub Actions"**
3. Save

### 4️⃣ Push to GitHub

```powershell
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 5️⃣ Wait and Test

1. Go to **Actions** tab in your GitHub repo
2. Wait for "Deploy Frontend to GitHub Pages" to complete (green checkmark)
3. Visit: `https://amirhossein-mirzaee.github.io/time-sheet/`
4. Test backend: `https://your-railway-url.up.railway.app/api/health`

---

## Done! 🎉

Your app is now live:
- **Frontend**: `https://amirhossein-mirzaee.github.io/time-sheet/`
- **Backend**: `https://your-railway-url.up.railway.app`

Both work together and are accessible from Iran!

---

## Why Not Both on GitHub.io?

GitHub Pages only serves static files (HTML, CSS, JavaScript). It cannot:
- Run Node.js
- Execute server code
- Handle API requests

This is a technical limitation of GitHub Pages, not something we can change.

