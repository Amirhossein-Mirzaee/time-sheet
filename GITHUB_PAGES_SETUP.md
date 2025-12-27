# Deploy to GitHub Pages - Complete Guide

## Understanding the Limitation

**GitHub Pages only hosts static files** - it cannot run Node.js/Express backends.

### What We'll Do:
- ✅ **Frontend** → GitHub Pages (via GitHub Actions)
- ✅ **Backend** → Railway.app (free, works in Iran)

---

## Step 1: Update Repository Name

1. **Find your GitHub repo name** (e.g., `timesheet-tracker`)
2. **Update `vite.config.js`:**
   ```js
   base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
   ```
   Replace `your-repo-name` with your actual GitHub repository name.

---

## Step 2: Deploy Backend First (Railway.app)

### Why deploy backend first?
You need the backend URL to configure the frontend.

1. **Go to https://railway.app**
2. **Sign up with GitHub** (free)
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose your repository**
6. **Configure:**
   - Click on the deployed service
   - Go to **Settings** → **General**
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
7. **Add Environment Variable:**
   - Go to **Variables** tab
   - **Name**: `JWT_SECRET`
   - **Value**: `my-secret-key-12345` (any random string)
8. **Get Backend URL:**
   - Railway shows: `https://your-app-name.up.railway.app`
   - **Copy this URL!**

---

## Step 3: Configure Frontend for GitHub Pages

1. **Add GitHub Secret:**
   ```
   Repository → Settings → Secrets and variables → Actions
   → New repository secret
   ```
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-app-name.up.railway.app/api`
   - (Use your Railway URL from Step 2)

2. **Enable GitHub Pages:**
   ```
   Repository → Settings → Pages
   → Source: GitHub Actions
   ```

---

## Step 4: Push to GitHub

```powershell
git add .
git commit -m "Configure for GitHub Pages deployment"
git push origin main
```

---

## Step 5: Deploy Frontend

After pushing, GitHub Actions will automatically:
1. Build your frontend
2. Deploy to GitHub Pages
3. Your site will be live at: `https://yourusername.github.io/your-repo-name/`

You can check progress in: **Actions** tab

---

## Step 6: Test Everything

1. **Backend Health:**
   ```
   https://your-railway-app.up.railway.app/api/health
   ```
   Should return: `{"status":"OK",...}`

2. **Frontend:**
   - Visit: `https://yourusername.github.io/your-repo-name/`
   - Try signing up/logging in
   - Create timesheet entries
   - Everything should work!

---

## Your Live URLs

- **Frontend**: `https://yourusername.github.io/your-repo-name/`
- **Backend**: `https://your-railway-app.up.railway.app`
- **Health Check**: `https://your-railway-app.up.railway.app/api/health`

---

## Why This Setup?

✅ **Frontend on GitHub Pages:**
- Free
- Works in Iran
- Automatic HTTPS
- Auto-deploy on push

✅ **Backend on Railway:**
- Free tier
- Works in Iran
- Persistent storage (database saved)
- Can run Node.js

---

## Alternative: Everything on GitHub (Limited)

If you REALLY want everything on GitHub:

**Option 1: Use GitHub Codespaces** (complex, not practical)

**Option 2: Convert to serverless** (major code changes needed)

**Option 3: Use GitHub Actions as API** (not recommended, very limited)

**Best: Use the recommended setup above** ✅

