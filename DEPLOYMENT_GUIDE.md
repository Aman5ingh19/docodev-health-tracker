# 🚀 Deployment Guide - Render + Vercel

Complete guide to deploy your Docodev.AI Health Tracker application.

---

## 📋 Overview

- **Backend:** Render (Free tier)
- **Frontend:** Vercel (Free tier)
- **Database:** MongoDB Atlas (Already set up)

---

# 🔧 Part 1: Deploy Backend to Render

## Step 1: Prepare Backend for Deployment

Your backend is already configured correctly! No changes needed.

## Step 2: Create Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)
4. Authorize Render to access your GitHub

## Step 3: Create New Web Service

1. Click "New +" button (top right)
2. Select "Web Service"
3. Connect your GitHub repository:
   - Click "Connect account" if needed
   - Find and select: `Aman5ingh19/docodev-health-tracker`
4. Click "Connect"

## Step 4: Configure Web Service

Fill in the following settings:

**Basic Settings:**
- **Name:** `docodev-health-tracker-api` (or your preferred name)
- **Region:** Choose closest to you (e.g., Oregon, Frankfurt)
- **Branch:** `main`
- **Root Directory:** `docodev-health-tracker/backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`

**Instance Type:**
- Select: **Free** (0.1 CPU, 512 MB RAM)

## Step 5: Add Environment Variables

Click "Advanced" → "Add Environment Variable"

Add these variables:

```
PORT = 5000
MONGO_URI = mongodb+srv://amans192003:JonHDwCZwk2Z6UGt@cluster0.dbexrnr.mongodb.net/docodev-ai?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET = docodev_ai_super_secret_jwt_key_2024_production_ready_minimum_32_chars
NODE_ENV = production
```

⚠️ **Important:** Use your actual MongoDB URI and JWT secret!

## Step 6: Deploy

1. Click "Create Web Service"
2. Wait for deployment (5-10 minutes)
3. Watch the logs for any errors
4. Once deployed, you'll see: "Your service is live 🎉"

## Step 7: Get Backend URL

After deployment, copy your backend URL:
- Format: `https://docodev-health-tracker-api.onrender.com`
- You'll need this for frontend deployment!

## Step 8: Test Backend

Test your backend API:
```
https://your-backend-url.onrender.com
```

You should see:
```json
{
  "message": "Welcome to Docodev.AI - AI-Powered Health Tracking API",
  "version": "1.0.0",
  "status": "active"
}
```

---

# 🎨 Part 2: Deploy Frontend to Vercel

## Step 1: Create Vercel Account

1. Go to https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (recommended)
4. Authorize Vercel to access your GitHub

## Step 2: Import Project

1. Click "Add New..." → "Project"
2. Find your repository: `Aman5ingh19/docodev-health-tracker`
3. Click "Import"

## Step 3: Configure Project

**Framework Preset:** Vite (should auto-detect)

**Root Directory:** 
- Click "Edit"
- Enter: `docodev-health-tracker/frontend`
- Click "Continue"

**Build Settings:**
- Build Command: `npm run build` (auto-filled)
- Output Directory: `dist` (auto-filled)
- Install Command: `npm install` (auto-filled)

## Step 4: Add Environment Variables

Click "Environment Variables"

Add this variable:

**Key:** `VITE_API_URL`
**Value:** `https://your-backend-url.onrender.com/api`

⚠️ **Replace with your actual Render backend URL!**

Example:
```
VITE_API_URL = https://docodev-health-tracker-api.onrender.com/api
```

**Important:** 
- Include `/api` at the end
- No trailing slash

## Step 5: Deploy

1. Click "Deploy"
2. Wait for deployment (2-5 minutes)
3. Watch the build logs
4. Once deployed, you'll see: "Congratulations! 🎉"

## Step 6: Get Frontend URL

After deployment, you'll get a URL like:
```
https://docodev-health-tracker.vercel.app
```

---

# 🔄 Part 3: Update Backend CORS

After deploying frontend, update backend CORS settings:

## Option A: Update via Render Dashboard

1. Go to your Render service
2. Click "Environment"
3. Add new environment variable:

```
FRONTEND_URL = https://your-vercel-app.vercel.app
```

## Option B: Update Code (Recommended)

Update `docodev-health-tracker/backend/server.js`:

```javascript
// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://docodev-health-tracker.vercel.app', 'https://your-custom-domain.com'] 
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true
}));
```

Then push to GitHub:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Render will auto-deploy the changes!

---

# ✅ Part 4: Verify Deployment

## Test Backend

1. Visit: `https://your-backend-url.onrender.com`
2. Should see welcome message

## Test Frontend

1. Visit: `https://your-frontend-url.vercel.app`
2. Try to register a new user
3. Login with credentials
4. Add a health record
5. View dashboard
6. Delete a record

---

# 🐛 Troubleshooting

## Backend Issues

**Build Failed:**
- Check build logs in Render
- Verify `package.json` has all dependencies
- Ensure `npm start` script exists

**MongoDB Connection Error:**
- Verify MONGO_URI is correct
- Check MongoDB Atlas IP whitelist (should be 0.0.0.0/0)
- Verify database user credentials

**Service Crashes:**
- Check logs in Render dashboard
- Verify all environment variables are set
- Check for syntax errors

## Frontend Issues

**Build Failed:**
- Check build logs in Vercel
- Verify `package.json` in frontend folder
- Ensure Vite config is correct

**API Connection Error:**
- Verify VITE_API_URL is correct
- Check if backend is running
- Verify CORS settings in backend
- Check browser console for errors

**Blank Page:**
- Check browser console for errors
- Verify build completed successfully
- Check if routes are configured correctly

---

# 🔄 Automatic Deployments

Both Render and Vercel support automatic deployments:

**When you push to GitHub:**
1. Render automatically rebuilds backend
2. Vercel automatically rebuilds frontend
3. Changes go live in 2-5 minutes

To push updates:
```bash
git add .
git commit -m "Your changes"
git push
```

---

# 📊 Free Tier Limits

## Render Free Tier:
- ✅ 750 hours/month
- ✅ 512 MB RAM
- ✅ Sleeps after 15 min inactivity
- ⚠️ First request after sleep takes 30-60 seconds

## Vercel Free Tier:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Always active (no sleep)
- ✅ Automatic HTTPS

---

# 🎯 Post-Deployment Checklist

- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS updated for production
- [ ] MongoDB connection working
- [ ] User registration working
- [ ] Login working
- [ ] Add/Edit/Delete records working
- [ ] Dashboard displaying correctly
- [ ] Custom domain configured (optional)

---

# 🌐 Custom Domain (Optional)

## For Vercel (Frontend):
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

## For Render (Backend):
1. Go to Settings → Custom Domain
2. Add your custom domain
3. Update DNS records as instructed

---

# 📝 Important URLs to Save

After deployment, save these URLs:

```
Backend API: https://your-backend.onrender.com
Frontend App: https://your-frontend.vercel.app
GitHub Repo: https://github.com/Aman5ingh19/docodev-health-tracker
MongoDB Atlas: https://cloud.mongodb.com
```

---

# 🎉 Congratulations!

Your application is now live and accessible worldwide!

**Share your project:**
- Add deployment URLs to GitHub README
- Share on LinkedIn
- Add to your portfolio
- Include in your resume

---

**Need Help?**
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Check deployment logs for errors
