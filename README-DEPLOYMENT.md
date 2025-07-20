# FeedbackPro Deployment Guide

## Frontend (Netlify) ✅ DEPLOYED
- **Live URL**: https://gokulkumar-week-2.netlify.app/
- **Status**: Successfully deployed

## Backend (Render) - Deploy Instructions

### Step 1: Create Render Account
1. Go to [render.com](https://render.com) and sign up/login
2. Connect your GitHub account

### Step 2: Deploy Backend
1. **Create New Web Service**
2. **Connect Repository** (if using GitHub integration)
3. **Configure Settings:**
   - **Name**: `feedbackpro-backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist`
   - **Start Command**: `node dist/index.js`

### Step 3: Set Environment Variables
Add these environment variables in Render dashboard:
- `NODE_ENV` = `production`
- `GOOGLE_SERVICE_ACCOUNT_KEY` = (Your Google Service Account JSON)
- `GOOGLE_SHEET_ID` = (Your Google Sheet ID)

### Step 4: Update Frontend (After Backend Deployment)
Once your backend is deployed at `https://feedbackpro-backend.onrender.com`, update frontend:
1. Add `VITE_API_BASE_URL=https://feedbackpro-backend.onrender.com` to Netlify environment variables
2. Redeploy frontend

## Architecture
- **Frontend**: React + Vite on Netlify
- **Backend**: Express.js on Render  
- **Storage**: Google Sheets API
- **CORS**: Configured for your Netlify domain

## Environment Variables Needed
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Your Google Service Account JSON key
- `GOOGLE_SHEET_ID`: Your Google Sheet ID for data storage