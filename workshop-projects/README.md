# Claude Code Builder Workshop Projects

A collection of practical project ideas for university students to build with Claude Code. Each project includes a full mission brief, tech stack specifications, and starter prompts.

## Tech Stack

All projects use a consistent, free-tier friendly stack:

- **Frontend**: Next.js 15 (App Router with `src/` directory)
- **Database**: Neon (PostgreSQL with generous free tier)
- **ORM**: Drizzle ORM
- **Storage**: Vercel Blob Storage
- **Deployment**: Vercel
- **LLM**: Vercel AI SDK 5 (with your provided API key)
- **Styling**: Tailwind CSS
- **Python Projects**: uv (for data analysis/processing projects)

### Important: Project Structure

All Next.js projects should follow this structure:
```
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── actions.ts          # Server actions colocated
│   │   └── components/          # Route-specific components
│   │       └── chart.tsx
│   └── api/
│       └── generate/
│           └── route.ts
├── components/                   # Global/shared components
│   ├── ui/
│   └── layout/
└── lib/
    ├── db/                      # Database schemas
    └── utils.ts
```

**Key Principles:**
- Colocate files: Keep `actions.ts`, route-specific components, and logic close to the page that uses them
- Global components go in `src/components/`
- Server actions in `actions.ts` next to the page using them
- API routes in `src/app/api/`

## How to Use This Repository

1. Browse projects by difficulty level (Easy, Medium, Hard)
2. Choose a project that interests you
3. Open the project's folder for detailed instructions
4. Use the provided initial prompt with Claude Code to get started
5. Customize and extend as you build!

---

## Quick Start Projects (Zero Setup)

**Want to build something NOW without any API keys or setup?**

Check out **[Quick Start Projects](./quick/README.md)** - 40+ quick projects:
- **No API keys** - Use public endpoints or pure client-side
- **No databases** - localStorage or stateless
- **No accounts** - Start building immediately
- **Copy-paste prompts** - Ready to use with Claude Code

**Popular Quick Projects:**
- [Pomodoro Timer](./quick/web-apps/pomodoro-timer.md) - Focus timer with notifications
- [Pokemon Lookup](./quick/web-apps/pokemon-lookup.md) - Search Pokemon using free API
- [Color Palette Generator](./quick/web-apps/color-palette-generator.md) - Generate beautiful colors
- [Voice Notes](./quick/browser-apis/voice-notes.md) - Speech-to-text notes
- **[40 Copy-Paste Prompts](./quick/QUICK-PROMPTS.md)** - Just copy and build!

Perfect for:
- Learning Claude Code quickly
- Portfolio fillers
- Testing new ideas
- Fun weekend projects

---

## Workshop Projects (Full Stack)

These projects involve databases, APIs, and complete full-stack features. Great for learning production development patterns!

### Academic Life

#### Easy
- **[Study Guide Generator](./easy/study-guide-generator.md)** - Upload notes, generate flashcards and quizzes
- **[Grade Calculator](./easy/grade-calculator.md)** - Track grades and predict finals needed

#### Medium
- **[Course Review Aggregator](./medium/course-review-aggregator.md)** - Aggregate and summarize course reviews
- **[Assignment Deadline Optimizer](./medium/assignment-optimizer.md)** - Generate optimal study schedules

#### Hard
- **[Research Paper Assistant](./hard/research-paper-assistant.md)** - Find, summarize, and organize academic papers
- **[Smart Study Buddy](./hard/smart-study-buddy.md)** - AI-powered learning companion with document analysis
- **[Lecture Transcription Analyzer](./hard/lecture-analyzer.md)** - Extract key points from lecture recordings

### Career Development

#### Easy
- **[Resume Roaster](./easy/resume-roaster.md)** - Get AI feedback on your resume
- **[Cold Email Generator](./easy/cold-email-generator.md)** - Craft personalized outreach emails

#### Medium
- **[GitHub Portfolio Builder](./medium/github-portfolio.md)** - Auto-generate portfolio site from your repos
- **[Mock Interview Simulator](./medium/mock-interview.md)** - Practice interviews with AI feedback

#### Hard
- **[LinkedIn Optimizer Suite](./hard/linkedin-optimizer.md)** - Complete professional profile enhancement

### Campus Life

#### Easy
- **[Dining Hall Menu Tracker](./easy/dining-hall-menu.md)** - Find the best meals on campus
- **[Free Food Finder](./easy/free-food-finder.md)** - Never miss free campus food events

