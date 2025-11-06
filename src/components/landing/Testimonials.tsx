"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Avatar,
  Rating,
} from "@mui/material";

const testimonials = [
  {
    name: "Sarah Johnson",
    location: "New York, USA",
    avatar: "SJ",
    rating: 5,
    text: "Incredibly affordable! I call my family in India every week and my bill is less than $10/month. The call quality is amazing.",
  },
  {
    name: "Michael Chen",
    location: "Toronto, Canada",
    avatar: "MC",
    rating: 5,
    text: "No more expensive international plans from my carrier. This service pays for itself after just a few calls. Highly recommended!",
  },
  {
    name: "Emma Williams",
    location: "London, UK",
    avatar: "EW",
    rating: 5,
    text: "Perfect for my business. I make calls to clients across Europe and Asia. The custom caller ID feature is a game-changer.",
  },
  {
    name: "Carlos Rodriguez",
    location: "Madrid, Spain",
    avatar: "CR",
    rating: 5,
    text: "Super easy to use! No app installation, just open the website and call. The sound quality is better than my regular phone.",
  },
];

export default function Testimonials() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
      <Container maxWidth="lg">
        <Stack spacing={6} alignItems="center">
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.875rem" }}
            >
              TESTIMONIALS
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Loved by Users Worldwide
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px" }}>
              Join thousands of satisfied customers making affordable international calls.
            </Typography>
          </Stack>

          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={3}
            sx={{ width: "100%", mt: 4 }}
            flexWrap="wrap"
            justifyContent="center"
          >
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                sx={{
                  flex: { xs: "1 1 100%", md: "1 1 calc(50% - 12px)" },
                  maxWidth: { md: "calc(50% - 12px)" },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Stack spacing={2}>
                    <Rating value={testimonial.rating} readOnly size="small" />

                    <Typography variant="body1" color="text.secondary" sx={{ fontStyle: "italic" }}>
                      &quot;{testimonial.text}&quot;
                    </Typography>

                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 48,
                          height: 48,
                          fontWeight: 700,
                        }}
                      >
                        {testimonial.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {testimonial.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {testimonial.location}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
