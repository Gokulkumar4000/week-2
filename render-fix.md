# 🔧 Fix Render Build Error - Step by Step

## Problem
Render is trying to build frontend dependencies (vite) which aren't needed for backend-only deployment.

## Solution
Follow these exact steps to fix the build error:

### Step 1: Update Render Configuration
In your Render dashboard:

1. Go to your service settings
2. Update the **Build Command** to:
   ```bash
   npm install --production && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
   ```

### Step 2: Alternative - Use Backend-Only Package
If the above doesn't work, replace your `package.json` with the backend-only version:

1. **Backup your current package.json**
2. **Copy `backend-only.json` content to `package.json`**
3. **Push to GitHub**
4. **Trigger Render redeploy**

### Step 3: Manual Deploy Command
If you prefer to keep the current structure, use this build command in Render:

```bash
npm install express @neondatabase/serverless drizzle-orm drizzle-zod google-auth-library googleapis memorystore passport passport-local ws zod zod-validation-error connect-pg-simple express-session esbuild && npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist
```

### Step 4: Environment Variables (Don't Forget!)
Set these in Render:
- `NODE_ENV` = `production`
- `GOOGLE_SERVICE_ACCOUNT_KEY` = (your JSON key)
- `GOOGLE_SHEET_ID` = (your sheet ID)

## Quick Test
Once deployed, test:
```bash
curl https://your-service.onrender.com/health
```

Should return:
```json
{"status":"healthy","timestamp":"...","service":"feedbackpro-backend","version":"1.0.0"}
```