#### Medium
- **[Campus Event Aggregator](./medium/campus-events.md)** - Personalized campus event discovery
- **[Textbook Price Hunter](./medium/textbook-hunter.md)** - Find cheapest textbook options

#### Hard
- **[Campus Wrapped](./hard/campus-wrapped.md)** - Your semester in review with data visualization

### Personal Finance

#### Easy
- **[Simple Budget Tracker](./easy/budget-tracker.md)** - Track spending with SMS/email parsing

#### Medium
- **[Scholarship Finder Bot](./medium/scholarship-finder.md)** - Auto-discover scholarship opportunities
- **[Subscription Tracker](./medium/subscription-tracker.md)** - Find and manage recurring expenses

#### Hard
- **[Financial Dashboard](./hard/financial-dashboard.md)** - Complete financial overview with predictions

### Creative & Social

#### Easy
- **[Meme Generator](./easy/meme-generator.md)** - AI-powered meme creation from trending topics
- **[Playlist Curator](./easy/playlist-curator.md)** - Mood-based Spotify playlists
- **[Date Idea Generator](./easy/date-idea-generator.md)** - Perfect date planning assistant

#### Medium
- **[Group Chat Summarizer](./medium/group-chat-summarizer.md)** - TL;DR for busy group chats
- **[Social Media Post Generator](./medium/social-media-posts.md)** - Content ideas for all platforms

#### Hard
- **[Social Media Cleaner](./hard/social-media-cleaner.md)** - Professional brand audit

### Health & Wellness

#### Easy
- **[Workout Routine Builder](./easy/workout-builder.md)** - Custom gym routines for campus facilities

#### Medium
- **[Meal Prep Planner](./medium/meal-prep-planner.md)** - Weekly meal planning with grocery lists
- **[Mental Health Check-in](./medium/mental-health-checkin.md)** - Mood tracking and journaling

### Productivity Tools

#### Easy
- **[Email Template Generator](./easy/email-templates.md)** - Common email scenarios covered

#### Medium
- **[Calendar Optimizer](./medium/calendar-optimizer.md)** - Smart scheduling assistant
- **[Note Organizer](./medium/note-organizer.md)** - Tag and search across all notes

#### Hard
- **[Personal Knowledge Base](./hard/knowledge-base.md)** - Second brain with AI-powered search

---

## Difficulty Levels Explained

### Easy
- Minimal database requirements (or no DB)
- 1-2 API integrations
- Basic CRUD operations
- Great for learning the tech stack
- Focus on UI and single feature

### Medium
- Database with 2-4 tables
- Multiple API integrations
- User authentication recommended
- 3-5 core features
- Some data processing/analysis

### Hard
- Complex database schema
- Multiple external services
- Advanced features (file upload, real-time updates, etc.)
- Data visualization
- Background jobs/cron tasks
- Could be a portfolio piece

---

## Getting Started

### Prerequisites
```bash
node -v  # Should be 18+
bun -v   # Recommended, or use npm/pnpm
```

### Quick Start Template

Every project can start with:

```bash
# Create Next.js 15 app with src/ directory
bunx create-next-app@latest my-project --typescript --tailwind --app --src-dir --use-bun

# IMPORTANT: Ensure Next.js 15 (not 16)
# Check package.json and downgrade if needed:
# "next": "^15.0.0"

# Install common dependencies
bun add drizzle-orm postgres
bun add -D drizzle-kit

# For LLM features - Vercel AI SDK 5
bun add ai @ai-sdk/openai @ai-sdk/anthropic

# For file uploads
bun add @vercel/blob
```

### Working with Vercel AI SDK 5

**IMPORTANT**: When starting a project with LLM features, instruct your coding agent to read the Vercel AI SDK 5 documentation:

```
Option 1 - Using Context7 MCP (Recommended):
"First, use context7 to get the latest Vercel AI SDK 5 documentation and examples."

Option 2 - Using Web Search:
"Read the Vercel AI SDK 5 documentation from ai.sdk.dev to understand the latest patterns."
```

The AI SDK 5 has significant changes from v4, including:
- New `streamText()` and `generateText()` functions
- Improved streaming with `createStreamableValue()`
- Better type safety
- Unified API across providers

**Always read the docs first before implementing LLM features!**

### Environment Setup

Most projects will need:

```env
# Database (from Neon)
DATABASE_URL=postgresql://user:pass@host/db

# LLM API
OPENAI_API_KEY=sk-...
# or
ANTHROPIC_API_KEY=sk-ant-...

# Vercel Blob (if using storage)
BLOB_READ_WRITE_TOKEN=...
```

