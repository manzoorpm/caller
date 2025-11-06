/**
 * Simple production-ready logger
 * In production, you might want to use a service like Sentry, LogRocket, etc.
 */

type LogLevel = "info" | "warn" | "error" | "debug";

interface LogMetadata {
  [key: string]: unknown;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === "development";

  private formatMessage(level: LogLevel, message: string, metadata?: LogMetadata): string {
    const timestamp = new Date().toISOString();
    const meta = metadata ? JSON.stringify(metadata) : "";
    return `[${timestamp}] [${level.toUpperCase()}] ${message} ${meta}`;
  }

  info(message: string, metadata?: LogMetadata): void {
    const formatted = this.formatMessage("info", message, metadata);
    console.info(formatted);
  }

  warn(message: string, metadata?: LogMetadata): void {
    const formatted = this.formatMessage("warn", message, metadata);
    console.warn(formatted);
  }

  error(message: string, error?: Error | unknown, metadata?: LogMetadata): void {
    const errorData = error instanceof Error ? { error: error.message, stack: error.stack } : {};
    const formatted = this.formatMessage("error", message, { ...errorData, ...metadata });
    console.error(formatted);

    // In production, send to error tracking service
    if (!this.isDevelopment && error instanceof Error) {
      // TODO: Integrate with Sentry, LogRocket, or similar
      // Sentry.captureException(error);
    }
  }

  debug(message: string, metadata?: LogMetadata): void {
    if (this.isDevelopment) {
      const formatted = this.formatMessage("debug", message, metadata);
      console.debug(formatted);
    }
  }
}

export const logger = new Logger();
