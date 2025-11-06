"use client";

import { Box, Container, Typography, Button, Stack, TextField, MenuItem } from "@mui/material";
import { Phone as PhoneIcon, PlayArrow as PlayArrowIcon } from "@mui/icons-material";

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "India",
  "Germany",
  "France",
  "Spain",
];

export default function Hero() {
  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)",
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 14 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={4}
          alignItems="center"
          textAlign="center"
          sx={{ position: "relative", zIndex: 1 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              fontWeight: 800,
              color: "text.primary",
              maxWidth: "900px",
            }}
          >
            Cheap International Calls{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              In Your Browser
            </Box>
          </Typography>

          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: "1.125rem", md: "1.5rem" },
              color: "text.secondary",
              maxWidth: "700px",
              fontWeight: 400,
            }}
          >
            No apps. No contracts. No hidden fees.
            <br />
            Make crystal-clear calls from only <strong>$0.02/min</strong>
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              alignItems: "center",
              width: "100%",
              maxWidth: "600px",
              mt: 4,
            }}
          >
            <TextField
              select
              fullWidth
              defaultValue="United States"
              label="Call anyone in"
              sx={{
                bgcolor: "white",
                "& .MuiOutlinedInput-root": {
                  borderRadius: 3,
                },
              }}
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </TextField>

            <Button
              variant="contained"
              size="large"
              startIcon={<PhoneIcon />}
              sx={{
                px: 4,
                py: 2,
                fontSize: "1.125rem",
                whiteSpace: "nowrap",
                minWidth: { xs: "100%", sm: "auto" },
              }}
            >
              Start Calling
            </Button>
          </Box>

          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                bgcolor: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: 2,
                cursor: "pointer",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <PlayArrowIcon sx={{ color: "primary.main", fontSize: 28 }} />
            </Box>
            <Typography variant="body1" color="text.secondary">
              Watch how it works (2 min)
            </Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
            🎉 First call FREE • No credit card required
          </Typography>
        </Stack>
      </Container>

      {/* Decorative elements */}
      <Box
        sx={{
          position: "absolute",
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
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
          background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
    </Box>
  );
}