### Python Projects Setup (Data Analysis)

For projects that involve data analysis or Python scripts:

```bash
# Initialize uv project
uv init my-analysis-project
cd my-analysis-project

# Add dependencies
uv add pandas numpy matplotlib
uv add jupyter  # for notebook-based analysis

# Run scripts
uv run python analysis.py

# Or activate virtual environment
source .venv/bin/activate  # Unix
# .venv\Scripts\activate  # Windows
```

**Common Python packages for data analysis:**
- `pandas` - Data manipulation
- `numpy` - Numerical computing
- `matplotlib`, `seaborn` - Visualization
- `scikit-learn` - Machine learning
- `jupyter` - Interactive notebooks
- `requests`, `beautifulsoup4` - Web scraping

---

## Workshop Format Suggestions

### Option 1: Guided Build
- Everyone builds the same EASY project together
- Instructor demos, students follow along
- Great for learning the stack

### Option 2: Choose Your Own Adventure
- Students pick any project at their skill level
- Work independently or in pairs
- Show & tell at the end

### Option 3: Hackathon Style
- Teams pick MEDIUM or HARD projects
- Optional: Add your own twist
- Judged demos with prizes

---

## Contributing Your Own Project Ideas

Each project brief should include:
1. **Mission Brief**: Clear problem statement
2. **User Stories**: What can users do?
3. **Tech Stack**: Any special APIs or tools
4. **Database Schema**: Table designs
5. **Core Features**: Must-haves vs. nice-to-haves
6. **Initial Prompt**: Kickstart with Claude Code
7. **Extensions**: Ideas to make it your own

---

## Free Tier API Resources

Here are some great free APIs to use during the workshop:

### AI/LLM
- **OpenAI** - Free trial credits ($5-18 depending on promotion)
- **Anthropic** - Free trial credits ($5)
- **Google AI** - Gemini models with generous free tier (15 RPM for Flash models)
- Together AI - Free credits for open-source models

### Data & Content
- **NewsAPI** - 100 requests/day free
- **OpenWeather** - 1000 calls/day free
- **Spotify API** - Free with account
- **GitHub API** - 60 requests/hour unauthenticated, 5000 with token
- **Semantic Scholar** - Free academic paper search
- **arXiv API** - Free access to research papers

### Communication
- **Resend** - 100 emails/day free (3000/month)
- **Twilio** - Trial credits for SMS

### Storage & Infrastructure
- **Vercel** - Hobby plan (generous free tier for hosting)
- **Neon** - 0.5 GB storage free, 1 compute hour/month
- **Vercel Blob** - Free tier available
- **Upstash Redis** - 10,000 commands/day free
- **Cloudflare** - Free CDN, DDoS protection, email routing

### Utilities
- **Unsplash** - 50 requests/hour (5000/month)
- **Google Places API** - Free tier available
- **ExchangeRate-API** - 1500 requests/month free

### Monitoring (for post-workshop)
- **Sentry** - 5000 errors/month free
- **Langfuse** - Free tier for LLM tracing
- **Vercel Analytics** - Free with Vercel hosting

---

## Beyond the Workshop: Recommended Production Stack

Once you've built your workshop project and want to take it to production or build more advanced apps, here are our recommended tools and services:

### Infrastructure & Deployment

**Hosting & Deployment**
- **Vercel** - Primary choice for Next.js apps (free tier is generous)
- **GCP (Google Cloud Platform)** - When you need more than Vercel offers (VMs, Kubernetes, Cloud Functions)
- **Cloudflare Pages** - Alternative static/edge hosting

**Domain & DNS**
- **Cloudflare** - Buy and manage domain names (best pricing, great DDoS protection)
- **Cloudflare Email Routing** - Free email forwarding for your domain (e.g., hello@yourdomain.com → your@gmail.com)

### Storage & Databases

**File Storage**
- **Vercel Blob** - Simple file uploads (great for public files, images)
- **Cloudflare R2** - S3-compatible private storage (no egress fees, perfect for user uploads, backups)

**Databases**
- **Neon** - PostgreSQL (already in our stack, great free tier)
- **Drizzle ORM** - Type-safe database queries (already in our stack)

**Caching & Real-time**
- **Upstash Redis** - Serverless Redis for caching, rate limiting, sessions (generous free tier)
- **Upstash Kafka** - For event streaming if you need it

### Communication

**Email**
- **Resend** - Modern email API (100 emails/day free, perfect for transactional emails)
- Use for: Welcome emails, password resets, notifications, newsletters

