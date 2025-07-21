# Complete Render + Netlify Deployment Guide

## 🎯 Overview
Your FeedbackPro project will have:
- **Frontend**: Already deployed at `https://gokulkumar-week-2.netlify.app/`
- **Backend**: Will deploy to Render (e.g., `https://feedbackpro-backend.onrender.com`)

## 📋 Pre-Deployment Checklist

✅ **Files Ready for Render:**
- `package.json` - Contains all backend dependencies
- `render.yaml` - Render configuration
- `server/` - Backend source code
- `shared/` - Shared TypeScript schemas
- Health endpoint at `/health`
- CORS configured for your Netlify domain

## 🚀 Step-by-Step Render Deployment

### Step 1: Prepare Your Repository
1. **Push to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Prepare backend for Render deployment"
   git push origin main
   ```

### Step 2: Create Render Web Service
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Click **"Connect a repository"** and authorize GitHub
4. Select your repository containing this project

### Step 3: Configure the Service
Use these exact settings:

| Setting | Value |
|---------|--------|
| **Name** | `feedbackpro-backend` |
| **Language** | `Node` |
| **Branch** | `main` |
| **Root Directory** | *(leave blank)* |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### Step 4: Set Environment Variables
In Render's Environment section, add:

| Key | Value | Required |
|-----|-------|----------|
| `NODE_ENV` | `production` | ✅ Yes |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | *(your JSON key as string)* | ❌ Optional |
| `GOOGLE_SHEET_ID` | *(your sheet ID)* | ❌ Optional |
| `FRONTEND_URL` | `https://gokulkumar-week-2.netlify.app` | ❌ Optional |

### Step 5: Deploy
1. Click **"Create Web Service"**
2. Render will automatically build and deploy
3. Wait for the build to complete (5-10 minutes)
4. Your backend will be available at: `https://your-service-name.onrender.com`

## 🔗 Connect Frontend to Backend

### Option A: Update Frontend Code (Recommended)
Update your frontend to use the Render backend URL:

1. **In your frontend repository**, update API calls to use:
   ```javascript
   const API_BASE_URL = 'https://your-service-name.onrender.com';
   ```

2. **Or use environment variables** in Netlify:
   - Go to Netlify dashboard → Site settings → Environment variables
   - Add: `VITE_API_URL` = `https://your-service-name.onrender.com`
   - Redeploy your frontend

### Option B: Use Current Setup
Your backend is already configured to accept requests from `https://gokulkumar-week-2.netlify.app`, so it should work immediately.

## 🧪 Testing Your Deployment

Once deployed, test these endpoints:

```bash
# Health check
curl https://your-service-name.onrender.com/health

# Get reviews
curl https://your-service-name.onrender.com/api/reviews

# Post a review
curl -X POST https://your-service-name.onrender.com/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Test review",
    "sentiment": "positive",
    "email": "test@example.com"
  }'

# Get stats
curl https://your-service-name.onrender.com/api/reviews/stats
```

## 🔧 Troubleshooting

### Common Issues:

**1. Build Fails**
- Check that all dependencies are in `dependencies` section
- Review build logs in Render dashboard

**2. CORS Errors**
- Verify your Netlify URL is correctly configured
- Check browser developer tools for exact error

**3. Environment Variables**
- Double-check variable names and values
- Sensitive data should be added securely in Render

**4. Cold Starts (Free Tier)**
- First request after inactivity takes ~1 minute
- Consider paid plan for production use

### Where to Check Logs:
1. **Render Dashboard** → Your Service → **"Logs"** tab
2. **Browser Console** → Network tab for API errors
3. **Netlify Functions** → Function logs (if using)

## 📊 Expected Results

After successful deployment:

✅ **Backend Health Check**: `https://your-service-name.onrender.com/health`
✅ **Frontend**: `https://gokulkumar-week-2.netlify.app/`
✅ **API Communication**: Frontend can submit reviews and view dashboard
✅ **CORS**: No cross-origin errors
✅ **Data Flow**: Reviews → Backend → Optional Google Sheets backup

## 🔄 Continuous Deployment

Once set up:
- **Backend**: Auto-deploys when you push to GitHub
- **Frontend**: Already set up on Netlify
- **Updates**: Push code → Automatic deployment on both platforms

## 💡 Production Tips

For production use:
1. **Upgrade Render Plan**: Eliminates cold starts
2. **Add Database**: PostgreSQL service on Render
3. **Environment Security**: Use Render's secret management
4. **Monitoring**: Set up health check alerts
5. **Custom Domain**: Configure in Render settings

---

**Need Help?** 
- Check Render's build logs for specific errors
- Verify all environment variables are set correctly
- Test API endpoints individually before testing frontend integration