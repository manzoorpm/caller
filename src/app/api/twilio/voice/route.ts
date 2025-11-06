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
      // Dial the number using your Twilio phone number as caller ID
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
