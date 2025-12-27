# Next Steps - Deployment Checklist ✅

Follow these steps in order:

## Step 1: Update Configuration

1. **Update `vite.config.js`:**
   - Change `'my-project'` to your actual GitHub repository name
   - Example: If your repo is `timesheet-tracker`, change to `/timesheet-tracker/`

## Step 2: Push to GitHub

1. **Commit all changes:**
   ```powershell
   git add .
   git commit -m "Setup deployment configuration"
   git push origin main
   ```

## Step 3: Deploy Backend (Railway.app)

1. **Go to https://railway.app**
2. **Sign up with GitHub**
3. **Click "New Project"** → **"Deploy from GitHub repo"**
4. **Select your repository**
5. **Configure the service:**
   - Click on the deployed service
   - Go to **Settings** → **General**
   - Set **Root Directory**: `server`
   - Set **Start Command**: `npm start`
6. **Add Environment Variable:**
   - Go to **Variables** tab
   - Click **+ New Variable**
   - Name: `JWT_SECRET`
   - Value: `my-secret-key-change-this-12345` (any random string)
7. **Get your backend URL:**
   - Railway will show a URL like: `https://your-app.up.railway.app`
   - **Copy this URL!** You'll need it for the next step

## Step 4: Deploy Frontend (GitHub Pages)

1. **Add GitHub Secret:**
   - Go to your GitHub repo
   - Click **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `VITE_API_URL`
   - Value: `https://your-backend-url.up.railway.app/api`
     - (Replace with your actual Railway URL from Step 3)
   - Click **Add secret**

2. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Under **Source**, select: **GitHub Actions**

3. **Trigger deployment:**
   - Go to **Actions** tab in your repo
   - If workflow doesn't run automatically, click **"Deploy Frontend to GitHub Pages"** → **Run workflow**

4. **Wait for deployment:**
   - Check the Actions tab
   - Wait for green checkmark ✅
   - Your site will be at: `https://yourusername.github.io/your-repo-name/`

## Step 5: Test Your Deployment

1. **Test backend:**
   - Visit: `https://your-backend-url.railway.app/api/health`
   - Should show: `{"status":"OK","message":"Timesheet Tracker API is running"}`

2. **Test frontend:**
   - Visit your GitHub Pages URL
   - Try signing up/logging in
   - Create some timesheet entries
   - Data should save and persist!

## Step 6: Share Your App! 🎉

Your app is now live and accessible from anywhere!

---

## Quick Command Summary

```powershell
# 1. Update vite.config.js (change repo name)

# 2. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 3. Deploy backend on Railway.app (follow Step 3 above)

# 4. Add GitHub Secret VITE_API_URL (follow Step 4 above)

# 5. Enable GitHub Pages (follow Step 4 above)
```

---

## Troubleshooting

**Backend not working?**
- Check Railway logs
- Verify environment variables are set
- Make sure Root Directory is `server`

**Frontend can't connect to backend?**
- Check `VITE_API_URL` secret is set correctly
- Verify backend URL is accessible
- Check browser console for CORS errors

**GitHub Pages showing 404?**
- Verify `base` in `vite.config.js` matches your repo name
- Check GitHub Pages is enabled
- Wait 1-2 minutes for deployment

---

## Need Help?

Check these files for more details:
- `DEPLOY_IRAN.md` - Detailed Iran-friendly deployment guide
- `DEPLOYMENT.md` - Complete deployment documentation
- `README_DEPLOY.md` - Quick deployment reference

