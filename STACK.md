# Recommended Stack

## Frontend

- **Next.js 15** - App Router with `src/` directory
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vercel** - Hosting and deployment

## Backend

- **Next.js API Routes** - Serverless functions
- **Server Actions** - Form handling, mutations

## Database

- **Neon** - PostgreSQL (0.5GB free)
- **Drizzle ORM** - Type-safe queries and migrations

## Authentication

- **Clerk** - User management and auth

## AI/LLM

### Models (Prototyping)
- **Claude Haiku 4.5** - Fast, cheap
- **Gemini Flash 2.0** - Google's fastest

### Models (Production)
- **GPT-4.5** - Complex reasoning
- **Gemini 2.5 Pro** - Google's most capable
- **Claude Sonnet 4.5** - Coding, long context

### SDK
- **Vercel AI SDK 5** - LLM integration

## Storage

- **Vercel Blob** - Public files (images, assets)
- **Cloudflare R2** - Private files (no egress fees)

## Caching

- **Upstash Redis** - Serverless Redis (10k commands/day free)

## Email

- **Resend** - Transactional email (100/day free)

## Monitoring

- **Sentry** - Error tracking (5k errors/month free)
- **Langfuse** - LLM observability and tracing

## Domain & DNS

- **Cloudflare** - Domain registration, DNS, CDN, email routing

## CLI Tools

- **gh** - GitHub CLI
- **vercel** - Vercel CLI
- **bun** - Package manager and runtime
- **uv** - Python package manager

## MCP

- **context7** - Library documentation retrieval

## Python (Data Projects)

- **uv** - Package manager
- **pandas** - Data manipulation
- **matplotlib** - Visualization
- **numpy** - Numerical computing

## Deployment

**Primary:** Vercel
**Alternative:** GCP (Cloud Run, Cloud Functions)

## Cost Optimization

1. Start all services on free tier
2. Use Haiku/Flash for prototyping, Pro models only when needed
3. Cache aggressively with Upstash Redis
4. Cloudflare R2 over S3 (no egress fees)
5. Monitor LLM costs with Langfuse before scaling

## Migration Path

**Workshop → MVP → Production**

Workshop (Free):
- Vercel
- Neon
- Vercel Blob
- No monitoring

MVP (Still mostly free):
- Add Sentry
- Add Resend
- Add Langfuse
- Custom domain (Cloudflare)

Production (Pay as you scale):
- Upgrade Neon
- Add Upstash Redis
- Switch to Cloudflare R2
- Production LLM models
- Advanced monitoring

---

Use free tiers. Upgrade only when necessary. Monitor costs continuously.
