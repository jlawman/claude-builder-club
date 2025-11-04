# Recommended Stack

## Frontend

- **Next.js 15** - App Router with `src/` directory
- **TypeScript** - Type safety (llm can iteratively improve and check code)
- **Tailwind CSS** - Styling
- **Vercel** - Hosting and deployment
- **Vercel AI SDK 5** - LLM integration
- **Vercel AI Elements** - Making chatbot UI

## Database

- **Neon**
- **Drizzle ORM**

## Voice Agents

- **Livekit**

## Authentication

- **Clerk** - User management and auth

## Models (as of Nov 4th 2025)

### LLMs (Easy tasks)
- **Claude Haiku 4.5**
- **Gemini Flash Lite**

### LLMs (Hard tasks)
- **GPT-5** - Complex reasoning
- **Gemini 2.5 Pro** - Google's most capable
- **Claude Sonnet 4.5** - Coding, long context

### Other
- Text->Image: **Nano Banana** (from Google)
- Text->Video: **Veo 3.1** (from Google)
- Text->Audio: **ElevenLabs** (expensive), or **Cartesia** (cheap and fast)
- Audio->Text: **Nova 3, Deepgram** (cheap and fast)
- Fast LLM tokens: https://www.cerebras.ai/inference or https://groq.com/
- Misc: Review latest from https://news.smol.ai/ or various leaderboards like https://lmarena.ai/leaderboard or https://artificialanalysis.ai/

## Storage

- **Vercel Blob** - Public files (images, assets) - very LLM friendly
- **Cloudflare R2** - Private files - slightly more setup
- **Upstash Redis** - Serverless Redis (think super fast online key-value store)

## Email

- **Resend**

## Monitoring

- **Sentry** - Error tracking (5k errors/month free)
- **Langfuse** - LLM observability and tracing

## Domain & DNS

- **Cloudflare** - Domain registration, DNS, CDN, email routing

## CLI Tools

- **gh** - GitHub CLI
- **vercel** - Vercel CLI

## MCP

- **context7** - Library documentation retrieval

## Python

- **uv** - Package manager
- **seaborn** - Pretty charts

## Deployment

- **Vercel** (Easiest)
- **GCP** (Best models and rate limits as of Nov 4th 2025. More setup, more control.)
