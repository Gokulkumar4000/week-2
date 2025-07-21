# Google Sheets Integration Troubleshooting

## Current Issue
Your Render backend is working, but data isn't appearing in your Google Sheet.

## Sheet Details
Your Google Sheet: https://docs.google.com/spreadsheets/d/1WKYfPumkpy42J0ATDU5mF76uvU8MQGJwRMXDu1e_fnQ/edit

## Required Setup Steps

### 1. Create Google Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API:
   - APIs & Services → Library → Search "Google Sheets API" → Enable

### 2. Create Service Account Credentials
1. APIs & Services → Credentials
2. Create Credentials → Service Account
3. Name: `feedbackpro-sheets`
4. Create & download the JSON key file

### 3. Share Your Sheet
**CRITICAL STEP**: You must share your Google Sheet with the service account email.

1. Open your sheet: https://docs.google.com/spreadsheets/d/1WKYfPumkpy42J0ATDU5mF76uvU8MQGJwRMXDu1e_fnQ/edit
2. Click "Share" button
3. Add the service account email (from the JSON file - looks like: `feedbackpro-sheets@your-project.iam.gserviceaccount.com`)
4. Give "Editor" permissions
5. Click "Send"

### 4. Set Environment Variables in Render
1. Go to your Render service → Environment
2. Add these variables:

**GOOGLE_SHEET_ID:**
```
1WKYfPumkpy42J0ATDU5mF76uvU8MQGJwRMXDu1e_fnQ
```

**GOOGLE_SERVICE_ACCOUNT_KEY:**
Paste the entire JSON content as one line:
```json
{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"feedbackpro-sheets@your-project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

### 5. Prepare Your Sheet Headers
Add these headers in Row 1 of your sheet:
- A1: `Timestamp`
- B1: `Rating` 
- C1: `Sentiment`
- D1: `Comment`
- E1: `Email`

### 6. Test Integration
After setting up, test by submitting a review through your Netlify form. Data should appear in both:
- Your Render API: `/api/reviews`
- Your Google Sheet: New rows added automatically

## Common Issues

### Permission Denied
- Verify service account email has been added to sheet with Editor access
- Check that the email from JSON file matches what you shared the sheet with

### Invalid Credentials
- Ensure JSON is properly formatted as single line in environment variable
- No extra spaces or line breaks in the JSON

### Sheet Not Found
- Verify GOOGLE_SHEET_ID matches your sheet URL
- Confirm sheet is accessible (not private)

### API Quota Exceeded
- Google Sheets API has usage limits
- For high volume, consider upgrading Google Cloud plan

## Debug Steps
1. Check Render logs for Google Sheets errors
2. Verify environment variables are set correctly
3. Test API endpoints directly
4. Confirm sheet permissions are correct

## Fallback Behavior
Even if Google Sheets fails, your API continues working:
- Data is always saved to memory storage
- Dashboard and analytics work normally
- Google Sheets is backup only, not primary storage