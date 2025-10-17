# Deployment Guide for FluxTrade

## Prerequisites
- ✅ MongoDB Atlas account (DONE)
- GitHub account (you have it)
- Vercel account (free)
- Render account (free)

---

## Part 1: Deploy Backend to Render (5 minutes)

### Step 1: Create Render Account
1. Go to: https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (easiest - use your nabin00012 account)

### Step 2: Create New Web Service
1. Click "New +" → "Web Service"
2. Connect to your GitHub repository: "FluxTrade"
3. Configure:
   - **Name:** `fluxtrade-backend`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

### Step 3: Add Environment Variables
In the Render dashboard, add these environment variables:

```
MONGODB_URI=

NODE_ENV=production

JWT_SECRET=fluxtrade-super-secret-key-2025-production

PORT=5000
```

### Step 4: Deploy
- Click "Create Web Service"
- Wait 3-5 minutes for deployment
- Copy your backend URL (will be something like: `https://fluxtrade-backend.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel (3 minutes)

### Step 1: Create Vercel Account
1. Go to: https://vercel.com
2. Click "Sign Up"
3. Sign up with GitHub (use your nabin00012 account)

### Step 2: Import Project
1. Click "Add New..." → "Project"
2. Import "FluxTrade" from your GitHub
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

### Step 3: Add Environment Variables
Before deploying, add these:

```
VITE_API_URL=https://fluxtrade-backend.onrender.com/api
VITE_CHAIN_ID=1
```

(Replace `fluxtrade-backend.onrender.com` with your actual Render URL from Part 1)

### Step 4: Deploy
- Click "Deploy"
- Wait 2-3 minutes
- Your app will be live at: `https://flux-trade-xxx.vercel.app`

---

## Part 3: Update Backend CORS

After Vercel gives you the frontend URL:

1. Go back to Render dashboard
2. Find your `fluxtrade-backend` service
3. Go to "Environment" tab
4. Add new variable:
   ```
   FRONTEND_URL=https://your-vercel-url.vercel.app
   ```
5. Click "Save Changes"
6. Service will auto-redeploy

---

## ✅ Done! Your app is live!

**Frontend:** `https://your-app.vercel.app`
**Backend:** `https://fluxtrade-backend.onrender.com`
**Database:** MongoDB Atlas (already working)

---

## Important Notes:

⚠️ **Blockchain:** 
- Local Hardhat blockchain won't work in production
- You need to either:
  - Deploy to Ethereum Sepolia testnet (requires test ETH)
  - Use Polygon Mumbai testnet (free)
  - Keep it as UI-only for now (just show the design)

⚠️ **Free Tier Limitations:**
- Render: Server sleeps after 15 min of inactivity (takes 30s to wake)
- Vercel: Unlimited bandwidth for hobby projects
- MongoDB Atlas: 512MB storage free

---

## Need Help?
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: Already configured ✅
