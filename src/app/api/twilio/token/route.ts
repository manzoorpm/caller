import { NextResponse } from "next/server";
import twilio from "twilio";

const AccessToken = twilio.jwt.AccessToken;
const VoiceGrant = AccessToken.VoiceGrant;

export async function GET() {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const apiKey = process.env.TWILIO_API_KEY;
    const apiSecret = process.env.TWILIO_API_SECRET;
    const twimlAppSid = process.env.TWILIO_TWIML_APP_SID;

    if (!accountSid || !apiKey || !apiSecret || !twimlAppSid) {
      const missing = [];
      if (!accountSid) missing.push("TWILIO_ACCOUNT_SID");
      if (!apiKey) missing.push("TWILIO_API_KEY");
      if (!apiSecret) missing.push("TWILIO_API_SECRET");
      if (!twimlAppSid) missing.push("TWILIO_TWIML_APP_SID");

      return NextResponse.json(
        {
          error: "Twilio credentials not configured. Please check your .env.local file.",
          missing,
          help: "See docs/TWILIO_FIX_JWT_ERROR.md for setup instructions",
        },
        { status: 500 }
      );
    }

    // Create an access token with a unique identity
    const identity = `user_${Date.now()}`;

    // Use API Key and Secret (not Account SID and Auth Token)
    const token = new AccessToken(accountSid, apiKey, apiSecret, {
      identity,
      ttl: 3600, // Token valid for 1 hour
    });

    // Create a Voice grant for outgoing and incoming calls
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
