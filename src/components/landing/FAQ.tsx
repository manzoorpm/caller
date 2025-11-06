"use client";

import {
  Box,
  Container,
  Typography,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";

const faqs = [
  {
    question: "How does browser-based calling work?",
    answer:
      "We use WebRTC technology, which allows you to make calls directly from your browser without any downloads. Simply sign up, add credits, and start calling - it's that simple!",
  },
  {
    question: "Do I need to install any apps or software?",
    answer:
      "No! Everything works directly in your web browser. No downloads, no installations, no updates. Just open our website and start calling.",
  },
  {
    question: "What countries can I call?",
    answer:
      "You can call landlines and mobile phones in over 200 countries worldwide. Rates start from as low as $0.02 per minute depending on the destination.",
  },
  {
    question: "Are there any hidden fees or monthly charges?",
    answer:
      "Absolutely not. We operate on a pay-as-you-go model. You only pay for the credits you add to your account, and we only deduct money when you make calls. No monthly fees, no contracts, no surprises.",
  },
  {
    question: "Can I receive calls too?",
    answer:
      "Yes! You can get virtual phone numbers in multiple countries that allow you to receive calls directly in your browser. This feature is available with our Regular User and Enterprise plans.",
  },
  {
    question: "Is my credit card information secure?",
    answer:
      "Yes, absolutely. We use Stripe for payment processing, which is trusted by millions of businesses worldwide. We never store your credit card information on our servers.",
  },
  {
    question: "What if I'm not satisfied with the service?",
    answer:
      "We offer a first call free so you can try our service risk-free. If you're not satisfied, we have a 7-day money-back guarantee on your first top-up.",
  },
  {
    question: "Do my credits expire?",
    answer:
      "No! Your credits never expire. Top up once and use them whenever you need to make calls, whether that's next week or next year.",
  },
];

export default function FAQ() {
  return (
    <Box id="faq" sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        <Stack spacing={6}>
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Typography
              variant="overline"
              sx={{ color: "primary.main", fontWeight: 700, fontSize: "0.875rem" }}
            >
              FAQ
            </Typography>
            <Typography variant="h2" sx={{ fontSize: { xs: "2rem", md: "2.5rem" } }}>
              Frequently Asked Questions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: "600px" }}>
              Got questions? We&apos;ve got answers. Can&apos;t find what you&apos;re looking for?
              Contact our support team.
            </Typography>
          </Stack>

          <Stack spacing={2} sx={{ mt: 4 }}>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  "&:before": {
                    display: "none",
                  },
                  boxShadow: "none",
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: "12px !important",
                  "&:not(:last-child)": {
                    mb: 1,
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    "& .MuiAccordionSummary-content": {
                      my: 2,
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" color="text.secondary">
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
