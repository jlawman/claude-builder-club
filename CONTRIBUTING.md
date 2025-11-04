# Contributing New Projects

## Process

1. Write project brief (markdown)
2. Add entry to `projects.ts`
3. Copy brief to package folder
4. Test locally
5. Publish to npm

## Creating a Project Brief

### Location

```bash
# Workshop projects
workshop-projects/{easy|medium|hard}/project-name.md

# Quick projects
workshop-projects/quick/{web-apps|browser-apis|python-scripts}/project-name.md
```

### Structure

Required sections:

```markdown
# Project Name

**Difficulty:** 🟢 Easy | **Time:** 1-2 hours | **Category:** Category Name

## Mission Brief
[Problem statement. What you're building. Why it matters.]

## User Stories
- ✅ User action 1
- ✅ User action 2

## Tech Stack
[List technologies]

## Database Schema
[If applicable. Include Drizzle schema.]

## Core Features
### Must-Have
- [ ] Feature 1
- [ ] Feature 2

### Nice-to-Have
- [ ] Enhancement 1

## File Structure
[Recommended project structure]

## Initial Prompt for Claude Code
```
[Critical section. Students copy-paste this directly into Claude Code.
Must be specific, complete, and actionable.
Include all requirements upfront.]
```

## Development Steps
[Phased breakdown with time estimates]

## Testing Checklist
- [ ] Test item 1
- [ ] Test item 2

## Extensions & Improvements
[Ideas for expansion]

## Success Criteria
[Clear completion indicators]
```

### The Initial Prompt

This is what matters most. Students paste it into Claude Code.

Requirements:
- Specific details, not vague instructions
- All features listed upfront
- Tech stack specified
- Structure requirements clear
- Mention using context7 or web for Vercel AI SDK 5 docs

Example structure:
```
Build [project name] using Next.js 15.

IMPORTANT: Use context7 MCP to get Vercel AI SDK 5 documentation.

Tech Stack:
- Next.js 15 (App Router, src/ directory)
- Vercel AI SDK 5
- Tailwind CSS

Features:
1. [Specific feature with details]
2. [Specific feature with details]
3. [Specific feature with details]

Structure:
- [File organization requirements]

Start with project setup, then implement features in phases.
```

## Adding to projects.ts

Edit `create-builder-club-project/src/projects.ts`:

```typescript
{
  id: 'project-id',                        // kebab-case
  name: 'Project Display Name',
  description: 'One-line description',     // Shows in selection menu
  difficulty: 'easy',                       // easy | medium | hard
  category: 'academic',                     // See categories below
  timeEstimate: '1-2 hours',
  briefPath: './workshop-projects/easy/project-name.md',
  hasDatabase: false,                       // Requires Neon + Drizzle?
  hasPython: false,                         // Requires uv?
}
```

### Categories

- `academic` - Education, studying, research
- `career` - Jobs, resumes, portfolios
- `finance` - Money, budgeting, tracking
- `productivity` - Tasks, notes, organization
- `creative` - Design, content, media
- `health` - Fitness, wellness
- `social` - Communication, events
- `fun` - Games, entertainment
- `data` - Analysis, visualization

### Difficulty Definitions

**Easy (1-2 hours)**
- Single main feature
- Minimal or no database
- 1-2 API calls maximum
- Suitable for beginners

**Medium (2-4 hours)**
- 3-5 features
- Database with 2-4 tables
- Multiple integrations
- Moderate complexity

**Hard (4+ hours)**
- Complex feature set
- Advanced patterns (RAG, embeddings)
- Multiple services
- Production-ready quality

## Testing

```bash
cd create-builder-club-project

# Install and build
bun install
bun run build

# Link locally
npm link

# Test
builder-club
```

Verify:
- Project appears in correct category
- Brief file found and copied
- Initial prompt copied to clipboard
- Environment template correct
- No errors during scaffold

## Publishing

```bash
cd create-builder-club-project

# Version bump (semantic versioning)
npm version patch   # 0.1.0 → 0.1.1 (fixes)
npm version minor   # 0.1.0 → 0.2.0 (features)
npm version major   # 0.1.0 → 1.0.0 (breaking)

# Rebuild and publish
bun run build
npm publish
```

## Quality Standards

### Initial Prompts

Bad:
```
Build a todo app
```

Good:
```
Build a todo app with:
1. Add task form (title, priority dropdown)
2. Task list (checkboxes, delete buttons)
3. Filters (all/active/completed)
4. localStorage persistence
5. Dark mode

Next.js 15, Tailwind CSS, responsive design.
```

### Time Estimates

Be accurate. Test by building it yourself or estimate conservatively.

### Project Selection

Include projects that:
- Solve real problems students have
- Can be completed in stated time
- Teach useful patterns or APIs
- Can be extended beyond workshop
- Result in portfolio-worthy work

Avoid:
- Overly niche applications
- Requires paid services
- Too similar to existing projects
- Cannot be completed in workshop timeframe
- Needs specialized hardware/access

## File Organization

```
workshop-projects/
├── easy/
│   └── project-name.md
├── medium/
│   └── project-name.md
├── hard/
│   └── project-name.md
└── quick/
    ├── web-apps/
    ├── browser-apis/
    └── python-scripts/

create-builder-club-project/
├── src/
│   ├── projects.ts              # Add entry here
│   └── index.ts
└── workshop-projects/           # Copy briefs here
    ├── easy/
    │   └── project-name.md      # Copy of your brief
    ├── medium/
    └── hard/
```

## Example: Adding Budget Tracker

1. Create `workshop-projects/easy/budget-tracker.md`
2. Write brief following template
3. Add to `projects.ts`:

```typescript
{
  id: 'budget-tracker',
  name: 'Simple Budget Tracker',
  description: 'Track expenses by category with charts',
  difficulty: 'easy',
  category: 'finance',
  timeEstimate: '1-2 hours',
  briefPath: './workshop-projects/easy/budget-tracker.md',
  hasDatabase: true,
  hasPython: false,
}
```

4. Copy: `cp workshop-projects/easy/budget-tracker.md create-builder-club-project/workshop-projects/easy/`
5. Test: `cd create-builder-club-project && bun run build && npm link && builder-club`
6. Publish: `npm version minor && bun run build && npm publish`

## Quick vs Workshop Projects

**Quick Project** (5-45 minutes):
- No database
- No API keys (or public APIs only)
- Single HTML file or minimal Next.js
- localStorage acceptable

**Workshop Project** (1-4+ hours):
- May need database
- May require API keys
- Full Next.js structure
- Multiple features
- Educational value

Choose format based on complexity and setup requirements.

---

Review existing briefs for reference. Test thoroughly. Ship quality work.
