"use client";

import { Box, Container, Typography, Stack, Card, CardContent } from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  AccountBalanceWallet as WalletIcon,
  Phone as PhoneIcon,
} from "@mui/icons-material";

const steps = [
  {
    icon: PersonAddIcon,
    title: "Sign Up",
    description: "Create your account with just an email. No verification needed.",
    step: "01",
  },
  {
    icon: WalletIcon,
    title: "Add Credits",
    description: "Top up your account with our pay-as-you-go model. Start from $5.",
    step: "02",
  },
  {
    icon: PhoneIcon,
    title: "Call Anywhere",
    description: "Make calls from your browser to any phone number worldwide.",
    step: "03",
  },
];

export default function HowItWorks() {
  return (
    <Box id="how-it-works" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Stack spacing={6} alignItems="center">
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.875rem" }}
            >
              HOW IT WORKS
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Get Started in 3 Simple Steps
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px" }}>
              No downloads, no complicated setup. Start making international calls in minutes.
            </Typography>
          </Stack>

          <Stack direction={{ xs: "column", md: "row" }} spacing={4} sx={{ width: "100%", mt: 4 }}>
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <Card
                  key={index}
                  sx={{
                    flex: 1,
                    position: "relative",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Typography
                      variant="h3"
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        fontSize: "3rem",
                        fontWeight: 800,
                        color: "primary.light",
                        opacity: 0.2,
                      }}
                    >
                      {step.step}
                    </Typography>

                    <Box
                      sx={{
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mx: "auto",
                        mb: 3,
                      }}
                    >
                      <Icon sx={{ fontSize: 40, color: "white" }} />
                    </Box>

                    <Typography variant="h5" gutterBottom fontWeight={600}>
                      {step.title}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </CardContent>
                </Card>
              );
            })}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
