# Google Sheets Integration Setup

## Overview
Your FeedbackPro system automatically saves customer feedback to Google Sheets for backup and easy data analysis.

## Setup Steps

### 1. Create Google Service Account
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"

### 2. Create Service Account
1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Fill in details:
   - Name: `feedbackpro-service`
   - Description: `Service account for FeedbackPro feedback storage`
4. Click "Create and Continue"
5. Skip role assignment (click "Continue")
6. Click "Done"

### 3. Generate Service Account Key
1. Click on the created service account
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Select "JSON" format
5. Download the JSON file
6. **Important**: Keep this file secure - it contains credentials

### 4. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it: "FeedbackPro Customer Reviews"
4. Add headers in Row 1:
   - A1: `Timestamp`
   - B1: `Rating`
   - C1: `Sentiment`
   - D1: `Comment`
   - E1: `Email`

### 5. Share Sheet with Service Account
1. In your Google Sheet, click "Share"
2. Add the service account email (from the JSON file: `client_email` field)
3. Give "Editor" permissions
4. Click "Send"

### 6. Get Sheet ID
From your Google Sheet URL:
```
https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit
```
Copy the `SHEET_ID_HERE` part.

## Environment Variables for Render

Set these in your Render dashboard:

### GOOGLE_SERVICE_ACCOUNT_KEY
Paste the entire JSON content as a single line string:
```json
{"type":"service_account","project_id":"your-project","private_key_id":"...","private_key":"-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n","client_email":"feedbackpro-service@your-project.iam.gserviceaccount.com","client_id":"...","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://oauth2.googleapis.com/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_x509_cert_url":"..."}
```

### GOOGLE_SHEET_ID
```
1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms
```

## Testing the Integration

### Test API Endpoint
```bash
curl -X POST https://your-backend.onrender.com/api/reviews \
  -H "Content-Type: application/json" \
  -d '{
    "rating": 5,
    "comment": "Great service!",
    "sentiment": "positive",
    "email": "customer@example.com"
  }'
```

### Expected Result
1. **API Response**: Review saved with timestamp
2. **Google Sheet**: New row added with the feedback data
3. **Dashboard**: Data appears in charts and statistics

## Data Flow
```
Customer Feedback Form (Netlify)
    ↓
Backend API (Render)
    ↓
Memory Storage + Google Sheets
    ↓
Admin Dashboard (Charts & Analytics)
```

## Troubleshooting

### Common Issues:
1. **Permission Denied**: Check service account has Editor access to sheet
2. **Invalid Credentials**: Verify JSON format in environment variable
3. **Sheet Not Found**: Confirm GOOGLE_SHEET_ID is correct
4. **API Quota**: Google Sheets API has usage limits

### Check Logs:
- Render deployment logs show Google Sheets errors
- API calls continue to work even if Sheets integration fails
- Data is always saved to memory storage as primary

## Security Notes
- Service account JSON contains sensitive credentials
- Never commit credentials to version control
- Use Render's secure environment variables
- Regularly rotate service account keys if needed