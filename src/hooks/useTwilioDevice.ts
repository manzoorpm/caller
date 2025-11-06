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
  microphoneLevel: number;
  isMicrophoneTested: boolean;
  testMicrophone: () => Promise<void>;
  stopMicrophoneTest: () => void;
}

export function useTwilioDevice(): UseTwilioDeviceReturn {
  const [device, setDevice] = useState<Device | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [microphoneLevel, setMicrophoneLevel] = useState(0);
  const [isMicrophoneTested, setIsMicrophoneTested] = useState(false);

  const activeCall = useRef<Call | null>(null);
  const durationInterval = useRef<NodeJS.Timeout | null>(null);
  const audioContext = useRef<AudioContext | null>(null);
  const analyser = useRef<AnalyserNode | null>(null);
  const micStream = useRef<MediaStream | null>(null);
  const animationFrame = useRef<number | null>(null);

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

        // Create and setup Twilio Device (don't register yet - wait for user action)
        twilioDevice = new Device(data.token, {
          logLevel: "debug",
          codecPreferences: [Call.Codec.Opus, Call.Codec.PCMU],
          // Don't request microphone until user clicks Call
          edge: "ashburn", // Use closest edge location
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

        // Don't register automatically - we'll register on first call attempt
        // This avoids the "user gesture required" error
        setDevice(twilioDevice);
        setIsReady(true); // Mark as ready since device is created
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
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      if (micStream.current) {
        micStream.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContext.current) {
        audioContext.current.close();
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

  // Test microphone access and stream
  const testMicrophone = useCallback(async () => {
    try {
      console.log("🎤 Testing microphone access...");
      setError(null);

      // Request microphone access with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      console.log("✅ Microphone access granted");
      console.log("Audio tracks:", stream.getAudioTracks());
      stream.getAudioTracks().forEach((track) => {
        console.log("Track settings:", track.getSettings());
        console.log("Track constraints:", track.getConstraints());
        console.log("Track enabled:", track.enabled);
        console.log("Track muted:", track.muted);
        console.log("Track readyState:", track.readyState);
      });

      micStream.current = stream;
      setIsMicrophoneTested(true);

      // Create audio context to analyze microphone level
      const AudioContextClass =
        window.AudioContext ||
        (window as Window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioContext.current = new AudioContextClass();
      const source = audioContext.current.createMediaStreamSource(stream);
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 256;
      source.connect(analyser.current);

      // Monitor audio levels
      const bufferLength = analyser.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateLevel = () => {
        if (!analyser.current) return;

        analyser.current.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
        const normalizedLevel = Math.min(100, (average / 128) * 100);

        setMicrophoneLevel(normalizedLevel);
        animationFrame.current = requestAnimationFrame(updateLevel);
      };

      updateLevel();
      console.log("✅ Microphone test complete - audio stream active");
    } catch (err) {
      console.error("❌ Microphone test failed:", err);
      setIsMicrophoneTested(false);

      if (err instanceof Error) {
        if (err.name === "NotAllowedError") {
          setError(
            "Microphone access denied. Please allow microphone access in your browser settings."
          );
        } else if (err.name === "NotFoundError") {
          setError("No microphone found. Please connect a microphone.");
        } else {
          setError(`Microphone error: ${err.message}`);
        }
      }
    }
  }, []);

  // Stop microphone test
  const stopMicrophoneTest = useCallback(() => {
    console.log("🛑 Stopping microphone test");

    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
      animationFrame.current = null;
    }

    if (micStream.current) {
      micStream.current.getTracks().forEach((track) => track.stop());
      micStream.current = null;
    }

    if (audioContext.current) {
      audioContext.current.close();
      audioContext.current = null;
    }

    analyser.current = null;
    setMicrophoneLevel(0);
    setIsMicrophoneTested(false);
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

        // Register the device on first call (this triggers microphone permission)
        // This happens in response to user action (clicking Call button)
        if (device.state === Device.State.Unregistered) {
          console.log("Registering device with user gesture...");
          await device.register();
        }

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
    microphoneLevel,
    isMicrophoneTested,
    testMicrophone,
    stopMicrophoneTest,
  };
}
