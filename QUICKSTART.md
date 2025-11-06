# Quick Start Guide - Twilio Integration

## ⚠️ You're Seeing "JWT is invalid" Error

The error you're seeing means you need to create a **Twilio API Key**. Follow these steps:

## 🔧 Fix in 5 Minutes

### 1. Create API Key in Twilio Console

Go to: https://console.twilio.com/us1/develop/api-keys-credentials/api-keys

Or navigate: **Account** → **API keys & tokens** → **Create API key**

1. Click **Create API key**
2. Name it: "Auradial Voice API"
3. Type: **Standard**
4. Click **Create**
5. **COPY BOTH VALUES NOW** (you won't see the secret again!):
   - **SID** (starts with `SK...`)
   - **Secret** (random string)

### 2. Update Your `.env.local` File

Add these two new lines to your existing `.env.local`:

```env
# Add these new lines:
TWILIO_API_KEY=SKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_API_SECRET=your_api_secret_here

# Keep your existing lines:
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_TWIML_APP_SID=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

### 3. Restart Dev Server

```bash
# Stop the server (Ctrl+C in terminal)
# Start it again
npm run dev
```

### 4. Refresh Browser

Go to: http://localhost:3000/test

You should now see:

- ✅ **"✓ Twilio Connected"** (green box at top)

## 📋 Complete Environment Variables

Your `.env.local` should have ALL of these:

```env
# Account Credentials
TWILIO_ACCOUNT_SID=ACxxxxx...        # From Twilio Console home
TWILIO_AUTH_TOKEN=xxxxxx...          # From Twilio Console home

# API Key (NEW - this fixes the JWT error)
TWILIO_API_KEY=SKxxxxx...            # Created in step 1
TWILIO_API_SECRET=xxxxxx...          # Created in step 1

# TwiML App
TWILIO_TWIML_APP_SID=APxxxxx...      # Your TwiML App
TWILIO_PHONE_NUMBER=+1234567890      # Your Twilio number
```

## 🎯 Quick Test

1. Go to http://localhost:3000/test
2. Wait for green "Twilio Connected" message
3. Enter a phone number: `+1234567890`
4. Click "Call"
5. If on trial account, you can only call verified numbers

## 📚 Detailed Guides

- **Setup Instructions**: [docs/TWILIO_SETUP.md](docs/TWILIO_SETUP.md)
- **JWT Error Fix**: [docs/TWILIO_FIX_JWT_ERROR.md](docs/TWILIO_FIX_JWT_ERROR.md)

## 🆘 Still Having Issues?

### Check Twilio Debugger

https://console.twilio.com/us1/monitor/logs/debugger

### Common Issues

1. **"Missing credentials"** → Check all 6 variables are in `.env.local`
2. **"JWT is invalid"** → Make sure you're using API Key (SK...), not Account SID (AC...)
3. **"Not ready"** → Restart dev server after changing `.env.local`
4. **Call fails** → Check TwiML App Voice URL is set correctly

## 🔐 Security

**NEVER commit `.env.local` to Git!**

It should be in your `.gitignore` already.

## 💰 Costs (Trial vs Paid)

### Trial Account Limitations:

- Can only call verified phone numbers
- Twilio plays a message before connecting
- $15 free credit

### Paid Account:

- Call any number
- No announcement message
- ~$0.01-0.02 per minute

## Next Steps

Once connected:

1. Test making a call
2. Test mute functionality
3. Try the dial pad
4. Set up ngrok for webhook testing (see TWILIO_SETUP.md)
5. Update TwiML App Voice URL
6. Make real calls!
