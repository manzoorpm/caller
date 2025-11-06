# Fixing "JWT is invalid" Error (Code 31204)

## Problem

You're seeing this error in the browser console:

```
[TwilioVoice][PStream] Received: {"payload":{"error":{"code":31204,"message":"JWT is invalid"}}
```

## Root Cause

The access token is being generated using your **Account SID** and **Auth Token**, but Twilio Voice requires an **API Key** and **API Secret** for creating access tokens.

## Solution

### Step 1: Create Twilio API Key

1. Go to Twilio Console: https://console.twilio.com/
2. Navigate to **Account** > **API keys & tokens**
3. Click **Create API key**
4. Give it a name (e.g., "Auradial Voice API Key")
5. Select **Standard** as the key type
6. Click **Create API Key**
7. **IMPORTANT**: Copy both the **SID** (starts with SK...) and **Secret** immediately - you won't see the secret again!

### Step 2: Update Environment Variables

Add the new API credentials to your `.env.local` file:

```env
# Twilio Account Credentials
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here

# Twilio API Key (for Access Tokens)
TWILIO_API_KEY=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_SECRET=your_api_secret_here

# Twilio TwiML App
TWILIO_TWIML_APP_SID=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

### Step 3: Update Token Generation

The token route has been updated to use API Key instead of Account SID.

### Step 4: Restart Development Server

```bash
# Stop the dev server (Ctrl+C)
# Start it again
npm run dev
```

### Step 5: Test

1. Refresh the page: http://localhost:3000/test
2. You should now see "✓ Twilio Connected" instead of the error
3. Try making a test call

## Verification

Check that your `.env.local` file has all these variables:

```env
TWILIO_ACCOUNT_SID=ACxxxxxx...       # Your account SID (from console main page)
TWILIO_AUTH_TOKEN=xxxxxxx...         # Your auth token (from console main page)
TWILIO_API_KEY=SKxxxxxx...           # API Key SID (created in step 1)
TWILIO_API_SECRET=xxxxxxx...         # API Secret (created in step 1)
TWILIO_TWIML_APP_SID=APxxxxxx...     # Your TwiML App SID
TWILIO_PHONE_NUMBER=+1234567890      # Your Twilio phone number
```

## Common Mistakes

1. **Using Account SID instead of API Key**: The Account SID starts with "AC", but API Keys start with "SK"
2. **Using Auth Token instead of API Secret**: These are different credentials
3. **Not restarting the dev server**: Environment variables only load on startup

## Still Having Issues?

1. **Check Twilio Console Debugger**: https://console.twilio.com/us1/monitor/logs/debugger
2. **Verify API Key is active**: Go to Account > API keys & tokens and confirm your key is there
3. **Check browser console**: Look for any other error messages
4. **Verify TwiML App SID**: Make sure it's correct and starts with "AP"

## Security Note

**NEVER commit `.env.local` to Git!**

Make sure it's in your `.gitignore`:

```
.env.local
.env*.local
```
