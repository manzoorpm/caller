/**
 * Environment variable validation and type-safe access
 */

export const env = {
  // Public environment variables (accessible in browser)
  public: {
    appUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  // Server-only environment variables
  server: {
    nodeEnv: process.env.NODE_ENV || "development",
  },
} as const;

// Validate required environment variables
export function validateEnv() {
  const errors: string[] = [];

  // Add validation for required env vars
  if (!process.env.NEXT_PUBLIC_APP_URL && process.env.NODE_ENV === "production") {
    errors.push("NEXT_PUBLIC_APP_URL is required in production");
  }

  if (errors.length > 0) {
    throw new Error(`Environment validation failed:\n${errors.join("\n")}`);
  }
}

// Type helpers
export type Env = typeof env;
