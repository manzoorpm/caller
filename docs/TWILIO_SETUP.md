# Twilio Voice Integration Guide

This guide walks you through integrating Twilio Voice into the Auradial application for browser-based calling.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Twilio Account Setup](#twilio-account-setup)
3. [Install Dependencies](#install-dependencies)
4. [Environment Configuration](#environment-configuration)
5. [Backend Setup](#backend-setup)
6. [Frontend Integration](#frontend-integration)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

- Twilio account (sign up at https://www.twilio.com/try-twilio)
- Node.js 20+ installed
- Credit card for Twilio (required after trial)
- A phone number to test with

## Twilio Account Setup

### Step 1: Create a Twilio Account

1. Go to https://www.twilio.com/try-twilio
2. Sign up for a free account
3. Verify your email and phone number
4. You'll receive $15 in trial credit

### Step 2: Get Your Account Credentials

1. Go to Twilio Console: https://console.twilio.com/
2. Find your **Account SID** and **Auth Token** on the dashboard
3. Save these - you'll need them for environment variables

### Step 3: Get a Twilio Phone Number

1. In the Twilio Console, go to **Phone Numbers** > **Manage** > **Buy a number**
2. Select your country (United States recommended)
3. Choose a number with **Voice** capability
4. Purchase the number (free with trial credit)
5. Save this phone number - this will be your caller ID

### Step 4: Create a TwiML Application

1. Go to **Voice** > **TwiML Apps** > **Create new TwiML App**
2. Give it a name (e.g., "Auradial Voice")
3. Leave Voice Request URL empty for now (we'll update it later)
4. Click **Save**
5. Copy the **TwiML App SID** - you'll need this

### Step 5: Configure Your Twilio Number (Optional)

1. Go to **Phone Numbers** > **Manage** > **Active numbers**
2. Click on your purchased number
3. Under **Voice Configuration**:
   - Set "A Call Comes In" to **TwiML App**
   - Select your TwiML App from the dropdown
4. Click **Save**

## Install Dependencies

Install the required Twilio packages:

```bash
npm install twilio @twilio/voice-sdk
```

## Environment Configuration

### Step 1: Update `.env.local`

Add the following environment variables to your `.env.local` file:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_account_sid_here
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_TWIML_APP_SID=your_twiml_app_sid_here
TWILIO_PHONE_NUMBER=+1234567890

# Public URL (required for production)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

Replace the placeholders with your actual values from the Twilio Console.

### Step 2: Update `.env.example`

Add these to `.env.example` for documentation:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_TWIML_APP_SID=APxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_PHONE_NUMBER=+1234567890
```

## Backend Setup

### Step 1: Create Twilio Access Token API Route

Create `src/app/api/twilio/token/route.ts`:

```typescript
import { NextResponse } from "next/server";
import twilio from "twilio";

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

export async function GET() {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const twimlAppSid = process.env.TWILIO_TWIML_APP_SID;

    if (!accountSid || !authToken || !twimlAppSid) {
      return NextResponse.json({ error: "Twilio credentials not configured" }, { status: 500 });
    }

    // Create an access token
    const token = new AccessToken(accountSid, accountSid, authToken, {
      identity: `user_${Date.now()}`, // Unique user identifier
      ttl: 3600, // Token valid for 1 hour
    });

    // Create a Voice grant
    const voiceGrant = new VoiceGrant({
      outgoingApplicationSid: twimlAppSid,
      incomingAllow: true, // Allow incoming calls
    });

    token.addGrant(voiceGrant);

    return NextResponse.json({
      token: token.toJwt(),
      identity: token.identity,
    });
  } catch (error) {
    console.error("Error generating Twilio token:", error);
    return NextResponse.json({ error: "Failed to generate access token" }, { status: 500 });
  }
}
```

### Step 2: Create TwiML Voice Response API Route

Create `src/app/api/twilio/voice/route.ts`:

```typescript
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const VoiceResponse = twilio.twiml.VoiceResponse;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const to = formData.get("To") as string;

    const twiml = new VoiceResponse();

    // If no 'To' parameter, reject the call
    if (!to) {
      twiml.say("No destination number provided. Goodbye.");
      twiml.hangup();
    } else {
      // Dial the number
      const dial = twiml.dial({
        callerId: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
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

### Step 3: Update TwiML App with Voice URL

1. Go back to Twilio Console > **Voice** > **TwiML Apps**
2. Click on your TwiML App
3. Set **Voice Request URL** to:
   - Local: `http://localhost:3000/api/twilio/voice`
   - Production: `https://yourdomain.com/api/twilio/voice`
4. Set **HTTP Method** to **POST**
5. Click **Save**

**Note:** For local development, you'll need to use a tool like **ngrok** to expose your local server:

```bash
# Install ngrok
npm install -g ngrok

# Run ngrok
ngrok http 3000

# Use the HTTPS URL provided by ngrok
# Example: https://abc123.ngrok.io/api/twilio/voice
```

## Frontend Integration

### Step 1: Create Twilio Hook

Create `src/hooks/useTwilioDevice.ts`:

```typescript
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Device, Call } from "@twilio/voice-sdk";

export interface UseTwilioDeviceReturn {
  device: Device | null;
  isReady: boolean;
  isCallActive: boolean;
  isMuted: boolean;
  error: string | null;
  makeCall: (phoneNumber: string) => Promise<void>;
  endCall: () => void;
  toggleMute: () => void;
  callDuration: number;
}

export function useTwilioDevice(): UseTwilioDeviceReturn {
  const [device, setDevice] = useState<Device | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);

  const activeCall = useRef<Call | null>(null);
  const durationInterval = useRef<NodeJS.Timeout | null>(null);

  // Initialize Twilio Device
  useEffect(() => {
    let twilioDevice: Device | null = null;

    const initDevice = async () => {
      try {
        // Fetch access token from your backend
        const response = await fetch("/api/twilio/token");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to get token");
        }

        // Create and setup Twilio Device
        twilioDevice = new Device(data.token, {
          logLevel: "debug",
          codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU],
        });

        // Device event listeners
        twilioDevice.on("registered", () => {
          console.log("Twilio Device Ready!");
          setIsReady(true);
          setError(null);
        });

        twilioDevice.on("error", (error) => {
          console.error("Twilio Device Error:", error);
          setError(error.message || "Device error occurred");
          setIsReady(false);
        });

        twilioDevice.on("tokenWillExpire", async () => {
          console.log("Token will expire, refreshing...");
          try {
            const response = await fetch("/api/twilio/token");
            const data = await response.json();
            twilioDevice?.updateToken(data.token);
          } catch (err) {
            console.error("Failed to refresh token:", err);
          }
        });

        // Register the device
        await twilioDevice.register();
        setDevice(twilioDevice);
      } catch (err) {
        console.error("Failed to initialize Twilio Device:", err);
        setError(err instanceof Error ? err.message : "Initialization failed");
      }
    };

    initDevice();

    // Cleanup
    return () => {
      if (twilioDevice) {
        twilioDevice.destroy();
      }
      if (durationInterval.current) {
        clearInterval(durationInterval.current);
      }
    };
  }, []);

  // Start call duration timer
  const startDurationTimer = useCallback(() => {
    setCallDuration(0);
    durationInterval.current = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
  }, []);

  // Stop call duration timer
  const stopDurationTimer = useCallback(() => {
    if (durationInterval.current) {
      clearInterval(durationInterval.current);
      durationInterval.current = null;
    }
    setCallDuration(0);
  }, []);

  // Make a call
  const makeCall = useCallback(
    async (phoneNumber: string) => {
      if (!device || !isReady) {
        setError("Device not ready");
        return;
      }

      try {
        setError(null);

        // Connect to the number
        const call = await device.connect({
          params: {
            To: phoneNumber,
          },
        });

        activeCall.current = call;

        // Call event listeners
        call.on("accept", () => {
          console.log("Call accepted");
          setIsCallActive(true);
          startDurationTimer();
        });

        call.on("disconnect", () => {
          console.log("Call disconnected");
          setIsCallActive(false);
          setIsMuted(false);
          stopDurationTimer();
          activeCall.current = null;
        });

        call.on("cancel", () => {
          console.log("Call cancelled");
          setIsCallActive(false);
          setIsMuted(false);
          stopDurationTimer();
          activeCall.current = null;
        });

        call.on("reject", () => {
          console.log("Call rejected");
          setIsCallActive(false);
          setError("Call was rejected");
          stopDurationTimer();
          activeCall.current = null;
        });

        call.on("error", (error) => {
          console.error("Call error:", error);
          setError(error.message || "Call error occurred");
          setIsCallActive(false);
          stopDurationTimer();
          activeCall.current = null;
        });
      } catch (err) {
        console.error("Failed to make call:", err);
        setError(err instanceof Error ? err.message : "Failed to make call");
      }
    },
    [device, isReady, startDurationTimer, stopDurationTimer]
  );

  // End the call
  const endCall = useCallback(() => {
    if (activeCall.current) {
      activeCall.current.disconnect();
      activeCall.current = null;
    }
    setIsCallActive(false);
    setIsMuted(false);
    stopDurationTimer();
  }, [stopDurationTimer]);

  // Toggle mute
  const toggleMute = useCallback(() => {
    if (activeCall.current) {
      const newMutedState = !isMuted;
      activeCall.current.mute(newMutedState);
      setIsMuted(newMutedState);
    }
  }, [isMuted]);

  return {
    device,
    isReady,
    isCallActive,
    isMuted,
    error,
    makeCall,
    endCall,
    toggleMute,
    callDuration,
  };
}
```

### Step 2: Update DialPad Component

Update `src/components/test/DialPad.tsx` to use the Twilio hook:

```typescript
"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  IconButton,
  Stack,
  TextField,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Phone as PhoneIcon,
  CallEnd as CallEndIcon,
  Backspace as BackspaceIcon,
  VolumeUp as VolumeUpIcon,
  Mic as MicIcon,
  MicOff as MicOffIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon,
} from "@mui/icons-material";
import { useTwilioDevice } from "@/hooks/useTwilioDevice";

const dialButtons = [
  { digit: "1", letters: "" },
  { digit: "2", letters: "ABC" },
  { digit: "3", letters: "DEF" },
  { digit: "4", letters: "GHI" },
  { digit: "5", letters: "JKL" },
  { digit: "6", letters: "MNO" },
  { digit: "7", letters: "PQRS" },
  { digit: "8", letters: "TUV" },
  { digit: "9", letters: "WXYZ" },
  { digit: "*", letters: "" },
  { digit: "0", letters: "+" },
  { digit: "#", letters: "" },
];

export default function DialPad() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [validationError, setValidationError] = useState("");

  const {
    isReady,
    isCallActive,
    isMuted,
    error: twilioError,
    makeCall,
    endCall,
    toggleMute,
    callDuration,
  } = useTwilioDevice();

  const handleDigitClick = (digit: string) => {
    if (phoneNumber.length < 15) {
      setPhoneNumber((prev) => prev + digit);
      setValidationError("");
    }
  };

  const handleBackspace = () => {
    setPhoneNumber((prev) => prev.slice(0, -1));
    setValidationError("");
  };

  const handleCall = async () => {
    if (!phoneNumber) {
      setValidationError("Please enter a phone number");
      return;
    }

    if (phoneNumber.length < 10) {
      setValidationError("Phone number must be at least 10 digits");
      return;
    }

    setValidationError("");
    await makeCall(phoneNumber);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 4,
        bgcolor: "background.paper",
      }}
    >
      {/* Twilio Status Indicator */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: isReady ? "success.50" : "warning.50",
          borderRadius: 2,
          border: "1px solid",
          borderColor: isReady ? "success.200" : "warning.200",
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        {!isReady && <CircularProgress size={20} />}
        {isReady && <CheckCircleIcon color="success" />}
        <Typography variant="body2" fontWeight={600}>
          {isReady ? "✓ Twilio Connected" : "⏳ Connecting to Twilio..."}
        </Typography>
      </Box>

      {/* Phone Number Display */}
      <Box
        sx={{
          mb: 3,
          p: 2,
          bgcolor: "grey.50",
          borderRadius: 2,
          minHeight: 80,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "monospace",
            color: phoneNumber ? "text.primary" : "text.disabled",
            mb: 1,
          }}
        >
          {phoneNumber || "Enter number"}
        </Typography>

        {isCallActive && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                bgcolor: "success.main",
                animation: "pulse 2s infinite",
                "@keyframes pulse": {
                  "0%, 100%": { opacity: 1 },
                  "50%": { opacity: 0.5 },
                },
              }}
            />
            <Typography variant="body2" color="success.main" fontWeight={600}>
              Call Active - {formatDuration(callDuration)}
            </Typography>
          </Box>
        )}

        <IconButton
          onClick={handleBackspace}
          disabled={!phoneNumber || isCallActive}
          size="small"
          sx={{ mt: 1 }}
        >
          <BackspaceIcon />
        </IconButton>
      </Box>

      {/* Error Messages */}
      {validationError && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setValidationError("")}>
          {validationError}
        </Alert>
      )}

      {twilioError && (
        <Alert severity="error" sx={{ mb: 2 }} icon={<ErrorIcon />}>
          {twilioError}
        </Alert>
      )}

      {/* Dial Pad */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 2,
          mb: 3,
        }}
      >
        {dialButtons.map(({ digit, letters }) => (
          <Button
            key={digit}
            variant="outlined"
            disabled={isCallActive || !isReady}
            onClick={() => handleDigitClick(digit)}
            sx={{
              height: 70,
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              fontSize: "1.5rem",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "primary.50",
                borderColor: "primary.main",
              },
            }}
          >
            {digit}
            {letters && (
              <Typography
                variant="caption"
                sx={{
                  fontSize: "0.625rem",
                  color: "text.secondary",
                  letterSpacing: 1,
                }}
              >
                {letters}
              </Typography>
            )}
          </Button>
        ))}
      </Box>

      {/* Call Controls */}
      {!isCallActive ? (
        <Button
          variant="contained"
          color="success"
          fullWidth
          size="large"
          startIcon={<PhoneIcon />}
          onClick={handleCall}
          disabled={!phoneNumber || !isReady}
          sx={{
            py: 2,
            fontSize: "1.125rem",
            fontWeight: 600,
            borderRadius: 3,
          }}
        >
          Call
        </Button>
      ) : (
        <Stack spacing={2}>
          {/* Call Action Buttons */}
          <Stack direction="row" spacing={2} justifyContent="center">
            <IconButton
              onClick={toggleMute}
              sx={{
                bgcolor: isMuted ? "error.main" : "grey.200",
                color: isMuted ? "white" : "text.primary",
                width: 56,
                height: 56,
                "&:hover": {
                  bgcolor: isMuted ? "error.dark" : "grey.300",
                },
              }}
            >
              {isMuted ? <MicOffIcon /> : <MicIcon />}
            </IconButton>

            <IconButton
              sx={{
                bgcolor: "grey.200",
                color: "text.primary",
                width: 56,
                height: 56,
                "&:hover": {
                  bgcolor: "grey.300",
                },
              }}
            >
              <VolumeUpIcon />
            </IconButton>
          </Stack>

          {/* End Call Button */}
          <Button
            variant="contained"
            color="error"
            fullWidth
            size="large"
            startIcon={<CallEndIcon />}
            onClick={endCall}
            sx={{
              py: 2,
              fontSize: "1.125rem",
              fontWeight: 600,
              borderRadius: 3,
            }}
          >
            End Call
          </Button>
        </Stack>
      )}

      {/* Quick Dial Input */}
      <Box sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Or paste phone number"
          placeholder="+1234567890"
          disabled={isCallActive || !isReady}
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d+*#]/g, "");
            if (value.length <= 15) {
              setPhoneNumber(value);
              setValidationError("");
            }
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
            },
          }}
        />
      </Box>
    </Paper>
  );
}
```

## Testing

### Local Testing with ngrok

1. **Start your dev server:**

   ```bash
   npm run dev
   ```

2. **In another terminal, start ngrok:**

   ```bash
   ngrok http 3000
   ```

3. **Update your TwiML App:**
   - Copy the HTTPS URL from ngrok (e.g., `https://abc123.ngrok.io`)
   - Go to Twilio Console > TwiML Apps
   - Update Voice Request URL to: `https://abc123.ngrok.io/api/twilio/voice`
   - Save

4. **Test the application:**
   - Navigate to http://localhost:3000/test
   - Wait for "Twilio Connected" status
   - Enter a phone number (use your verified number during trial)
   - Click "Call"
   - Test mute functionality
   - End the call

### Testing Checklist

- [ ] Twilio device initializes successfully
- [ ] Can enter phone numbers via dial pad
- [ ] Can paste phone numbers
- [ ] Call connects successfully
- [ ] Call duration timer works
- [ ] Mute button toggles correctly
- [ ] Can end call successfully
- [ ] Error messages display correctly
- [ ] Works on different browsers (Chrome, Firefox, Safari)

## Troubleshooting

### Issue: "Twilio credentials not configured"

**Solution:** Check that your `.env.local` file has all required variables and restart the dev server.

### Issue: "Device not ready"

**Solution:**

- Check browser console for errors
- Ensure microphone permissions are granted
- Check that access token API is returning valid tokens

### Issue: "Call fails immediately"

**Solution:**

- Verify TwiML App Voice URL is correct
- Check that ngrok is running (for local dev)
- Ensure Twilio phone number is configured correctly
- Check Twilio debugger: https://console.twilio.com/us1/monitor/logs/debugger

### Issue: "31205: Caller ID not verified" (Trial Account)

**Solution:**

- Go to Twilio Console > Phone Numbers > Verified Caller IDs
- Add and verify the number you're calling
- Or upgrade to a paid account to call any number

### Issue: No audio

**Solution:**

- Check browser microphone permissions
- Test with different browsers
- Check your computer's audio settings
- Verify codec support in browser

## Production Deployment

### Requirements for Production

1. **Paid Twilio Account:** Upgrade from trial to make unrestricted calls
2. **HTTPS:** Twilio requires HTTPS for webhooks
3. **Public URL:** Deploy your app and update TwiML App Voice URL
4. **Environment Variables:** Set all Twilio credentials in production

### Deployment Steps

1. Deploy your Next.js app (Vercel, AWS, etc.)
2. Set environment variables in your hosting platform
3. Update TwiML App Voice URL to your production URL
4. Test thoroughly before going live

## Cost Estimation

### Twilio Pricing (US, approximate)

- **Phone number:** $1/month
- **Outbound calls:** $0.013/minute
- **Inbound calls:** $0.0085/minute

Example: 1000 minutes/month outbound = ~$13/month

Check current pricing: https://www.twilio.com/voice/pricing

## Additional Resources

- Twilio Voice JS SDK: https://www.twilio.com/docs/voice/sdks/javascript
- Twilio Console: https://console.twilio.com/
- Twilio Debugger: https://console.twilio.com/us1/monitor/logs/debugger
- TwiML Documentation: https://www.twilio.com/docs/voice/twiml
- ngrok Documentation: https://ngrok.com/docs

## Support

If you encounter issues:

1. Check the Twilio Debugger logs
2. Review browser console errors
3. Check Next.js server logs
4. Contact Twilio Support: https://support.twilio.com/
