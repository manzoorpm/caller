# Twilio Error 31005 - Connection Error

## Error Message

```
ConnectionError (31005): Error sent from gateway in HANGUP
```

## What This Means

✅ **Good News:**

- Microphone permission is working
- Twilio Device is registered
- Call attempt was initiated successfully

❌ **Issue:**

- The TwiML App Voice URL is not configured correctly
- OR the Voice URL endpoint is returning an error
- OR you're on a trial account calling an unverified number

## Common Causes & Solutions

### 1. TwiML App Voice URL Not Set

**Check:**

1. Go to: https://console.twilio.com/
2. Navigate to: **Voice** → **TwiML Apps**
3. Click on your TwiML App
4. Check **Voice Request URL**

**Problem:** URL is empty or incorrect

**Solution:**

For local development, you need **ngrok**:

```bash
# Terminal 1 - Keep your dev server running
npm run dev

# Terminal 2 - Start ngrok
ngrok http 3000
```

ngrok will give you a URL like: `https://abc123.ngrok.io`

Then:

1. Copy the **HTTPS** URL from ngrok
2. Go back to TwiML App settings
3. Set **Voice Request URL** to: `https://abc123.ngrok.io/api/twilio/voice`
4. Set **HTTP Method** to: **POST**
5. Click **Save**

### 2. Trial Account - Calling Unverified Number

**Check:**
Are you on a Twilio trial account?

**Problem:** Trial accounts can only call **verified numbers**

**Solution:**

**Option A: Verify the number you're calling**

1. Go to: https://console.twilio.com/us1/develop/phone-numbers/manage/verified
2. Click **Add a new number**
3. Enter the phone number you want to call
4. Verify it (you'll receive a code via SMS)

**Option B: Upgrade to paid account**

1. Go to: https://console.twilio.com/billing
2. Add payment method
3. You can now call any number

### 3. Voice URL Returning Error

**Check Twilio Debugger:**

1. Go to: https://console.twilio.com/us1/monitor/logs/debugger
2. Look for recent errors
3. Check what error the Voice URL is returning

**Common issues:**

- Voice URL is unreachable
- Voice URL returning HTML instead of TwiML (XML)
- Voice URL has syntax errors in TwiML

**Test your Voice URL:**

Open a new terminal and test:

```bash
curl -X POST https://your-ngrok-url.ngrok.io/api/twilio/voice \
  -d "To=+1234567890"
```

You should get XML like:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Dial callerId="+1234567890">
    <Number>+1234567890</Number>
  </Dial>
</Response>
```

### 4. Check API Route

Make sure `/api/twilio/voice/route.ts` exists and is correct:

```typescript
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const to = formData.get("To") as string;

    const twiml = new VoiceResponse();

    if (!to) {
      twiml.say("No destination number provided. Goodbye.");
      twiml.hangup();
    } else {
      const dial = twiml.dial({
        callerId: process.env.TWILIO_PHONE_NUMBER,
      });
      dial.number(to);
    }

    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  } catch (error) {
    console.error("Error generating TwiML:", error);
    const twiml = new VoiceResponse();
    twiml.say("An error occurred. Please try again later.");
    twiml.hangup();

    return new NextResponse(twiml.toString(), {
      headers: {
        "Content-Type": "text/xml",
      },
    });
  }
}
```

## Step-by-Step Fix (Most Likely Issue)

You probably just need to set up ngrok. Here's how:

### Step 1: Install ngrok (if not installed)

**Mac (with Homebrew):**

```bash
brew install ngrok
```

**Or download from:** https://ngrok.com/download

### Step 2: Start ngrok

```bash
# In a new terminal (keep dev server running)
ngrok http 3000
```

You'll see output like:

```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

### Step 3: Update Twilio TwiML App

1. Copy the **https** URL (e.g., `https://abc123.ngrok.io`)
2. Go to: https://console.twilio.com/us1/develop/voice/manage/twiml-apps
3. Click your TwiML App
4. Set **Voice Request URL** to: `https://abc123.ngrok.io/api/twilio/voice`
5. Set **HTTP Method** to: **POST**
6. Click **Save**

### Step 4: Test Again

1. Go to: http://localhost:3000/test
2. Enter a phone number (must be verified if on trial)
3. Click **Call**
4. Should work now!

## Verification

### Check ngrok traffic

ngrok shows all requests. You should see:

```
POST /api/twilio/voice    200 OK
```

### Check Twilio Debugger

Go to: https://console.twilio.com/us1/monitor/logs/debugger

You should see:

- ✅ Call initiated
- ✅ TwiML App executed
- ✅ Call connected

### Check Browser Console

Should see:

```
[TwilioVoice][Call] Call accepted
```

## Still Getting Error 31005?

### Check these:

1. **ngrok is running** in a separate terminal
2. **TwiML App Voice URL** uses the **HTTPS** ngrok URL
3. **Calling a verified number** (if on trial account)
4. **Phone number format** includes country code: `+1234567890`
5. **TWILIO_PHONE_NUMBER** in `.env.local` is correct

### Debug Tips

**Check server logs:**

```bash
# You should see requests when calls are made
# Look for /api/twilio/voice requests
```

**Test Voice URL directly:**

```bash
curl -X POST http://localhost:3000/api/twilio/voice \
  -d "To=+1234567890"
```

Should return XML (TwiML).

## Production Setup

For production (not localhost):

1. Deploy your app (Vercel, AWS, etc.)
2. Get your production URL (e.g., `https://yourdomain.com`)
3. Update TwiML App Voice URL to: `https://yourdomain.com/api/twilio/voice`
4. No ngrok needed in production!

## Related Documentation

- [TWILIO_SETUP.md](TWILIO_SETUP.md) - Full setup guide with ngrok
- [QUICKSTART.md](../QUICKSTART.md) - Quick start guide
- [Twilio Error 31005 Docs](https://www.twilio.com/docs/api/errors/31005)
