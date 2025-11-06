# Production Deployment Checklist

Use this checklist before deploying to production.

## Pre-Deployment Checklist

### Code Quality

- [ ] All tests pass (`npm test`)
- [ ] TypeScript type checking passes (`npm run type-check`)
- [ ] ESLint passes with no errors (`npm run lint`)
- [ ] Code is formatted with Prettier (`npm run format`)
- [ ] Production build succeeds (`npm run build`)

### Environment Variables

- [ ] All required environment variables are set
- [ ] `.env.local` is NOT committed to git
- [ ] Production environment variables are configured in deployment platform
- [ ] `NEXT_PUBLIC_APP_URL` is set to production URL
- [ ] `NODE_ENV=production` is set

### Security

- [ ] Security headers are configured (check [next.config.ts](next.config.ts))
- [ ] No sensitive data in client-side code
- [ ] API routes have proper error handling
- [ ] Authentication/authorization is implemented (if needed)
- [ ] CORS is properly configured (if needed)
- [ ] Rate limiting is implemented (if needed)

### Performance

- [ ] Images are optimized using next/image
- [ ] Static assets are compressed
- [ ] Bundle size is reasonable (check build output)
- [ ] Core Web Vitals are acceptable

### Monitoring

- [ ] Error tracking service configured (e.g., Sentry)
- [ ] Analytics configured (if needed)
- [ ] Health check endpoint works (`/api/health`)
- [ ] Logging is properly configured

### Docker (if using)

- [ ] Dockerfile builds successfully
- [ ] Docker image runs correctly locally
- [ ] Health check in docker-compose.yml works
- [ ] Container runs as non-root user

### Documentation

- [ ] README.md is up to date
- [ ] API documentation is complete
- [ ] Deployment instructions are clear
- [ ] Environment variables are documented

## Deployment Steps

### Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy
5. Verify deployment at production URL
6. Check health endpoint: `https://your-domain.com/api/health`

### Docker / Container Platforms

1. Build Docker image: `docker build -t caller .`
2. Test locally: `docker run -p 3000:3000 caller`
3. Push to container registry
4. Deploy to platform (AWS ECS, GCP Cloud Run, etc.)
5. Configure environment variables
6. Set up health checks
7. Configure auto-scaling (if needed)
8. Verify deployment

### Traditional VPS

1. SSH into server
2. Clone repository or pull latest changes
3. Install dependencies: `npm ci`
4. Build: `npm run build`
5. Set environment variables
6. Start with process manager: `pm2 start npm --name "caller" -- start`
7. Configure reverse proxy (nginx/apache)
8. Set up SSL certificate (Let's Encrypt)
9. Configure firewall
10. Set up monitoring

## Post-Deployment

- [ ] Production site is accessible
- [ ] Health check endpoint returns 200: `/api/health`
- [ ] Test critical user flows
- [ ] Check error tracking service
- [ ] Monitor performance metrics
- [ ] Set up uptime monitoring
- [ ] Configure alerts for errors/downtime
- [ ] Document any deployment-specific configurations

## Rollback Plan

If issues occur:

1. **Vercel**: Use instant rollback to previous deployment
2. **Docker**: Redeploy previous image version
3. **VPS**:
   - Stop current process: `pm2 stop caller`
   - Checkout previous version: `git checkout <previous-commit>`
   - Rebuild: `npm run build`
   - Restart: `pm2 restart caller`

## Monitoring URLs

After deployment, monitor these endpoints:

- Application: `https://your-domain.com`
- Health Check: `https://your-domain.com/api/health`
- Example API: `https://your-domain.com/api/example?name=test`

## Support

For deployment issues, check:

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Docker Documentation](https://docs.docker.com/)
- Project README.md
