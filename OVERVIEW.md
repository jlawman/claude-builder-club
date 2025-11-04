# Claude Builder Club Workshop

Hey! This repo has everything you need to build AI-powered apps with Claude Code.

## What's In Here

1. **`workshop-projects/`** - Project ideas organized by difficulty
   - Quick projects (5-30 min, no setup)
   - Full-stack projects (1-4 hours)
   - 100+ copy-paste prompts

2. **`create-builder-club-project/`** - NPM tool that sets everything up for you

## Getting Started

### Option 1: Use the CLI (Recommended)

```bash
npx builder-club
```

This will:
- Check if you have the right tools installed
- Let you pick a project
- Scaffold everything for you
- Copy the project brief and initial prompt
- Get you ready to build

### Option 2: Browse Projects Manually

Check out `workshop-projects/` to see all the project ideas. Each has:
- Clear mission brief
- Initial Claude Code prompt (copy-paste ready)
- Step-by-step guide
- Extension ideas

Start with **[Quick Projects](workshop-projects/quick/QUICK-PROMPTS.md)** if you want something fast with zero setup.

## What You'll Need

Before the workshop, make sure you have:

- **Node.js 18+** (https://nodejs.org)
- **Bun** (faster than npm): `curl -fsSL https://bun.sh/install | bash`
- **Git** (https://git-scm.com)
- **API key** - OpenAI (https://platform.openai.com) or Anthropic

Optional but helpful:
- GitHub CLI (https://cli.github.com) for pushing code
- Vercel CLI (`npm install -g vercel`) for deploying
- Neon account (https://neon.tech) if your project needs a database

## Project Types

### ⚡ Quick Projects (5-30 min)
No API keys, no database, just build:
- Pomodoro timer, calculators, games
- Pokemon lookup, trivia quiz
- Color generators, typing tests
- [See all 100 prompts →](workshop-projects/quick/QUICK-PROMPTS.md)

### 🟢 Easy (1-2 hours)
Single feature, minimal complexity:
- Study guide generator
- Resume roaster
- Meme generator
- Date idea generator

### 🟡 Medium (2-4 hours)
Multiple features, uses database:
- Scholarship finder
- GitHub portfolio builder

### 🔴 Hard (4+ hours)
Advanced features, good for portfolio:
- Smart study buddy (RAG with documents)
- Research paper assistant

## Tech Stack

All full-stack projects use:

- **Next.js 15** (App Router with `src/` directory)
- **Vercel AI SDK 5** for LLM stuff
- **TypeScript**
- **Tailwind CSS**
- **Drizzle ORM + Neon** (for database projects)
- **Vercel Blob** (for file uploads)

Python projects use **uv** for package management.

### Project Structure

Everything follows this pattern:

```
src/
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── actions.ts          # Server actions here
│   │   └── components/          # Components used by this page
│   │       └── chart.tsx
│   └── api/
│       └── route.ts
├── components/                   # Shared components
│   └── ui/
└── lib/
    ├── db/                      # Database stuff
    └── utils.ts
```

Keep things close to where they're used. If a component is only used on one page, put it in that page's `components/` folder.

## Workshop Formats

### Quick Session (90 min)
1. Everyone picks the same EASY project
2. Build it together
3. Deploy to Vercel
4. Done!

### Self-Paced (2-3 hours)
1. Pick any project you want
2. Build at your own pace
3. Show what you made at the end

### Hackathon (4+ hours)
1. Team up
2. Pick a MEDIUM or HARD project
3. Build something cool
4. Present it

## Common Issues

**"Module not found"**
→ Run `bun install`

**"API key error"**
→ Check your `.env.local` file has the right keys

**"Port 3000 already in use"**
→ Kill the other process or use a different port

**Next.js 15 vs 16**
→ Use Next.js 15 for these projects (it's what everything is tested on)

## Tips

- Start with a Quick Project if it's your first time
- Read the project brief before asking Claude Code to build
- Use Context7 or web search to get Vercel AI SDK 5 docs
- Deploy your project even if it's not perfect
- Add it to your GitHub for your portfolio

---

Questions? Ask during the workshop or check the project briefs for detailed help.
