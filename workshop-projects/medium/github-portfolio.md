# GitHub Portfolio Builder

**Difficulty:** 🟡 Medium | **Time:** 2-4 hours | **Category:** Career Development

## Mission Brief

Students have GitHub profiles full of projects but no polished way to showcase them to recruiters. This tool automatically generates a beautiful portfolio website by analyzing your GitHub repos, creating professional descriptions, and highlighting your best work.

**The Problem:** GitHub profiles are cluttered and don't tell a story. Students don't have time to build a portfolio site, and writing descriptions for projects is tedious.

**The Solution:** Connect your GitHub, let AI analyze your repos, auto-generate project descriptions and tags, then create a deployed portfolio website in minutes.

---

## User Stories

As a developer, I want to:
- ✅ Connect my GitHub account
- ✅ See all my public repositories
- ✅ Get AI-generated project descriptions and READMEs
- ✅ Select which projects to showcase
- ✅ Automatically detect tech stack from code
- ✅ Generate a portfolio website
- ✅ Customize colors and layout
- ✅ Deploy portfolio to Vercel
- ✅ Share portfolio URL

---

## Tech Stack

### Frontend (Next.js 15)
- Next.js 15 with App Router (`src/` directory)
- Tailwind CSS
- Dynamic routing for portfolio generation

### Backend
- Vercel AI SDK 5 for project descriptions
- Server Actions for GitHub API calls
- No database required (can add for saving selections)

### APIs
- GitHub API (60 requests/hour unauthenticated, 5000 with token)
- Vercel AI SDK 5
- No auth required (public repos only)

---

## Database Schema

**Option 1: No Database** (generate on-demand)

**Option 2: With Persistence**
```typescript
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp, boolean, jsonb } from 'drizzle-orm/pg-core';

export const portfolios = pgTable('portfolios', {
  id: serial('id').primaryKey(),
  githubUsername: text('github_username').notNull(),
  selectedRepos: jsonb('selected_repos').$type<string[]>(), // Repo names
  customizations: jsonb('customizations').$type<{
    theme: string;
    accentColor: string;
    tagline: string;
  }>(),
  deployedUrl: text('deployed_url'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  portfolioId: integer('portfolio_id').references(() => portfolios.id),
  repoName: text('repo_name').notNull(),
  description: text('description'), // AI-generated
  techStack: text('tech_stack'), // Comma-separated
  featured: boolean('featured').default(false),
  githubUrl: text('github_url').notNull(),
  liveUrl: text('live_url'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Core Features

### Must-Have Features
1. **GitHub Connection**
   - Input GitHub username
   - Fetch all public repositories
   - Display repo list with stats (stars, forks, language)

2. **Repository Analysis**
   - Parse README.md files
   - Detect languages and technologies
   - Extract repo descriptions
   - Get commit activity

3. **AI Enhancement**
   - Generate professional project descriptions
   - Suggest project categories (Full-stack, Frontend, Tool, etc.)
   - Create tech stack tags from code
   - Recommend featured projects

4. **Project Selection**
   - Checkboxes to select repos
   - Mark projects as "featured"
   - Reorder projects
   - Edit AI-generated descriptions

5. **Portfolio Preview**
   - Live preview of portfolio site
   - Show selected projects
   - Display GitHub stats
   - Responsive design preview

6. **Export/Deploy**
   - Download as Next.js project
   - One-click deploy to Vercel
   - Generate shareable URL

### Nice-to-Have Features
- Custom domain support
- Theme customization (colors, fonts)
- Add non-GitHub projects manually
- Analytics dashboard
- Social links (LinkedIn, Twitter)
- Blog integration

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── build/
│   │   ├── page.tsx                      # Portfolio builder
│   │   ├── actions.ts                    # GitHub & AI actions
│   │   └── components/
│   │       ├── github-input.tsx
│   │       ├── repo-list.tsx
│   │       ├── repo-card.tsx
│   │       ├── project-selector.tsx
│   │       └── customization-panel.tsx
│   ├── preview/
│   │   ├── [username]/
│   │   │   ├── page.tsx                  # Portfolio preview
│   │   │   └── components/
│   │   │       ├── hero-section.tsx
│   │   │       ├── projects-grid.tsx
│   │   │       ├── project-card.tsx
│   │   │       └── footer.tsx
│   └── api/
│       ├── github/
│       │   └── route.ts                  # GitHub API proxy
│       └── analyze/
│           └── route.ts                  # AI analysis
├── components/
│   ├── ui/
│   └── layout/
└── lib/
    ├── github/
    │   ├── api.ts                        # GitHub API helpers
    │   └── types.ts
    ├── ai/
    │   └── analyze-repo.ts               # AI prompts
    └── utils/
        └── tech-detector.ts              # Detect tech from code
```

