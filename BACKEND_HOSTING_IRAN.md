# Backend Hosting Options (Works in Iran)

GitHub Pages **cannot host Node.js backends** (it only hosts static files). Here are Iran-friendly alternatives:

## ✅ Recommended: Railway.app (FREE)

**Why Railway?**
- ✅ Works in Iran
- ✅ Free tier ($5 credit/month)
- ✅ Persistent storage (your JSON database works!)
- ✅ Easy GitHub integration
- ✅ Automatic HTTPS

**Setup:**
1. Go to https://railway.app
2. Sign up with GitHub
3. New Project → Deploy from GitHub repo
4. Root Directory: `server`
5. Start Command: `npm start`
6. Add `JWT_SECRET` environment variable

---

## ✅ Alternative: Render.com (FREE)

**Why Render?**
- ✅ Works in Iran (usually)
- ✅ Free tier available
- ⚠️ Database resets on redeploy (ephemeral storage)

**Setup:**
1. Go to https://render.com
2. Sign up
3. New Web Service → Connect GitHub
4. Root Directory: `server`
5. Build: `npm install`
6. Start: `npm start`

---

## ✅ Alternative: Fly.io (FREE)

**Why Fly.io?**
- ✅ Works in Iran
- ✅ Free tier (3 shared-cpu VMs)
- ✅ Persistent volumes available

---

## ❌ Not Recommended for Backend:

- **GitHub Pages**: Only static files, no Node.js
- **Netlify Functions**: Limited execution time
- **Vercel**: Blocked in Iran

---

## Recommended Setup:

**Frontend:** GitHub Pages ✅
**Backend:** Railway.app ✅
**Total Cost:** $0/month

Both work in Iran without VPN!

