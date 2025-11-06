"use client";

import { Container, Typography, Box } from "@mui/material";
import DialPad from "@/components/test/DialPad";

export default function TestPage() {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Test Call Feature
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Twilio Integration Testing
        </Typography>
      </Box>

      <DialPad />
    </Container>
  );
}
