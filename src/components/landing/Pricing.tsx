"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
} from "@mui/material";
import { Check as CheckIcon } from "@mui/icons-material";

const plans = [
  {
    name: "Pay As You Go",
    price: "$5",
    description: "Perfect for occasional international calls",
    features: [
      "From $0.02/min",
      "No expiry on credits",
      "Call 200+ countries",
      "Browser-based calling",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Regular User",
    price: "$20",
    description: "Best for frequent callers",
    features: [
      "Everything in Pay As You Go",
      "10% bonus credits",
      "Custom caller ID",
      "Virtual phone number",
      "Priority support",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For teams and businesses",
    features: [
      "Everything in Regular User",
      "Unlimited team members",
      "Shared wallet",
      "Call recordings with AI transcripts",
      "24/7 priority support",
      "Dedicated account manager",
    ],
    popular: false,
  },
];

export default function Pricing() {
  return (
    <Box id="pricing" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Stack spacing={6} alignItems="center">
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.875rem" }}
            >
              PRICING
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Simple, Transparent Pricing
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px" }}>
              No hidden fees, no contracts. Pay only for what you use.
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={3}
            sx={{ width: "100%", mt: 4, alignItems: { xs: "stretch", lg: "flex-end" } }}
          >
            {plans.map((plan, index) => (
              <Card
                key={index}
                sx={{
                  flex: 1,
                  position: "relative",
                  border: plan.popular ? 2 : 1,
                  borderColor: plan.popular ? "primary.main" : "divider",
                  transform: plan.popular ? { lg: "scale(1.05)" } : "none",
                  boxShadow: plan.popular ? 8 : 2,
                }}
              >
                {plan.popular && (
                  <Chip
                    label="MOST POPULAR"
                    color="primary"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      fontWeight: 700,
                    }}
                  />
                )}

                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h5" gutterBottom fontWeight={700}>
                    {plan.name}
                  </Typography>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {plan.description}
                  </Typography>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h3" component="span" fontWeight={800} color="primary.main">
                      {plan.price}
                    </Typography>
                    {plan.price !== "Custom" && (
                      <Typography variant="body1" component="span" color="text.secondary">
                        {" "}
                        / top-up
                      </Typography>
                    )}
                  </Box>

                  <Button
                    variant={plan.popular ? "contained" : "outlined"}
                    fullWidth
                    size="large"
                    sx={{ mb: 3 }}
                  >
                    {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
                  </Button>

                  <List dense>
                    {plan.features.map((feature, idx) => (
                      <ListItem key={idx} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <CheckIcon sx={{ color: "primary.main", fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{ variant: "body2" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
