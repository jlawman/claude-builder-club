# Claude Builder Club Workshop

Workshop materials for building AI-powered applications with Claude Code.

## Quick Start

### Option 1: Use the CLI Tool (Recommended)

Run the interactive project scaffolder:

```bash
npx builder-club
```

The CLI will:
- Let you choose a project by difficulty (Easy, Medium, Hard)
- Save the mission brief to your current directory
- Copy the initial Claude Code prompt to your clipboard
- Show you exactly what commands to run

### Option 2: Browse Project Briefs Directly

All project briefs are in the `workshop-projects/` directory:

```
workshop-projects/
├── easy/          - Simple projects for learning
├── medium/        - Multi-feature projects
├── hard/          - Advanced projects
└── quick/         - Quick projects (zero setup)
```

Each project brief includes:
- Mission statement and requirements
- Database schema (if needed)
- Initial prompt for Claude Code
- Step-by-step development guide

### Option 3: Quick Prompts

For fast ideas you can build immediately, see:

**[QUICK-PROMPTS.md](QUICK-PROMPTS.md)** - 100+ copy-paste prompts for quick projects

## Documentation

- **[OVERVIEW.md](OVERVIEW.md)** - Workshop overview and project structure
- **[STACK.md](STACK.md)** - Recommended technology stack
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to add new projects

## Prerequisites

Required:
- Node.js 18+
- Bun (recommended) or npm
- Git
- OpenAI or Anthropic API key

Optional:
- GitHub CLI
- Vercel CLI
- Neon account (for database projects)

## Tech Stack

All full-stack projects use:
- Next.js 15 (App Router, src/ directory)
- Vercel AI SDK 5
- TypeScript
- Tailwind CSS
- Drizzle ORM + Neon (database projects)
- Vercel Blob (file storage)

## Project Difficulty Levels

**Easy**
- Single main feature
- Minimal or no database
- Great for learning the stack

**Medium**
- Multiple features
- Database with 2-4 tables
- Multiple integrations

**Hard**
- Complex feature set
- Advanced patterns
- Production-ready quality

## Getting Help

- Reference the project brief for detailed instructions
- Check OVERVIEW.md for workshop structure
- Ask your workshop instructor
- Open an issue in this repository

## Workshop Formats

**Quick** - Everyone builds the same Easy project together

**Self-Paced** - Choose any project, build independently

**Hackathon** - Teams tackle Medium or Hard projects
