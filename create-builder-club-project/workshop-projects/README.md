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

## Projects by Category

### 📚 Academic Life

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

### 💼 Career Development

#### Easy
- **[Resume Roaster](./easy/resume-roaster.md)** - Get AI feedback on your resume
- **[Cold Email Generator](./easy/cold-email-generator.md)** - Craft personalized outreach emails

#### Medium
- **[GitHub Portfolio Builder](./medium/github-portfolio.md)** - Auto-generate portfolio site from your repos
- **[Mock Interview Simulator](./medium/mock-interview.md)** - Practice interviews with AI feedback

#### Hard
- **[LinkedIn Optimizer Suite](./hard/linkedin-optimizer.md)** - Complete professional profile enhancement

### 🎯 Campus Life

#### Easy
- **[Dining Hall Menu Tracker](./easy/dining-hall-menu.md)** - Find the best meals on campus
- **[Free Food Finder](./easy/free-food-finder.md)** - Never miss free campus food events

#### Medium
- **[Campus Event Aggregator](./medium/campus-events.md)** - Personalized campus event discovery
- **[Textbook Price Hunter](./medium/textbook-hunter.md)** - Find cheapest textbook options

#### Hard
- **[Campus Wrapped](./hard/campus-wrapped.md)** - Your semester in review with data visualization

### 💰 Personal Finance

#### Easy
- **[Simple Budget Tracker](./easy/budget-tracker.md)** - Track spending with SMS/email parsing

#### Medium
- **[Scholarship Finder Bot](./medium/scholarship-finder.md)** - Auto-discover scholarship opportunities
- **[Subscription Tracker](./medium/subscription-tracker.md)** - Find and manage recurring expenses

#### Hard
- **[Financial Dashboard](./hard/financial-dashboard.md)** - Complete financial overview with predictions

### 🎨 Creative & Social

#### Easy
- **[Meme Generator](./easy/meme-generator.md)** - AI-powered meme creation from trending topics
- **[Playlist Curator](./easy/playlist-curator.md)** - Mood-based Spotify playlists
- **[Date Idea Generator](./easy/date-idea-generator.md)** - Perfect date planning assistant

#### Medium
- **[Group Chat Summarizer](./medium/group-chat-summarizer.md)** - TL;DR for busy group chats
- **[Social Media Post Generator](./medium/social-media-posts.md)** - Content ideas for all platforms

#### Hard
- **[Social Media Cleaner](./hard/social-media-cleaner.md)** - Professional brand audit

### 🏋️ Health & Wellness

#### Easy
- **[Workout Routine Builder](./easy/workout-builder.md)** - Custom gym routines for campus facilities

#### Medium
- **[Meal Prep Planner](./medium/meal-prep-planner.md)** - Weekly meal planning with grocery lists
- **[Mental Health Check-in](./medium/mental-health-checkin.md)** - Mood tracking and journaling

### 🛠️ Productivity Tools

#### Easy
- **[Email Template Generator](./easy/email-templates.md)** - Common email scenarios covered

#### Medium
- **[Calendar Optimizer](./medium/calendar-optimizer.md)** - Smart scheduling assistant
- **[Note Organizer](./medium/note-organizer.md)** - Tag and search across all notes

#### Hard
- **[Personal Knowledge Base](./hard/knowledge-base.md)** - Second brain with AI-powered search

---

## Difficulty Levels Explained

### 🟢 Easy (1-2 hours)
- Minimal database requirements (or no DB)
- 1-2 API integrations
- Basic CRUD operations
- Great for learning the tech stack
- Focus on UI and single feature

### 🟡 Medium (2-4 hours)
- Database with 2-4 tables
- Multiple API integrations
- User authentication recommended
- 3-5 core features
- Some data processing/analysis

### 🔴 Hard (4+ hours)
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

### Option 1: Guided Build (90 min)
- Everyone builds the same EASY project together
- Instructor demos, students follow along
- Great for learning the stack

### Option 2: Choose Your Own Adventure (2-3 hours)
- Students pick any project at their skill level
- Work independently or in pairs
- Show & tell at the end

### Option 3: Hackathon Style (4+ hours)
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

Here are some great free APIs to use:

### AI/LLM
- OpenAI (free trial credits)
- Anthropic (free trial credits)
- Together AI (free credits)

### Data & Content
- NewsAPI (100 requests/day free)
- OpenWeather (1000 calls/day free)
- Spotify API (free with account)
- GitHub API (60 requests/hour unauthenticated)

### Communication
- Resend (100 emails/day free)
- Twilio (trial credits)

### Utilities
- Unsplash (50 requests/hour)
- Google Places API (free tier)
- ExchangeRate-API (1500 requests/month)

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

**Ready to build something awesome? Pick a project and let's go!** 🚀
