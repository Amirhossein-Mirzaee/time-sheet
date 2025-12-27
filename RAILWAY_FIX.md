# Railway Health Check Fix

## What I Fixed

1. ✅ Added root health check endpoint (`/`) - Railway checks this by default
2. ✅ Server now binds to `0.0.0.0` (required for Railway)
3. ✅ Updated railway.json with health check configuration
4. ✅ Improved error handling for database initialization

## Railway Configuration

Make sure in Railway dashboard:

1. **Settings → General:**
   - Root Directory: `server`
   - Start Command: `npm start`

2. **Settings → Healthcheck:**
   - Healthcheck Path: `/` (or leave default)
   - Healthcheck Timeout: `300` seconds

3. **Variables:**
   - `JWT_SECRET`: (any random string)

## Check Railway Logs

1. Go to Railway dashboard
2. Click on your service
3. Click **"Deploy Logs"** tab
4. Look for:
   - ✅ `Database ready`
   - ✅ `Server running on port XXXX`
   - ✅ `Health check: http://0.0.0.0:XXXX/`

## Test Health Check

After deployment, test:
- Root: `https://your-railway-url.up.railway.app/`
- API: `https://your-railway-url.up.railway.app/api/health`

Both should return: `{"status":"OK","message":"Timesheet Tracker API is running"}`

## Common Issues

**"Cannot find module" errors:**
- Make sure Root Directory is set to `server` in Railway
- Check that `server/package.json` exists

**"Port already in use":**
- Railway sets PORT automatically, don't override it
- Remove PORT from environment variables if you added it

**Health check still failing:**
- Wait 1-2 minutes after deployment
- Check Deploy Logs for startup errors
- Verify the server is actually running (look for "Server running" in logs)

