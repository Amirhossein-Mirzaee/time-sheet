# Deployment Guide - Timesheet Tracker PWA

## Option 1: Deploy to Vercel (Recommended - Easiest)

### Method A: Using Vercel Website (No CLI needed)

1. **Create a GitHub account** (if you don't have one):
   - Go to https://github.com
   - Sign up for free

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

3. **Deploy to Vercel**:
   - Go to https://vercel.com
   - Sign up with your GitHub account (free)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your app will be live at: `https://your-project-name.vercel.app`

4. **Install on your phone**:
   - Open the deployed URL on your phone's browser
   - The PWA will prompt you to "Add to Home Screen"
   - Or go to browser menu → "Add to Home Screen"

### Method B: Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - Your app will be deployed instantly!

---

## Option 2: Deploy to Netlify (Alternative)

1. **Build your project** (already done):
   ```bash
   npm run build
   ```

2. **Go to Netlify**:
   - Visit https://netlify.com
   - Sign up for free

3. **Deploy**:
   - Drag and drop the `dist` folder to Netlify
   - Or connect your GitHub repo
   - Your app will be live!

---

## Option 3: Deploy to GitHub Pages

1. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**:
   ```json
   "scripts": {
     "deploy": "npm run build && gh-pages -d dist"
   }
   ```

3. **Deploy**:
   ```bash
   npm run deploy
   ```

---

## After Deployment

### Install PWA on Your Phone:

1. **Android**:
   - Open the app URL in Chrome
   - Tap the menu (3 dots) → "Add to Home Screen"
   - The app will appear like a native app

2. **iPhone**:
   - Open the app URL in Safari
   - Tap the Share button → "Add to Home Screen"
   - The app will appear on your home screen

### Features Available:
- ✅ Works offline (after first visit)
- ✅ Full-screen experience
- ✅ Fast loading
- ✅ Data saved in browser (localStorage)
- ✅ Vibration feedback
- ✅ Mobile-optimized UI

---

## Troubleshooting

### If PWA doesn't install:
- Make sure you're using HTTPS (Vercel/Netlify provide this automatically)
- Check that manifest.json and service worker are accessible
- Try clearing browser cache

### If data is lost:
- Data is stored in browser's localStorage
- Clearing browser data will remove saved entries
- Consider backing up important data

---

## Free Hosting Comparison

| Service | Free Tier | HTTPS | Custom Domain | Best For |
|---------|-----------|-------|---------------|----------|
| Vercel | ✅ Unlimited | ✅ | ✅ | React/Vite apps |
| Netlify | ✅ 100GB bandwidth | ✅ | ✅ | Static sites |
| GitHub Pages | ✅ Unlimited | ✅ | ✅ | Open source |

**Recommendation**: Use **Vercel** - it's the easiest and best for React/Vite projects!

