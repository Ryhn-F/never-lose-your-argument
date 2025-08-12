# Deployment Guide

## Overview

Panduan lengkap untuk deploy aplikasi Fallacy Checker ke berbagai platform dan environment.

## Prerequisites

- Node.js 18+ 
- npm atau yarn
- Git repository
- Backend API yang sudah running
- Environment variables yang sudah dikonfigurasi

## Environment Variables

### Required Variables

```env
# Backend API URL
NEXT_PUBLIC_BACKEND_URL=https://api.fallacychecker.com

# Optional: Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Environment-Specific Variables

**Development (.env.local)**:
```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

**Staging (.env.staging)**:
```env
NEXT_PUBLIC_BACKEND_URL=https://staging-api.fallacychecker.com
```

**Production (.env.production)**:
```env
NEXT_PUBLIC_BACKEND_URL=https://api.fallacychecker.com
```

## Build Process

### Local Build

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

### Build Optimization

```bash
# Analyze bundle size
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

## Deployment Platforms

### 1. Vercel (Recommended)

**Automatic Deployment**:

1. **Connect Repository**:
   - Login ke Vercel dashboard
   - Click "New Project"
   - Import dari Git repository
   - Select repository

2. **Configure Build Settings**:
   ```
   Framework Preset: Next.js
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

3. **Environment Variables**:
   - Add `NEXT_PUBLIC_BACKEND_URL` di project settings
   - Set different values untuk preview dan production

4. **Domain Configuration**:
   - Add custom domain di project settings
   - Configure DNS records

**Manual Deployment**:

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**vercel.json Configuration**:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_BACKEND_URL": "@backend-url"
  }
}
```

---

### 2. Netlify

**Automatic Deployment**:

1. **Connect Repository**:
   - Login ke Netlify
   - Click "New site from Git"
   - Choose Git provider dan repository

2. **Build Settings**:
   ```
   Build command: npm run build
   Publish directory: out
   ```

3. **Next.js Configuration**:
   ```javascript
   // next.config.ts
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   
   module.exports = nextConfig
   ```

**netlify.toml Configuration**:
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. AWS Amplify

**Setup**:

1. **Connect Repository**:
   - Login ke AWS Amplify Console
   - Click "New app" > "Host web app"
   - Connect repository

2. **Build Settings**:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**:
   - Add di Amplify console environment variables section

---

### 4. Docker Deployment

**Dockerfile**:
```dockerfile
# Multi-stage build
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

**docker-compose.yml**:
```yaml
version: '3.8'
services:
  fallacy-checker:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_BACKEND_URL=https://api.fallacychecker.com
    restart: unless-stopped
```

**Build dan Run**:
```bash
# Build image
docker build -t fallacy-checker .

# Run container
docker run -p 3000:3000 -e NEXT_PUBLIC_BACKEND_URL=https://api.fallacychecker.com fallacy-checker

# Using docker-compose
docker-compose up -d
```

---

### 5. DigitalOcean App Platform

**app.yaml**:
```yaml
name: fallacy-checker
services:
- name: web
  source_dir: /
  github:
    repo: your-username/fallacy-checker
    branch: main
  run_command: npm start
  build_command: npm run build
  environment_slug: node-js
  instance_count: 1
  instance_size_slug: basic-xxs
  envs:
  - key: NEXT_PUBLIC_BACKEND_URL
    value: https://api.fallacychecker.com
  routes:
  - path: /
```

**Deployment**:
```bash
# Install doctl CLI
# Create app
doctl apps create --spec app.yaml

# Update app
doctl apps update <app-id> --spec app.yaml
```

## CI/CD Pipeline

### GitHub Actions

