"use client";

import { Box, Container, Typography, Stack, Button } from "@mui/material";
import { Phone as PhoneIcon, ArrowForward as ArrowForwardIcon } from "@mui/icons-material";

export default function CTA() {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="md">
        <Stack
          spacing={4}
          alignItems="center"
          textAlign="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 800,
              color: "white",
            }}
          >
            Ready to Start Calling?
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.125rem", md: "1.5rem" },
              color: "rgba(255, 255, 255, 0.9)",
              maxWidth: "600px",
            }}
          >
            Join thousands of users making affordable international calls. First call is FREE!
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            sx={{ mt: 4, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 4,
                py: 2,
                fontSize: "1.125rem",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Get Started Free
            </Button>

            <Button
              variant="outlined"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
                py: 2,
                fontSize: "1.125rem",
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              View Pricing
            </Button>
          </Stack>

          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)", mt: 2 }}>
            No credit card required • 7-day money-back guarantee
          </Typography>
        </Stack>
      </Container>

      {/* Decorative circles */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