### AI Models & LLMs

**For Prototyping & Quick Ideas** (Fast + Cheap)
- **Claude Haiku 4.5** (`claude-haiku-4-5`) - Fast, cheap, great for simple tasks
- **Gemini Flash Lite** (`gemini-flash-lite`) - Google's fastest model

**For Production & Advanced Features** (Powerful)
- **GPT-5** (`gpt-5`) - Most capable for complex reasoning
- **Gemini 2.5 Pro** (`gemini-2-5-pro`) - Google's most powerful model
- **Claude Sonnet 4.5** (`claude-sonnet-4-5`) - Best for coding and long context

**Provider Recommendations**
- Use **Anthropic API** for Claude models (great for coding assistants)
- Use **Google AI API** for Gemini models (generous free tier)
- Mix and match based on task complexity and budget

### Monitoring & Observability

**Error Tracking**
- **Sentry.io** - Catch and debug errors in production (free tier available)
- Get alerts when users hit errors
- See stack traces and user context

**LLM Tracing & Analytics**
- **Langfuse** - Track LLM calls, costs, latency, and quality
- Essential for debugging AI features
- Monitor token usage and costs
- A/B test different prompts

**Application Monitoring**
- **Vercel Analytics** - Built-in if using Vercel
- **Google Analytics** - Free, comprehensive

### Authentication & Security

**Auth** (from workshop stack)
- **Clerk** - Easy user authentication

**Security**
- **Cloudflare** - DDoS protection, WAF, rate limiting (free tier)
- Enable on your domain after deployment

### Cost Optimization Tips

1. **Start with free tiers** - Most services have generous free tiers
2. **Use Haiku/Flash for prototypes** - Switch to Pro models only when needed
3. **Cache aggressively** - Use Upstash Redis to cache API responses
4. **Cloudflare R2 over S3** - No egress fees saves money
5. **Monitor with Langfuse** - Track LLM costs before they get expensive

### Recommended Architecture for Production

```
Frontend (Next.js 15)
├── Hosting: Vercel
├── Domain: Cloudflare
├── CDN: Cloudflare (auto)
└── Analytics: Vercel Analytics

Backend
├── Database: Neon PostgreSQL + Drizzle ORM
├── Cache: Upstash Redis
├── File Storage: Cloudflare R2 (private) + Vercel Blob (public)
├── Email: Resend
└── API: Next.js API Routes + Server Actions

AI/LLM
├── SDK: Vercel AI SDK 5
├── Models: Claude Haiku (prototype) → GPT-5 (production)
├── Tracing: Langfuse
└── Fallbacks: Multiple providers for reliability

Monitoring
├── Errors: Sentry
├── LLM: Langfuse
└── Uptime: Vercel

Deployment
├── Primary: Vercel (automatic)
└── Alternative: GCP Cloud Run (for custom needs)
```

### Migration Path

**Workshop → MVP → Production**

1. **Workshop** (Free Tier)
   - Vercel hosting
   - Neon database
   - Vercel Blob
   - No monitoring

2. **MVP** (Still mostly free)
   - Add Sentry (errors)
   - Add Resend (emails)
   - Add custom domain (Cloudflare)
   - Add Langfuse (LLM tracking)

3. **Production** (Paid as you scale)
   - Upgrade Neon plan
   - Add Upstash Redis (caching)
   - Switch to Cloudflare R2 (private files)
   - Use production LLM models
   - Add monitoring & alerting

### Learning Resources

- **Vercel AI SDK 5**: https://sdk.vercel.ai/docs
- **Drizzle ORM**: https://orm.drizzle.team
- **Langfuse**: https://langfuse.com/docs
- **Cloudflare R2**: https://developers.cloudflare.com/r2
- **Upstash Redis**: https://upstash.com/docs/redis
- **Sentry**: https://docs.sentry.io

---

## Tips for Success

1. **Start Small**: Pick an EASY project first to learn the stack
2. **Read the Brief**: Each project has detailed instructions
3. **Use Claude Code**: Let AI help with boilerplate and setup
4. **Customize**: Make it your own! Add features you want
5. **Deploy**: Get it live on Vercel (free tier)
6. **Share**: Add to your portfolio and GitHub

---

## Questions or Issues?

During the workshop:
- Ask the instructor or TAs
- Check the project's brief for hints
- Use Claude Code to debug

After the workshop:
- Open an issue in this repo
- Share your project for feedback
- Connect with other builders

---

**Ready to build something awesome? Pick a project and let's go!**
