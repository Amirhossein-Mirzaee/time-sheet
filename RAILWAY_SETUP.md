# Railway Setup - Step by Step

## The Issue
Railway needs to know where your server code is. Since it's in the `server` directory, you need to configure this in Railway dashboard.

## ✅ Correct Railway Configuration

### In Railway Dashboard:

1. **Go to your service → Settings → General**

2. **Set these values:**
   - **Root Directory**: `server` ⚠️ IMPORTANT!
   - **Start Command**: `npm start`
   - **Build Command**: (leave empty or `npm install`)

3. **Settings → Variables:**
   - Add: `JWT_SECRET` = `your-random-secret-key`

4. **Settings → Healthcheck:**
   - Healthcheck Path: `/` (or leave default)
   - Healthcheck Timeout: `300`

## What to Check

After setting Root Directory to `server`:

1. **Railway will:**
   - Look for `server/package.json`
   - Run `npm install` in the `server` directory
   - Run `npm start` (which runs `node server.js`)

2. **You should see in logs:**
   - ✅ `npm install` running
   - ✅ `Database ready`
   - ✅ `Server running on port XXXX`

## Important Notes

- ❌ Don't set `nixpacksConfigPath` to a directory
- ✅ Set **Root Directory** in Railway dashboard to `server`
- ✅ The `server/railway.json` file is optional (Railway will auto-detect Node.js)

## Quick Fix

1. **In Railway Dashboard:**
   - Settings → General → **Root Directory**: `server`
   - Settings → Variables → Add `JWT_SECRET`

2. **Redeploy** (or Railway will auto-redeploy on git push)

That's it! The Root Directory setting tells Railway where to find your code.

