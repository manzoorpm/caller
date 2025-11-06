"use client";

import { Box, Container, Typography, Stack, Link, IconButton, Divider } from "@mui/material";
import {
  Phone as PhoneIcon,
  Email as EmailIcon,
  Twitter as TwitterIcon,
  Facebook as FacebookIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
} from "@mui/icons-material";

const footerLinks = {
  Product: ["Features", "Pricing", "Enterprise", "How It Works", "Call Rates"],
  Company: ["About Us", "Careers", "Blog", "Press Kit", "Partners"],
  Support: ["Help Center", "Contact Us", "System Status", "API Documentation", "Community"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "GDPR", "Refund Policy"],
};

export default function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: "grey.900", color: "white", pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr 1fr 1fr 1fr" },
            gap: 4,
          }}
        >
          {/* Brand and Description */}
          <Box>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 2,
                    bgcolor: "primary.main",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <PhoneIcon sx={{ color: "white" }} />
                </Box>
                <Typography variant="h5" fontWeight={700}>
                  Auradial
                </Typography>
              </Stack>

              <Typography variant="body2" color="grey.400" sx={{ maxWidth: 300 }}>
                Making international calls affordable and accessible for everyone. Connect with
                anyone, anywhere, anytime.
              </Typography>

              <Stack direction="row" spacing={1}>
                <IconButton
                  size="small"
                  sx={{ color: "grey.400", "&:hover": { color: "primary.main" } }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "grey.400", "&:hover": { color: "primary.main" } }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "grey.400", "&:hover": { color: "primary.main" } }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ color: "grey.400", "&:hover": { color: "primary.main" } }}
                >
                  <GitHubIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Box>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <Box key={category}>
              <Stack spacing={2}>
                <Typography variant="subtitle1" fontWeight={700}>
                  {category}
                </Typography>
                <Stack spacing={1}>
                  {links.map((link) => (
                    <Link
                      key={link}
                      href="#"
                      underline="hover"
                      sx={{
                        color: "grey.400",
                        fontSize: "0.875rem",
                        "&:hover": { color: "primary.main" },
                      }}
                    >
                      {link}
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4, borderColor: "grey.800" }} />

        {/* Bottom Bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="body2" color="grey.500">
            © {new Date().getFullYear()} Auradial. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon sx={{ fontSize: 16, color: "grey.500" }} />
            <Typography variant="body2" color="grey.500">
              support@auradial.com
            </Typography>
          </Stack>
        </Stack>

        <Typography
          variant="caption"
          color="grey.600"
          sx={{ display: "block", textAlign: "center", mt: 3 }}
        >
          Built with Next.js, Material-UI, and powered by WebRTC technology
        </Typography>
      </Container>
    </Box>
  );
}
