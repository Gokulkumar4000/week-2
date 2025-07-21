# 🔧 Google Sheets Integration - Quick Fix

## Issue
Your Render backend is working perfectly, but Google Sheets isn't receiving data because the authentication isn't set up.

## Your Sheet
https://docs.google.com/spreadsheets/d/1WKYfPumkpy42J0ATDU5mF76uvU8MQGJwRMXDu1e_fnQ/edit

## Quick Setup (5 Steps)

### Step 1: Create Google Service Account
1. Go to https://console.cloud.google.com/
2. Create new project or select existing
3. Enable Google Sheets API:
   - Click "APIs & Services" → "Library"
   - Search "Google Sheets API" → Click "Enable"

### Step 2: Create Credentials
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Name: `feedbackpro-service`
4. Click "Create and Continue" → Skip roles → "Done"
5. Click on the service account you just created
6. Go to "Keys" tab → "Add Key" → "Create new key" → "JSON"
7. Download the JSON file

### Step 3: Share Your Sheet (CRITICAL)
1. Open your Google Sheet
2. Click "Share" button (top right)
3. In the JSON file you downloaded, find `"client_email"` field
4. Copy that email address (looks like: `feedbackpro-service@your-project.iam.gserviceaccount.com`)
5. Add this email to your sheet with "Editor" permissions
6. Click "Send"

### Step 4: Set Render Environment Variables
Go to your Render service → Environment and add:

**GOOGLE_SHEET_ID:**
```
1WKYfPumkpy42J0ATDU5mF76uvU8MQGJwRMXDu1e_fnQ
```

**GOOGLE_SERVICE_ACCOUNT_KEY:**
Copy the entire content of your downloaded JSON file as a single line. Example:
```json
{"type":"service_account","project_id":"your-project-123","private_key_id":"abc123","private_key":"-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n","client_email":"feedbackpro-service@your-project-123.iam.gserviceaccount.com","client_id":"123456789","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs/feedbackpro-service%40your-project-123.iam.gserviceaccount.com"}
```

### Step 5: Prepare Sheet Headers
In your Google Sheet, add these headers in Row 1:
- A1: `Timestamp`
- B1: `Rating`
- C1: `Sentiment` 
- D1: `Comment`
- E1: `Email`

## Test the Integration
1. After setting environment variables, redeploy your Render service
2. Submit a test review through your Netlify form
3. Check your Google Sheet - new data should appear automatically

## Verify It's Working
- Check Render logs for any Google Sheets errors
- Submit test review via your frontend
- Confirm data appears in both API (`/api/reviews`) and Google Sheet

The most common issue is forgetting to share the sheet with the service account email - make sure you complete Step 3!