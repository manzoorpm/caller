# Auradial - Affordable International VoIP Calls

A production-ready Next.js application for VoIP services with a modern landing page, TypeScript, Material-UI, Docker support, security headers, and more.

## Features

### Application

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Material-UI v7** - Modern component library
- **Tailwind CSS** for additional styling
- **ESLint & Prettier** for code quality
- **Pre-commit hooks** with Husky and lint-staged
- **Conventional commits** enforcement
- **Docker** support with multi-stage builds
- **Security headers** configured
- **Error handling** with custom error classes
- **Logging** system ready for production
- **Health check** endpoint for monitoring
- **Environment validation**

### Landing Page

- **Professional VoIP landing page** inspired by Yadaphone
- **8 responsive sections**: Hero, How It Works, Features, Pricing, Testimonials, FAQ, CTA, Footer
- **Material-UI theme** with violet accent color
- **Mobile-first responsive design**
- **Accessible components** with ARIA labels
- See [Landing Page Documentation](docs/LANDING_PAGE.md) for details

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy environment variables:

```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your values

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Git Hooks

Pre-commit hooks are automatically configured via Husky:

**Pre-commit hook:**

- Runs ESLint and auto-fixes issues
- Formats code with Prettier
- Only runs on staged files (via lint-staged)

**Commit message hook:**

- Enforces Conventional Commits format
- Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `build`, `ci`, `revert`
- Example: `feat: add user login` or `fix(api): handle null values`

To bypass hooks (not recommended):

```bash
git commit --no-verify -m "message"
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests

## Production Deployment

### Environment Variables

Create a `.env.local` file (for local) or set environment variables in your deployment platform:

```env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

See `.env.example` for all available variables.

### Docker Deployment

#### Build and run with Docker:

```bash
# Build the image
docker build -t auradial .

# Run the container
docker run -p 3000:3000 --env-file .env.local auradial
```

#### Using Docker Compose:

```bash
# Build and start
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Platform-Specific Deployments

#### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Configure environment variables
4. Deploy

#### AWS / GCP / Azure

Use the Docker image with your preferred container orchestration:

- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Instances

#### Traditional VPS

1. Clone the repository
2. Install dependencies: `npm ci`
3. Build: `npm run build`
4. Start with PM2: `pm2 start npm --name "auradial" -- start`

## Project Structure

```
├── .github/
│   └── workflows/
│       └── ci.yml          # GitHub Actions CI/CD pipeline
├── .husky/                 # Git hooks
│   ├── pre-commit         # Pre-commit hook (lint-staged)
│   └── commit-msg         # Commit message validation
├── docs/
│   └── GIT_HOOKS.md       # Git hooks documentation
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   │   ├── health/   # Health check endpoint
│   │   │   └── example/  # Example API with error handling
│   │   ├── global-error.tsx # Global error boundary
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Home page
│   └── lib/              # Shared utilities
│       ├── env.ts        # Environment validation
│       ├── errors.ts     # Custom error classes
│       └── logger.ts     # Logging utility
├── public/               # Static files
├── Dockerfile            # Production Docker configuration
├── docker-compose.yml    # Docker Compose setup
├── DEPLOYMENT.md         # Deployment checklist
├── next.config.ts        # Next.js configuration
├── tailwind.config.ts    # Tailwind configuration
├── tsconfig.json         # TypeScript configuration
├── eslint.config.mjs     # ESLint configuration
└── .prettierrc.json      # Prettier configuration
```

## API Endpoints

### Health Check

**GET** `/api/health`

Returns the application health status. Used by Docker and monitoring systems.

Response:

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

### Example API

**GET** `/api/example?name=John`

Example API route demonstrating error handling.

## Security

The application implements several security best practices:

- Security headers (HSTS, X-Frame-Options, CSP, etc.)
- No powered-by header
- Environment variable validation
- Error handling that doesn't leak sensitive information
- Docker runs as non-root user

## Monitoring & Logging

- Health check endpoint at `/api/health`
- Structured logging with timestamps
- Error tracking ready (integrate with Sentry, LogRocket, etc.)
- Docker health checks configured

## Performance

- Standalone output for optimized Docker images
- Compression enabled
- Static asset optimization
- Image optimization with next/image

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run format`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.