---

## Initial Prompt for Claude Code

```
I want to build a GitHub Portfolio Builder that auto-generates portfolio websites from GitHub repos.

IMPORTANT: First, use context7 MCP to get the latest Vercel AI SDK 5 documentation.

Tech Stack:
- Next.js 15 with App Router and src/ directory
- Vercel AI SDK 5
- GitHub API (public repos, no auth required)
- Tailwind CSS

Project Structure:
- Use src/ directory
- Colocate server actions in actions.ts
- Route-specific components in local components/ folders

Features to implement:

Phase 1 - GitHub Integration:
1. Landing page (src/app/page.tsx):
   - Hero explaining what the tool does
   - Input field for GitHub username
   - CTA to "Build Portfolio"

2. Build page (src/app/build/page.tsx):
   - Display input GitHub username
   - "Fetch Repositories" button
   - Show loading state while fetching

3. Server action (src/app/build/actions.ts):
   - Fetch repos from GitHub API: https://api.github.com/users/{username}/repos
   - Get repo details: name, description, language, stars, forks, URL
   - Return as JSON

4. Display repos:
   - List all repos as cards
   - Show: name, description, language, stars
   - Checkbox to select repos for portfolio

Phase 2 - AI Analysis:
1. Analyze selected repos using AI SDK 5:
   - Read README.md from each repo
   - Generate professional project description (2-3 sentences)
   - Extract/suggest tech stack
   - Categorize project (Web App, CLI Tool, Library, etc.)

2. Display enhanced project info:
   - Show AI-generated description (editable)
   - Display tech tags
   - Option to mark as "featured"

Phase 3 - Portfolio Preview:
1. Create preview page (src/app/preview/[username]/page.tsx):
   - Hero section with name and tagline
   - Projects grid showing selected projects
   - Each project card has:
     * Project name
     * AI-generated description
     * Tech stack tags
     * GitHub link and live demo link (if available)
   - Footer with GitHub profile link

2. Styling:
   - Modern, clean design
   - Use Tailwind CSS
   - Responsive (mobile-first)
   - Dark mode support

Phase 4 - Export (optional):
1. Generate static site
2. Deploy to Vercel button
3. Download as zip

Start with Phase 1: GitHub API integration and displaying repos.
```

---

## Development Steps

### Phase 1: GitHub API (30 min)
1. Create input form for username
2. Fetch repos from GitHub API
3. Display repo list with stats
4. Add loading and error states

### Phase 2: Repo Selection (20 min)
1. Add checkboxes for selection
2. Show selected count
3. Reorder functionality
4. Mark featured projects

### Phase 3: AI Analysis (40 min)
1. Fetch README from GitHub
2. Write AI prompt for project descriptions
3. Generate descriptions for selected repos
4. Detect tech stack from languages/files
5. Allow editing of generated content

### Phase 4: Portfolio Template (45 min)
1. Create portfolio page template
2. Hero section with GitHub info
3. Projects grid component
4. Project card with description and links
5. Responsive styling

### Phase 5: Preview & Export (25 min)
1. Live preview of portfolio
2. Customization options (colors, layout)
3. Generate shareable URL
4. Optional: Download or deploy

---

## GitHub API Examples

```typescript
// src/lib/github/api.ts

export async function fetchUserRepos(username: string) {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch repos');
  }

  return response.json();
}

export async function fetchRepoReadme(username: string, repo: string) {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${username}/${repo}/readme`,
      {
        headers: {
          Accept: 'application/vnd.github.v3.raw',
        },
      }
    );

    if (!response.ok) return null;
    return response.text();
  } catch {
    return null;
  }
}

