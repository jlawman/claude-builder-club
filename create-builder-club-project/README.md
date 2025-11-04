# builder-club

🎓 **Claude Builder Club @ Oxford** - Official project scaffolding tool for workshop participants.

Quickly scaffold AI-powered web applications with Next.js 15, Vercel AI SDK 5, and best practices baked in.

## Usage

No installation needed! Use `npx` to run directly:

```bash
npx builder-club
```

Or with Yarn/pnpm:

```bash
# Yarn
yarn dlx builder-club

# pnpm
pnpm dlx builder-club
```

## What It Does

This CLI tool will:

1. ✅ Check for required tools (Node.js, Bun, Git, GitHub CLI, Vercel CLI, uv)
2. 🎯 Guide you through selecting a project (category, difficulty, specific project)
3. 🚀 Scaffold a complete Next.js 15 app with:
   - `src/` directory structure
   - Vercel AI SDK 5 pre-installed
   - Database setup (if needed: Drizzle + Neon)
   - TypeScript and Tailwind CSS
4. 📋 Copy the project brief to `MISSION.md`
5. 💡 Copy the initial Claude Code prompt to your clipboard
6. 🎁 Create `.env.example` with required API keys

## Project Categories

- 📚 **Academic Life** - Study guides, grade calculators, course reviews
- 💼 **Career Development** - Resume tools, interview prep, portfolio builders
- 🎯 **Campus Life** - Event finders, dining hall menus, textbook hunting
- 💰 **Personal Finance** - Budget trackers, scholarship finders
- 🎨 **Creative & Social** - Meme generators, playlist curators, date planners
- 🏋️ **Health & Wellness** - Workout builders, meal planners, mood tracking
- 🛠️ **Productivity** - Note organizers, calendar optimizers, email templates

## Difficulty Levels

- 🟢 **Easy** (1-2 hours) - Single feature, minimal database, great for learning
- 🟡 **Medium** (2-4 hours) - Multiple features, database, authentication
- 🔴 **Hard** (4+ hours) - Complex features, multiple services, portfolio-worthy

## Example Flow

```bash
$ npx builder-club

🔍 Checking for required tools...
✓ Node.js (v20.10.0)
✓ Bun (1.1.0)
✓ GitHub CLI (2.40.0)
✓ Vercel CLI (33.0.0)

? What type of project would you like to build?
  📚 Academic Life
❯ 💼 Career Development
  🎯 Campus Life

? Choose your difficulty level:
❯ 🟢 Easy (1-2 hours)
  🟡 Medium (2-4 hours)
  🔴 Hard (4+ hours)

? Select your project:
❯ Resume Roaster - Get AI feedback on your resume
  Cold Email Generator - Craft personalized outreach emails

? What would you like to name your project? my-resume-roaster

📋 Project Summary:
  Project: Resume Roaster
  Difficulty: 🟢 EASY
  Time: 1-2 hours
  Folder: ./my-resume-roaster

✨ Project created successfully!

📝 Next steps:
  1. cd my-resume-roaster
  2. Read the MISSION.md file for full project details
  3. Add your API keys to .env.local
  4. Start building with Claude Code!

💡 Initial Prompt (copied to clipboard):
────────────────────────────────────────────────────────────
I want to build a Resume Roaster web app using Next.js 15...
────────────────────────────────────────────────────────────

Happy building! 🚀
```

## After Running

Once your project is created, you'll find:

```
my-project/
├── MISSION.md              # Full project brief with instructions
├── .env.example            # Template for API keys
├── .env.local              # Your local environment (add keys here!)
├── src/
│   ├── app/
│   │   ├── page.tsx        # Landing page
│   │   └── layout.tsx
│   ├── components/         # Global components
│   └── lib/                # Utilities and DB
├── package.json
└── ...Next.js files
```

### Getting Started

1. **Add your API keys** to `.env.local`:
   ```env
   OPENAI_API_KEY=sk-...
   # or
   ANTHROPIC_API_KEY=sk-ant-...
   ```

2. **Read `MISSION.md`** - Contains:
   - Full project requirements
   - Database schema (if needed)
   - File structure
   - Initial Claude Code prompt
   - Development steps
   - Testing checklist
   - Extension ideas

3. **Start Claude Code**:
   - The initial prompt is in your clipboard
   - Paste it into Claude Code
   - Let Claude guide you through building!

4. **Run the dev server**:
   ```bash
   bun dev  # or npm run dev
   ```

## Requirements

- **Node.js 18+** (Required)
- **Bun** (Recommended, but npm/pnpm work too)
- **Git** (Recommended for version control)
- **GitHub CLI** (Optional, for creating repos and PRs)
- **Vercel CLI** (Optional, for deployment)
- **uv** (Optional, for Python data analysis projects)

The tool will check for these and warn you if anything is missing.

## Tech Stack

All projects use:

- **Next.js 15** with App Router and `src/` directory
- **Vercel AI SDK 5** for LLM integration
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Drizzle ORM + Neon** (for projects with databases)
- **Vercel Blob Storage** (for file uploads)

## For Workshop Organizers

### Publishing to NPM

1. Build the package:
   ```bash
   cd create-builder-club-project
   bun install
   bun run build
   ```

2. Test locally:
   ```bash
   npm link
   builder-club
   ```

3. Publish to NPM:
   ```bash
   npm login
   npm publish
   ```

### Adding New Projects

1. Create a new brief in `workshop-projects/{easy,medium,hard}/your-project.md`
2. Follow the existing format (see `study-guide-generator.md` as template)
3. Add project to `src/projects.ts`:
   ```typescript
   {
     id: 'your-project',
     name: 'Your Project Name',
     description: 'Brief description',
     difficulty: 'easy',
     category: 'academic',
     timeEstimate: '1-2 hours',
     briefPath: '../workshop-projects/easy/your-project.md',
     hasDatabase: false,
     hasPython: false,
   }
   ```
4. Rebuild and republish

### Project Brief Template

Each project brief should include:

- ✅ Mission Brief (problem + solution)
- ✅ User Stories
- ✅ Tech Stack
- ✅ Database Schema (if applicable)
- ✅ Core Features (must-have + nice-to-have)
- ✅ File Structure
- ✅ **Initial Prompt for Claude Code** (most important!)
- ✅ Development Steps
- ✅ Testing Checklist
- ✅ Extensions & Improvements
- ✅ Common Issues & Solutions
- ✅ Resources

## Development

```bash
# Install dependencies
bun install

# Build
bun run build

# Test locally
npm link
builder-club

# Or run directly
bun run start
```

## License

MIT

## Questions?

- Check the workshop materials
- Ask your instructor or TA
- Open an issue if you find a bug

---

**Built for Claude Builder Club @ Oxford** 🎓

Happy building! 🚀