**.github/workflows/deploy.yml**:
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm test
      
    - name: Build application
      run: npm run build
      env:
        NEXT_PUBLIC_BACKEND_URL: ${{ secrets.BACKEND_URL }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### GitLab CI/CD

**.gitlab-ci.yml**:
```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run lint
    - npm test
  only:
    - merge_requests
    - main

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - npm ci
    - npm run build
  artifacts:
    paths:
      - .next/
    expire_in: 1 hour
  only:
    - main

deploy:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - npm install -g vercel
    - vercel --token $VERCEL_TOKEN --prod
  environment:
    name: production
    url: https://fallacychecker.com
  only:
    - main
```

## Performance Optimization

### 1. Build Optimization

**next.config.ts**:
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable compression
  compress: true,
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
  },
  
  // Bundle analyzer
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config) => {
      config.plugins.push(new BundleAnalyzerPlugin());
      return config;
    },
  }),
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components', '@/lib'],
  },
};

export default nextConfig;
```

### 2. CDN Configuration

**Vercel**:
- Automatic global CDN
- Edge functions support
- Image optimization

**Cloudflare**:
```javascript
// cloudflare-workers.js
export default {
  async fetch(request) {
    const response = await fetch(request);
    
    // Add caching headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set('Cache-Control', 'public, max-age=86400');
    
    return newResponse;
  },
};
```

### 3. Monitoring Setup

**Vercel Analytics**:
```typescript
// pages/_app.tsx
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

**Google Analytics**:
```typescript
// lib/gtag.ts
export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};
```

## Security Configuration

### 1. Content Security Policy

**next.config.ts**:
```typescript
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.googletagmanager.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https:;
      connect-src 'self' ${process.env.NEXT_PUBLIC_BACKEND_URL};
    `.replace(/\s{2,}/g, ' ').trim()
  }
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};
```

### 2. Environment Security

```bash
# Production environment variables
NEXT_PUBLIC_BACKEND_URL=https://api.fallacychecker.com
# Never commit sensitive keys to repository
# Use platform-specific secret management
```

## Monitoring & Logging

### 1. Error Tracking

**Sentry Integration**:
```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});
```

### 2. Performance Monitoring

**Web Vitals**:
```typescript
// pages/_app.tsx
export function reportWebVitals(metric) {
  console.log(metric);
  
  // Send to analytics
  if (metric.label === 'web-vital') {
    gtag('event', metric.name, {
      value: Math.round(metric.value),
      event_label: metric.id,
    });
  }
}
```

## Rollback Strategy

### 1. Vercel Rollback

```bash
# List deployments
vercel ls

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### 2. Git-based Rollback

```bash
# Revert to previous commit
git revert HEAD

# Push to trigger new deployment
git push origin main
```

### 3. Feature Flags

```typescript
// lib/features.ts
export const features = {
  newAnalysisUI: process.env.NEXT_PUBLIC_FEATURE_NEW_UI === 'true',
  betaFeatures: process.env.NEXT_PUBLIC_BETA_FEATURES === 'true',
};

// Usage in components
{features.newAnalysisUI ? <NewAnalysisForm /> : <AnalysisForm />}
```

## Troubleshooting

### Common Issues

1. **Build Failures**:
   ```bash
   # Clear cache
   rm -rf .next node_modules
   npm install
   npm run build
   ```

2. **Environment Variable Issues**:
   - Ensure variables start with `NEXT_PUBLIC_` for client-side access
   - Check platform-specific environment variable configuration

3. **API Connection Issues**:
   - Verify CORS configuration on backend
   - Check network policies dan firewall rules

4. **Performance Issues**:
   - Analyze bundle size dengan `npm run analyze`
   - Check for unnecessary re-renders
   - Optimize images dan assets

### Health Checks

```typescript
// pages/api/health.ts
export default function handler(req, res) {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

## Maintenance

### Regular Tasks

1. **Dependency Updates**:
   ```bash
   npm audit
   npm update
   ```

2. **Security Scanning**:
   ```bash
   npm audit --audit-level high
   ```

3. **Performance Monitoring**:
   - Monitor Core Web Vitals
   - Check error rates
   - Review deployment metrics

4. **Backup Strategy**:
   - Git repository sebagai source of truth
   - Database backups (jika applicable)
   - Configuration backups