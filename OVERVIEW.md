# Claude Builder Club @ Oxford - Workshop Package

Complete NPM scaffolding tool for university students to build AI-powered web applications.

## What We've Built

This repository contains:

1. **`create-builder-club-project/`** - NPM package that scaffolds projects
2. **`workshop-projects/`** - Collection of project briefs organized by difficulty

## Package: create-builder-club-project

An interactive CLI that:
- ✅ Checks for required tools (Node, Bun, Git, GitHub CLI, Vercel CLI, uv)
- ✅ Guides users through project selection (category → difficulty → specific project)
- ✅ Scaffolds Next.js 15 app with proper structure
- ✅ Installs Vercel AI SDK 5 and dependencies
- ✅ Copies the full project brief to `MISSION.md`
- ✅ Copies initial Claude Code prompt to clipboard
- ✅ Creates `.env` templates with needed keys
- ✅ Initializes git repository
- ✅ Shows next steps and recommendations

## Quick Start for Students

```bash
# Just run this!
npx create-builder-club-project

# Follow the interactive prompts
# Get a fully scaffolded project ready to build
```

## For Workshop Organizers

### Testing Locally

```bash
cd create-builder-club-project

# Install dependencies
bun install

# Build the package
bun run build

# Test it locally
npm link

# Run it
create-builder-club-project

# Or run directly from source
bun run start
```

### Publishing to NPM

```bash
cd create-builder-club-project

# 1. Make sure you're logged in to npm
npm login

# 2. Build the package
bun run build

# 3. Test the package locally first
npm pack
# This creates a .tgz file you can inspect

# 4. Publish to npm
npm publish

# For first publish, you might need:
npm publish --access public
```

### Publishing Updates

```bash
# 1. Update version in package.json
#    Follow semantic versioning:
#    - 0.1.0 -> 0.1.1 (patch: bug fixes)
#    - 0.1.0 -> 0.2.0 (minor: new features)
#    - 0.1.0 -> 1.0.0 (major: breaking changes)

# Or use npm version command:
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.0 -> 0.2.0
npm version major  # 0.1.0 -> 1.0.0

# 2. Rebuild
bun run build

# 3. Publish
npm publish
```

## Project Structure

```
claude-code-builder/
├── create-builder-club-project/     # NPM package
│   ├── src/
│   │   ├── index.ts                 # Main CLI logic
│   │   ├── projects.ts              # Project metadata
│   │   └── utils/
│   │       └── check-tools.ts       # Tool detection
│   ├── workshop-projects/           # Copied from root
│   │   ├── easy/
│   │   ├── medium/
│   │   └── hard/
│   ├── dist/                        # Built JS (generated)
│   ├── package.json
│   ├── README.md                    # Package documentation
│   └── WORKSHOP-SETUP.md            # Student setup guide
│
└── workshop-projects/               # Source of truth for briefs
    ├── README.md                    # Overview of all projects
    ├── easy/
    │   ├── study-guide-generator.md
    │   ├── resume-roaster.md
    │   ├── meme-generator.md
    │   └── date-idea-generator.md
    ├── medium/
    │   └── scholarship-finder.md
    └── hard/
        └── (more projects...)
```

## Adding New Projects

### 1. Create the Project Brief

Create a new markdown file in the appropriate difficulty folder:

```bash
# Example: adding a new easy project
touch workshop-projects/easy/budget-tracker.md
```

Follow the template format (see existing briefs):

```markdown
# Project Name

**Difficulty:** 🟢 Easy | **Time:** 1-2 hours | **Category:** Finance

## Mission Brief
[Clear problem statement and solution]

## User Stories
[What users can do]

## Tech Stack
[Technologies used]

## Database Schema
[If applicable]

## Core Features
[Must-haves and nice-to-haves]

## File Structure
[Recommended project structure]

## Initial Prompt for Claude Code
\`\`\`
[THE MOST IMPORTANT PART - the prompt students will use!]
\`\`\`

## Development Steps
[Breakdown by time]

## Testing Checklist
[What to verify]

## Extensions & Improvements
[Ideas to expand]
```

### 2. Add to projects.ts

Edit `create-builder-club-project/src/projects.ts`:

```typescript
{
  id: 'budget-tracker',
  name: 'Simple Budget Tracker',
  description: 'Track spending with SMS/email parsing',
  difficulty: 'easy',
  category: 'finance',
  timeEstimate: '1-2 hours',
  briefPath: './workshop-projects/easy/budget-tracker.md',
  hasDatabase: true,    // true if uses Neon + Drizzle
  hasPython: false,     // true if needs uv/Python
}
```

### 3. Copy to Package

```bash
# Copy the new brief to the package
cp workshop-projects/easy/budget-tracker.md create-builder-club-project/workshop-projects/easy/
```

### 4. Rebuild and Test

```bash
cd create-builder-club-project
bun run build
npm link
create-builder-club-project  # Test it works
```

### 5. Publish Update

