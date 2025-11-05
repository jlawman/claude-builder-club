# Claude Builder Club Workshop

Workshop materials for building AI-powered applications with Claude Code.

## Contents

1. **`workshop-projects/`** - Project briefs by difficulty
   - Quick projects (zero setup)
   - Full-stack projects
   - 100+ copy-paste prompts

2. **`create-builder-club-project/`** - CLI tool for project scaffolding

## Getting Started

### Option 1: CLI Tool

```bash
npx builder-club
```

Checks tools, guides project selection, scaffolds Next.js structure, copies brief and initial prompt, creates environment templates, initializes git.

### Option 2: Browse Projects

Navigate to `workshop-projects/` for all project briefs. Each includes mission brief, initial Claude Code prompt, step-by-step guide, extension ideas.

Quick projects with zero setup: **[QUICK-PROMPTS.md](workshop-projects/quick/QUICK-PROMPTS.md)**

## Prerequisites

Required:
- Node.js 18+ (https://nodejs.org)
- Bun (https://bun.sh)
- Git (https://git-scm.com)
- API key - OpenAI or Anthropic

Optional:
- GitHub CLI (https://cli.github.com)
- Vercel CLI (`npm install -g vercel`)
- Neon account (https://neon.tech) for database projects

## Project Types

### Quick Projects
Zero API keys, zero database, zero setup.
- Client-side apps: timers, calculators, games
- Public APIs: Pokemon, trivia, weather
- Browser APIs: voice notes, image filters
- [100 prompts →](workshop-projects/quick/QUICK-PROMPTS.md)

### Easy
Single feature, minimal database.
- Study guide generator
- Resume feedback tool
- Meme generator
- Date planner

### Medium
Multiple features, database required.
- Scholarship finder
- GitHub portfolio builder

### Hard
Advanced features, portfolio quality.
- Smart study buddy (RAG)
- Research paper assistant

## Tech Stack

Full-stack projects:
- Next.js 15 (App Router, `src/` directory)
- Vercel AI SDK 5
- TypeScript
- Tailwind CSS
- Drizzle ORM + Neon (database)
- Vercel Blob (file storage)

Python projects: **uv** for package management

### File Structure

Standard pattern:

```
src/
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── actions.ts              # Server actions
│   │   └── components/              # Page-specific components
│   │       └── chart.tsx
│   └── api/
│       └── route.ts
├── components/                      # Shared components
│   └── ui/
└── lib/
    ├── db/                          # Database
    └── utils.ts
```

Colocate files with their usage. Page-specific components go in that page's folder.

## Workshop Formats

### Quick
1. Same EASY project for all
2. Build together
3. Deploy to Vercel

### Self-Paced
1. Choose any project
2. Build independently
3. Show results

### Hackathon
1. Teams
2. MEDIUM or HARD projects
3. Present work

## Common Issues

**Module not found**
→ `bun install`

**API key error**
→ Check `.env.local`

**Port 3000 in use**
→ Kill process or change port

**Next.js version**
→ Use Next.js 15 (tested), not 16

## Best Practices

- Start with Quick Projects for familiarity
- Read project brief before building
- Use Context7 or web for Vercel AI SDK 5 documentation
- Deploy even if incomplete
- Add to GitHub portfolio

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for adding new projects to the CLI tool.

## Support

Reference project briefs for detailed instructions. Questions during workshop: ask instructor.

---

**Claude Builder Club Workshop Materials**
