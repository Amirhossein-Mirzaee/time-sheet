# Deployment Guide

This guide will help you deploy both the frontend and backend of the Timesheet Tracker app.

## Deployment Options

### Option 1: Free Deployment (Recommended)

#### Frontend → GitHub Pages (Free) - Works in Iran ✅
#### Backend → Railway.app (Free) or Render.com (Free)

### Option 2: Alternative Frontend Hosting
- **Netlify** (Free) - Alternative to Vercel
- **Cloudflare Pages** (Free) - Works in Iran ✅
- **GitHub Pages** (Free) - Works in Iran ✅

---

## Step 1: Deploy Backend (Railway.app - Recommended)

### Why Railway?
- ✅ Free tier available
- ✅ Persistent storage (your JSON database will work!)
- ✅ Easy deployment from GitHub
- ✅ Automatic HTTPS

### Setup:

1. **Go to [Railway.app](https://railway.app)**
2. **Sign up with GitHub**
3. **Create New Project**
4. **Deploy from GitHub repo**
   - Select your repository
   - Railway will auto-detect it's a Node.js app
5. **Configure the service:**
   - Root Directory: `server`
   - Start Command: `npm start`
   - Build Command: (leave empty or `npm install`)
6. **Add Environment Variables:**
   - `JWT_SECRET`: (generate a random string)
   - `PORT`: (Railway sets this automatically, but you can set `3001` if needed)
7. **Get your backend URL:**
   - Railway will give you a URL like: `https://your-app.up.railway.app`
   - Copy this URL!

---

## Step 2: Deploy Frontend (Vercel - Recommended)

### Why Vercel?
- ✅ Free tier
- ✅ Automatic HTTPS
- ✅ Easy GitHub integration
- ✅ Fast global CDN

### Setup:

1. **Go to [Vercel.com](https://vercel.com)**
2. **Sign up with GitHub**
3. **Import your repository**
4. **Configure:**
   - Framework Preset: **Vite**
   - Root Directory: `.` (leave default)
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. **Add Environment Variable:**
   - `VITE_API_URL`: `https://your-backend-url.up.railway.app/api`
   - (Use the Railway URL from Step 1)
6. **Deploy!**

---

## Alternative: Deploy to Render.com (Backend)

### Setup Render.com:

1. **Go to [Render.com](https://render.com)**
2. **Sign up**
3. **Create New Web Service**
4. **Connect GitHub repository**
5. **Configure:**
   - Name: `timesheet-tracker-api`
   - Region: Choose closest
   - Branch: `main`
   - Root Directory: `server`
   - Environment: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
6. **Add Environment Variables:**
   - `JWT_SECRET`: (random string)
7. **Get URL and update frontend's `VITE_API_URL`**

---

## Step 3: Update GitHub Secrets (Optional)

If using GitHub Actions, add secrets:

1. Go to your repo → **Settings** → **Secrets and variables** → **Actions**
2. Add:
   - `VITE_API_URL`: Your backend URL (e.g., `https://your-app.railway.app/api`)

---

## Step 4: Update Frontend Environment

Create `.env.production` file:

```env
VITE_API_URL=https://your-backend-url.up.railway.app/api
```

This will be used for production builds.

---

## Quick Deploy Script

After setting up Railway and Vercel:

1. **Backend is auto-deployed** on every push to `main`
2. **Frontend is auto-deployed** on every push to `main`
3. **Update `VITE_API_URL`** in Vercel environment variables with your Railway backend URL

---

## Database Persistence

### Railway.app
✅ JSON file database works! Railway provides persistent storage.

### Render.com
⚠️ Ephemeral filesystem - database will reset on redeploy. Consider using a free database:
- MongoDB Atlas (free tier)
- Supabase (free tier)
- Or use Railway instead

---

## Testing Deployment

1. **Backend Health Check:**
   ```
   https://your-backend-url.railway.app/api/health
   ```
   Should return: `{"status":"OK","message":"Timesheet Tracker API is running"}`

2. **Frontend:**
   - Visit your Vercel URL
   - Try signing up/logging in
   - Data should persist!

---

## Troubleshooting

### Backend not connecting?
- Check Railway logs
- Verify `PORT` environment variable
- Ensure database file has write permissions

### Frontend can't reach backend?
- Check CORS settings in `server/server.js`
- Verify `VITE_API_URL` is set correctly
- Check browser console for errors

### Database resets?
- Use Railway.app (persistent storage)
- Or migrate to a cloud database (MongoDB Atlas, Supabase)

---

## Free Tier Limits

### Railway
- $5 free credit/month (usually enough for small apps)
- 500 hours of usage
- Persistent storage ✅

### Vercel
- Unlimited bandwidth
- 100GB bandwidth/month
- Automatic HTTPS

### Render
- Free tier available
- Spins down after 15min inactivity
- Ephemeral storage (database resets)

---

## Cost

**Total: $0/month** ✅

Both Railway and Vercel free tiers are sufficient for this application.
