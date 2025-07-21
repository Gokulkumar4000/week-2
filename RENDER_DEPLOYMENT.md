# Render Deployment Guide for FeedbackPro Backend

## Prerequisites

1. **Render Account**: Create a free account at [render.com](https://render.com)
2. **GitHub Repository**: Your code should be in a GitHub repository
3. **Environment Variables**: Prepare your environment variables

## Deployment Steps

### Step 1: Connect Repository to Render

1. Go to your Render dashboard
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Select the repository containing this project

### Step 2: Configure Web Service

Use these settings:

- **Name**: `feedbackpro-backend` (or your preferred name)
- **Language**: `Node`
- **Branch**: `main` (or your default branch)
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Instance Type**: `Free` (or paid plan for production)

### Step 3: Set Environment Variables

Add these environment variables in Render:

**Required:**
- `NODE_ENV`: `production`
- `PORT`: `10000` (Render automatically sets this)

**Optional (for Google Sheets integration):**
- `GOOGLE_SERVICE_ACCOUNT_KEY`: Your Google service account JSON (as string)
- `GOOGLE_SHEET_ID`: Your Google Sheet ID
- `DATABASE_URL`: PostgreSQL connection string (if using database)
- `FRONTEND_URL`: `https://gokulkumar-week-2.netlify.app`

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically deploy your application
3. Your backend will be available at: `https://your-service-name.onrender.com`

## Frontend Configuration

Update your Netlify frontend to use the Render backend URL:

1. In your frontend code, update API calls to use: `https://your-service-name.onrender.com`
2. Add environment variable `VITE_API_URL` in Netlify settings
3. Redeploy your frontend

## Testing

Once deployed, test these endpoints:

- `GET https://your-service-name.onrender.com/api/reviews`
- `POST https://your-service-name.onrender.com/api/reviews`
- `GET https://your-service-name.onrender.com/api/reviews/stats`

## Important Notes

- **Cold Starts**: Free tier has ~1 minute cold start delay after inactivity
- **CORS**: Already configured for your Netlify domain
- **Database**: Using in-memory storage by default (data won't persist between deployments)
- **Google Sheets**: Optional backup storage for reviews

## Troubleshooting

### Common Issues:

1. **Build Fails**: Check that all dependencies are in `dependencies` (not `devDependencies`)
2. **CORS Errors**: Verify your Netlify URL is in the CORS origins list
3. **Environment Variables**: Double-check sensitive variables are properly set
4. **Port Issues**: Render automatically sets PORT to 10000

### Logs:

Check Render logs for debugging:
1. Go to your service in Render dashboard
2. Click "Logs" tab
3. Look for error messages during build or runtime

## Production Considerations

For production use, consider:

1. **Paid Plan**: For better performance and no cold starts
2. **Database**: Set up PostgreSQL database service on Render
3. **Monitoring**: Add health check endpoints
4. **SSL**: Automatically provided by Render
5. **Custom Domain**: Can be configured in Render settings