export async function fetchRepoLanguages(username: string, repo: string) {
  const response = await fetch(
    `https://api.github.com/repos/${username}/${repo}/languages`
  );

  if (!response.ok) return {};
  return response.json(); // { "JavaScript": 12345, "TypeScript": 67890 }
}
```

---

## AI Analysis Prompt

```typescript
// src/lib/ai/analyze-repo.ts

interface RepoData {
  name: string;
  description: string | null;
  readme: string | null;
  languages: Record<string, number>;
}

export const analyzeRepoPrompt = (repo: RepoData) => `
You are a portfolio expert helping developers showcase their work professionally.

Analyze this GitHub repository and provide:

Repository: ${repo.name}
Current Description: ${repo.description || 'None'}
Languages: ${Object.keys(repo.languages).join(', ')}
README (excerpt):
${repo.readme?.slice(0, 1000) || 'No README'}

Provide:
1. A professional 2-3 sentence project description (compelling, highlights impact)
2. List of technologies/frameworks used (be specific)
3. Project category (Web App, Mobile App, CLI Tool, Library, Game, etc.)
4. Is this portfolio-worthy? (yes/no with reason)

Return as JSON:
{
  "description": "Professional description here...",
  "techStack": ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  "category": "Web App",
  "portfolioWorthy": true,
  "reason": "Well-documented full-stack project with modern tech"
}

Be honest about portfolio-worthiness. Small exercises or forks shouldn't be featured.
`;
```

---

## Sample Portfolio Template

```tsx
// src/app/preview/[username]/page.tsx (simplified)

export default function PortfolioPage({
  username,
  projects
}: {
  username: string;
  projects: Project[];
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">{username}</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Full-Stack Developer | Open Source Enthusiast
          </p>
          <a
            href={`https://github.com/${username}`}
            className="inline-block mt-6 px-6 py-3 bg-black dark:bg-white dark:text-black text-white rounded-lg"
          >
            View GitHub →
          </a>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map(project => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
```

---

## Testing Checklist

- [ ] Can fetch repos for any valid GitHub username
- [ ] Repos display with correct info
- [ ] Can select/deselect repos
- [ ] AI generates descriptions for repos
- [ ] Tech stack detected correctly
- [ ] Portfolio preview renders correctly
- [ ] Responsive on mobile
- [ ] Handles users with 0 repos
- [ ] Handles invalid usernames
- [ ] README parsing works
- [ ] Links to GitHub work

---

## Extensions & Improvements

### Easy Additions
- Download portfolio as Next.js project zip
- Copy HTML to clipboard
- More template themes
- Social media links (LinkedIn, Twitter)
- GitHub stats widget

### Medium Additions
- User authentication to save portfolios
- Custom domain support
- Edit projects manually
- Add blog posts from DEV.to or Medium
- Analytics dashboard
- A/B test different descriptions

### Advanced Additions
- AI-generated project screenshots
- Video demos for projects
- Contribution graph visualization
- Skills word cloud from all repos
- Interactive code snippets
- Portfolio builder for teams/organizations
- SEO optimization for portfolio pages

---

## Common Issues & Solutions

**Issue:** GitHub API rate limit (60 requests/hour)
**Solution:** Cache responses, or use GitHub token for 5000 requests/hour

**Issue:** No README in repos
**Solution:** Fall back to repo description or analyze code files

**Issue:** Too many repos (100+)
**Solution:** Add pagination or filter by stars/recent activity

**Issue:** Portfolio looks generic
**Solution:** Add more customization options (themes, layouts)

---

## Resources

- [GitHub REST API](https://docs.github.com/en/rest) - API documentation
- [Octokit](https://github.com/octokit/octokit.js) - GitHub API client (optional)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Portfolio inspiration](https://github.com/topics/portfolio-website)

---

## Success Metrics

You've successfully completed this project when:
- ✅ Can fetch and display GitHub repos
- ✅ AI generates project descriptions
- ✅ Can select repos for portfolio
- ✅ Portfolio preview looks professional
- ✅ Responsive design works
- ✅ Shareable portfolio URL works

**Bonus:** Deploy your own portfolio using your tool!

---

**Build your dev portfolio in minutes!** Use the Initial Prompt to get started with Claude Code.