```bash
npm version patch
npm publish
```

## Workshop Format Suggestions

### Option 1: Guided Workshop (90 min)
1. **Setup (10 min)**: Everyone runs `npx create-builder-club-project`
2. **Pick Same Project (5 min)**: Instructor chooses an EASY project for all
3. **Build Together (60 min)**: Instructor demos, students follow
4. **Deploy (10 min)**: Push to Vercel
5. **Show & Tell (5 min)**: Share results

### Option 2: Choose Your Own (2-3 hours)
1. **Setup (10 min)**: Tool check and package installation
2. **Browse & Choose (10 min)**: Students pick their project
3. **Build Time (90+ min)**: Work independently with Claude Code
4. **Show & Tell (20 min)**: 2-min demos from volunteers

### Option 3: Hackathon Style (4+ hours)
1. **Setup (15 min)**: Get tools ready
2. **Team Formation (10 min)**: Pairs or trios
3. **Project Selection (10 min)**: Medium or Hard projects
4. **Build Sprint (3+ hours)**: Development time
5. **Judging (30 min)**: Present to panel
6. **Awards**: Most useful, most creative, best demo

## Pre-Workshop Checklist

Send this to students before the workshop:

- [ ] Install Node.js 18+ (https://nodejs.org)
- [ ] Install Bun (recommended): `curl -fsSL https://bun.sh/install | bash`
- [ ] Install Git (https://git-scm.com)
- [ ] Sign up for OpenAI API (https://platform.openai.com) or Anthropic
- [ ] (Optional) Install GitHub CLI: https://cli.github.com
- [ ] (Optional) Install Vercel CLI: `npm install -g vercel`
- [ ] (Optional) Sign up for Neon (https://neon.tech)

## During Workshop

### For Instructors

1. **Quick Demo First**: Show the tool in action (5 min)
2. **Have Backup API Keys**: Some students might not have their own
3. **Prepare Neon Database**: Or show them how to create one
4. **Common Issues Ready**:
   - "Module not found" → `bun install`
   - "API key error" → Check `.env.local`
   - "Port 3000 in use" → Kill process or use different port

### For Students

The package includes `WORKSHOP-SETUP.md` with:
- Tool installation instructions
- API key setup
- Common commands
- Troubleshooting
- Tips for success

## Tech Stack Details

All projects use:

- **Next.js 15** (App Router with `src/` directory)
  - Note: Package enforces Next.js 15, not 16
- **Vercel AI SDK 5** for LLM integration
  - Students are prompted to read docs via Context7 or web
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Drizzle ORM + Neon** (optional, for database projects)
- **Vercel Blob Storage** (optional, for file uploads)
- **uv** (optional, for Python data analysis projects)

### Project Structure Convention

All projects follow this structure:

```
src/
├── app/
│   ├── page.tsx
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── actions.ts          # Colocated server actions
│   │   └── components/          # Route-specific components
│   │       └── chart.tsx
│   └── api/
│       └── generate/
│           └── route.ts
├── components/                   # Global components
│   ├── ui/
│   └── layout/
└── lib/
    ├── db/                      # Database schemas
    └── utils.ts
```

**Key principle**: Colocate files close to where they're used.

## Available Projects

### Easy (1-2 hours)
- **Study Guide Generator** - Upload notes, get flashcards/quizzes
- **Resume Roaster** - AI feedback on resumes
- **Meme Generator** - AI-powered meme creation
- **Date Idea Generator** - Date planning assistant

### Medium (2-4 hours)
- **Scholarship Finder Bot** - Discover scholarships

### Hard (4+ hours)
- (Add more as created)

## Roadmap

### Short Term
- [ ] Add 3-5 more EASY projects
- [ ] Add 3-5 more MEDIUM projects
- [ ] Add 2-3 HARD projects
- [ ] Create video walkthrough
- [ ] Test with pilot workshop

### Medium Term
- [ ] Add authentication templates (Clerk)
- [ ] Add database migration examples
- [ ] Create deployment guides
- [ ] Build example projects gallery
- [ ] Add contributor guidelines

### Long Term
- [ ] Community-contributed projects
- [ ] Project variations (Python/Rust/etc.)
- [ ] Advanced topics (WebSockets, cron jobs)
- [ ] Integration with Linear/Jira
- [ ] Workshop analytics

## Support

### For Students
- Read `MISSION.md` in your project
- Check `WORKSHOP-SETUP.md` for common issues
- Ask instructor or TA during workshop
- Use Claude Code for debugging

### For Organizers
- Open issues in this repo
- Contact workshop coordinators
- Share feedback and improvements

## Contributing

Want to add a project idea?

1. Fork this repo
2. Create a new brief following the template
3. Add it to `projects.ts`
4. Submit a PR
5. We'll review and publish!

## License

MIT

---

**Built for Claude Builder Club @ Oxford** 🎓

Questions? Feedback? Open an issue or contact the workshop team!
