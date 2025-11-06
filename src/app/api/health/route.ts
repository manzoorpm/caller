import { NextResponse } from "next/server";

/**
 * Health check endpoint for monitoring and container orchestration
 * Returns 200 if the application is healthy
 */
export async function GET() {
  try {
    // Add any health checks here (database connection, external services, etc.)
    const health = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    };

    return NextResponse.json(health, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 503 }
    );
  }
}
