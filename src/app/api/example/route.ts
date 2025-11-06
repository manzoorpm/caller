import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { AppError, ValidationError } from "@/lib/errors";

/**
 * Example API route with error handling
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get("name");

    if (!name) {
      throw new ValidationError("Name parameter is required");
    }

    logger.info("Example API called", { name });

    return NextResponse.json({
      message: `Hello, ${name}!`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error("Error in example API", error);

    if (error instanceof AppError) {
      return NextResponse.json(
        {
          error: error.message,
          statusCode: error.statusCode,
        },
        { status: error.statusCode }
      );
    }

    return NextResponse.json(
      {
        error: "Internal server error",
        statusCode: 500,
      },
      { status: 500 }
    );
  }
}
