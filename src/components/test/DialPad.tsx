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
    microphoneLevel,
    isMicrophoneTested,
    testMicrophone,
    stopMicrophoneTest,
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
        <Box>
          <Typography variant="body2" fontWeight={600}>
            {isReady ? "✓ Twilio Ready" : "⏳ Connecting to Twilio..."}
          </Typography>
          {isReady && (
            <Typography variant="caption" color="text.secondary">
              Test microphone before making calls
            </Typography>
          )}
        </Box>
      </Box>

      {/* Microphone Test Section */}
      {isReady && !isCallActive && (
        <Box
          sx={{
            mb: 3,
            p: 2,
            bgcolor: isMicrophoneTested ? "info.50" : "grey.50",
            borderRadius: 2,
            border: "1px solid",
            borderColor: isMicrophoneTested ? "info.200" : "grey.200",
          }}
        >
          <Stack spacing={2}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <MicIcon color={isMicrophoneTested ? "info" : "disabled"} />
              <Typography variant="body2" fontWeight={600}>
                Microphone Test
              </Typography>
            </Box>

            {isMicrophoneTested && (
              <Box>
                <Typography variant="caption" color="text.secondary" gutterBottom>
                  Audio Level
                </Typography>
                <Box
                  sx={{
                    height: 8,
                    bgcolor: "grey.200",
                    borderRadius: 1,
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <Box
                    sx={{
                      height: "100%",
                      bgcolor: microphoneLevel > 30 ? "success.main" : "warning.main",
                      width: `${microphoneLevel}%`,
                      transition: "width 0.1s ease-out",
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                  {microphoneLevel > 10
                    ? "✅ Microphone is working! Speak to see the level move."
                    : "Speak into your microphone to test it"}
                </Typography>
              </Box>
            )}

            <Stack direction="row" spacing={1}>
              <Button
                variant={isMicrophoneTested ? "outlined" : "contained"}
                size="small"
                onClick={testMicrophone}
                disabled={isMicrophoneTested || !isReady}
                startIcon={<MicIcon />}
              >
                Test Microphone
              </Button>
              {isMicrophoneTested && (
                <Button variant="outlined" size="small" color="error" onClick={stopMicrophoneTest}>
                  Stop Test
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
      )}

      {/* Phone Number Display - Editable */}
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
          position: "relative",
        }}
      >
        <TextField
          value={phoneNumber}
          onChange={(e) => {
            const value = e.target.value.replace(/[^\d+*#]/g, "");
            if (value.length <= 15) {
              setPhoneNumber(value);
              setValidationError("");
            }
          }}
          placeholder="Enter number"
          disabled={isCallActive}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: {
              fontSize: "2rem",
              fontFamily: "monospace",
              textAlign: "center",
              fontWeight: 500,
              color: phoneNumber ? "text.primary" : "text.disabled",
              "& input": {
                textAlign: "center",
                padding: 0,
              },
              "& input::placeholder": {
                textAlign: "center",
                opacity: 0.6,
              },
            },
          }}
          sx={{
            width: "100%",
            mb: 1,
            "& .MuiInputBase-input": {
              cursor: isCallActive ? "default" : "text",
            },
          }}
        />

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

        {!isCallActive && phoneNumber && (
          <IconButton onClick={handleBackspace} size="small" sx={{ mt: 1 }}>
            <BackspaceIcon />
          </IconButton>
        )}
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

      {/* Setup Instructions */}
      {!isReady && (
        <Box
          sx={{
            mt: 3,
            p: 2,
            bgcolor: "info.50",
            borderRadius: 2,
            border: "1px solid",
            borderColor: "info.200",
          }}
        >
          <Typography variant="caption" color="info.main" fontWeight={600}>
            📋 Setup Required
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary" sx={{ mt: 0.5 }}>
            Configure Twilio credentials in .env.local file. See docs/TWILIO_SETUP.md for
            instructions.
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
