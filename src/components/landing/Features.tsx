"use client";

import { Box, Container, Typography, Stack, Paper } from "@mui/material";
import {
  Public as PublicIcon,
  PhoneInTalk as PhoneInTalkIcon,
  CreditCard as CreditCardIcon,
  Lock as LockIcon,
  PhoneCallback as PhoneCallbackIcon,
  AccountCircle as AccountCircleIcon,
  CloudOff as CloudOffIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";

const features = [
  {
    icon: PublicIcon,
    title: "Call Anywhere, From Anywhere",
    description: "Make calls to 200+ countries from your browser. No location restrictions.",
  },
  {
    icon: CloudOffIcon,
    title: "No Apps Required",
    description: "Works directly in your browser. No downloads, installations, or updates needed.",
  },
  {
    icon: CreditCardIcon,
    title: "Pay As You Go",
    description: "Only pay for what you use. No monthly subscriptions or hidden fees.",
  },
  {
    icon: PhoneCallbackIcon,
    title: "Virtual Phone Numbers",
    description: "Get local numbers in multiple countries for receiving calls.",
  },
  {
    icon: AccountCircleIcon,
    title: "Custom Caller ID",
    description: "Display your own number when making calls for a professional touch.",
  },
  {
    icon: LockIcon,
    title: "Secure & Private",
    description: "End-to-end encryption keeps your conversations private and secure.",
  },
  {
    icon: PhoneInTalkIcon,
    title: "Crystal Clear Quality",
    description: "HD voice quality powered by WebRTC technology for clear conversations.",
  },
  {
    icon: SpeedIcon,
    title: "Instant Connection",
    description: "Connect to any number worldwide in seconds. No delays or waiting.",
  },
];

export default function Features() {
  return (
    <Box id="features" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Stack spacing={6} alignItems="center">
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.875rem" }}
            >
              FEATURES
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Everything You Need for Global Calling
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "700px" }}>
              Professional calling features without the enterprise price tag. Stay connected with
              friends, family, and business contacts worldwide.
            </Typography>
          </Stack>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(4, 1fr)",
              },
              gap: 3,
              mt: 2,
              width: "100%",
            }}
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Box key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      height: "100%",
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: "divider",
                      transition: "all 0.3s",
                      "&:hover": {
                        borderColor: "primary.main",
                        boxShadow: 3,
                        transform: "translateY(-4px)",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: "primary.light",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                      }}
                    >
                      <Icon sx={{ fontSize: 28, color: "primary.dark" }} />
                    </Box>

                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {feature.title}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Paper>
                </Box>
              );
            })}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
