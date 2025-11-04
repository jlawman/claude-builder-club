# Research Paper Assistant

**Difficulty:** 🔴 Hard | **Time:** 4+ hours | **Category:** Academic Life

## Mission Brief

Research students spend countless hours finding relevant papers, reading abstracts, and organizing literature reviews. This AI-powered assistant searches academic databases, summarizes papers, extracts key findings, and helps organize research for literature reviews and citations.

**The Problem:** Finding relevant academic papers across multiple databases is time-consuming. Reading dozens of papers to extract key information is overwhelming. Organizing citations and literature reviews is tedious.

**The Solution:** Enter a research topic or question, get AI-curated paper recommendations, automatic summaries, citation management, and AI-generated literature review outlines.

---

## User Stories

As a research student, I want to:
- ✅ Search for papers by topic or research question
- ✅ Get AI-summarized abstracts and key findings
- ✅ Save papers to my library
- ✅ Organize papers by topics/tags
- ✅ Generate citation lists in multiple formats (APA, MLA, Chicago)
- ✅ Get AI-generated literature review outlines
- ✅ Extract methodology and findings
- ✅ Find related papers automatically
- ✅ Track reading progress

---

## Tech Stack

### Frontend (Next.js 15)
- Next.js 15 with App Router (`src/` directory)
- Tailwind CSS
- React components for paper cards
- Data visualization (charts for citations, timeline)

### Backend
- Neon PostgreSQL database
- Drizzle ORM
- Vercel AI SDK 5 for summarization and analysis
- Server Actions and API routes

### APIs
- Semantic Scholar API (free, comprehensive)
- arXiv API (free, physics/CS/math papers)
- Vercel AI SDK 5
- Optional: CrossRef API (DOI lookups)

### Optional: Python Scripts
- If doing advanced data analysis: use `uv` with pandas, matplotlib
- Web scraping with BeautifulSoup

---

## Database Schema

```typescript
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

export const papers = pgTable('papers', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  authors: text('authors').notNull(), // JSON array
  abstract: text('abstract'),
  year: integer('year'),
  venue: text('venue'), // Journal/Conference name
  citationCount: integer('citation_count'),
  doi: text('doi'),
  arxivId: text('arxiv_id'),
  pdfUrl: text('pdf_url'),
  externalId: text('external_id'), // Semantic Scholar ID
  summary: text('summary'), // AI-generated
  keyFindings: text('key_findings'), // AI-extracted
  methodology: text('methodology'), // AI-extracted
  savedAt: timestamp('saved_at').defaultNow(),
});

export const tags = pgTable('tags', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  color: text('color'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const paperTags = pgTable('paper_tags', {
  id: serial('id').primaryKey(),
  paperId: integer('paper_id').references(() => papers.id),
  tagId: integer('tag_id').references(() => tags.id),
});

export const notes = pgTable('notes', {
  id: serial('id').primaryKey(),
  paperId: integer('paper_id').references(() => papers.id),
  content: text('content').notNull(),
  noteType: text('note_type'), // summary, critique, question, quote
  createdAt: timestamp('created_at').defaultNow(),
});

export const literatureReviews = pgTable('literature_reviews', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  topic: text('topic').notNull(),
  paperIds: text('paper_ids').notNull(), // JSON array of paper IDs
  outline: text('outline'), // AI-generated
  sections: text('sections'), // JSON structure
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const readingProgress = pgTable('reading_progress', {
  id: serial('id').primaryKey(),
  paperId: integer('paper_id').references(() => papers.id),
  status: text('status').notNull(), // to-read, reading, read
  progress: integer('progress').default(0), // 0-100
  lastRead: timestamp('last_read'),
  rating: integer('rating'), // 1-5 stars
});
```

---

## Core Features

### Must-Have Features
1. **Paper Search**
   - Search by topic, author, or keyword
   - Query Semantic Scholar or arXiv API
   - Display results with paper cards
   - Show citation count, year, authors

2. **Paper Details**
   - Full paper information
   - Abstract with AI summary
   - Key findings extraction
   - Download PDF link
   - Save to library button

3. **AI Analysis**
   - Summarize abstract (2-3 sentences)
   - Extract key findings
   - Identify methodology
   - Generate research questions

4. **Paper Library**
   - View all saved papers
   - Organize with tags/folders
   - Filter by year, citations, tags
   - Search within library
   - Track reading status

5. **Citation Manager**
   - Generate citations (APA, MLA, Chicago)
   - Copy formatted citation
   - Export as BibTeX
   - Citation list for multiple papers

6. **Literature Review Generator**
   - Select multiple papers
   - AI generates literature review outline
   - Organize papers by theme
   - Identify research gaps

### Nice-to-Have Features
- Related papers recommendations
- Citation network visualization
- Author profile pages
- Trending papers in field
- Email alerts for new papers
- Collaboration features (share libraries)

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                              # Landing page
│   ├── search/
│   │   ├── page.tsx                          # Search interface
│   │   ├── actions.ts                        # API calls to Semantic Scholar
│   │   └── components/
│   │       ├── search-bar.tsx
│   │       ├── paper-card.tsx
│   │       ├── filters-panel.tsx
│   │       └── results-list.tsx
│   ├── papers/
│   │   ├── [id]/
│   │   │   ├── page.tsx                      # Paper detail page
│   │   │   ├── actions.ts                    # Save, analyze paper
│   │   │   └── components/
│   │   │       ├── paper-header.tsx
│   │   │       ├── abstract-summary.tsx
│   │   │       ├── key-findings.tsx
│   │   │       ├── citation-box.tsx
│   │   │       └── notes-section.tsx
│   ├── library/
│   │   ├── page.tsx                          # Saved papers library
│   │   ├── actions.ts                        # Library CRUD
│   │   └── components/
│   │       ├── library-grid.tsx
│   │       ├── tag-manager.tsx
│   │       └── reading-status.tsx
│   ├── review/
│   │   ├── page.tsx                          # Literature review tool
│   │   ├── actions.ts                        # Generate review outline
│   │   └── components/
│   │       ├── paper-selector.tsx
│   │       ├── review-outline.tsx
│   │       └── theme-organizer.tsx
│   └── api/
│       ├── search/
│       │   ├── semantic-scholar/
│       │   │   └── route.ts
│       │   └── arxiv/
│       │       └── route.ts
│       └── analyze/
│           └── route.ts                      # AI analysis
├── components/
│   ├── ui/
│   └── layout/
│       └── navbar.tsx
└── lib/
    ├── db/
    │   ├── schema.ts
    │   └── index.ts
    ├── ai/
    │   ├── paper-analyzer.ts                 # AI prompts for analysis
    │   └── review-generator.ts               # Literature review generation
    ├── apis/
    │   ├── semantic-scholar.ts               # API wrapper
    │   ├── arxiv.ts                          # API wrapper
    │   └── crossref.ts                       # DOI lookups
    └── utils/
        ├── citation-formatter.ts             # Format citations
        └── bibtex-generator.ts
```

---

## Initial Prompt for Claude Code

```
I want to build a Research Paper Assistant that helps students find, organize, and analyze academic papers.

IMPORTANT: First, use context7 MCP to get documentation for:
1. Vercel AI SDK 5 (ai.sdk.dev)
2. Drizzle ORM (orm.drizzle.team)

Tech Stack:
- Next.js 15 with App Router and src/ directory
- Neon PostgreSQL
- Drizzle ORM
- Vercel AI SDK 5
- Semantic Scholar API (free)
- arXiv API (free)

Project Structure:
- Use src/ directory
- Colocate server actions in actions.ts
- Route-specific components in local components/ folders

This is a complex project. Build in phases:

Phase 1 - Paper Search:
1. Set up database with Drizzle ORM (papers, tags, notes tables)
2. Create search page (src/app/search/page.tsx)
3. Integrate Semantic Scholar API:
   - API endpoint: https://api.semanticscholar.org/graph/v1/paper/search
   - Search for papers by keyword
4. Display results as cards showing:
   - Title, authors, year
   - Abstract (truncated)
   - Citation count
   - Save button

Phase 2 - Paper Details:
1. Create paper detail page (src/app/papers/[id]/page.tsx)
2. Fetch full paper details from Semantic Scholar
3. Display:
   - Full abstract
   - Authors, year, venue
   - Citations count
   - PDF link (if available)
   - DOI link
4. Save paper to database

Phase 3 - AI Analysis:
1. Use AI SDK 5 to analyze paper:
   - Summarize abstract (2-3 sentences)
   - Extract 3-5 key findings
   - Identify research methodology
   - Generate 2-3 research questions
2. Display AI analysis on paper page
3. Store analysis in database

Phase 4 - Library:
1. Create library page (src/app/library/page.tsx)
2. Show all saved papers
3. Add tagging system (create, assign tags)
4. Filter and search within library
5. Reading status tracker (to-read, reading, read)

Phase 5 - Citations:
1. Create citation generator
2. Support multiple formats:
   - APA
   - MLA
   - Chicago
   - BibTeX
3. Copy to clipboard
4. Bulk export

Phase 6 - Literature Review:
1. Create review builder page
2. Select multiple papers from library
3. AI generates:
   - Literature review outline
   - Organize papers by themes
   - Identify research gaps
4. Editable outline

Start with Phase 1: database setup and Semantic Scholar integration.
```

---

## Development Steps

### Phase 1: Search Integration (45 min)
1. Create Neon database
2. Set up Drizzle ORM
3. Integrate Semantic Scholar API
4. Build search UI
5. Display paper results

### Phase 2: Paper Details (30 min)
1. Create detail page
2. Fetch full paper info
3. Save to library functionality
4. Display metadata

### Phase 3: AI Analysis (60 min)
1. Write analysis prompts
2. Summarization logic
3. Key findings extraction
4. Methodology identification
5. Store analysis results

### Phase 4: Library Management (45 min)
1. Library view
2. Tagging system
3. Filters and search
4. Reading status tracking

### Phase 5: Citation Generation (30 min)
1. Citation formatters
2. Multiple format support
3. BibTeX export
4. Bulk operations

### Phase 6: Literature Review (45 min)
1. Paper selection UI
2. AI outline generation
3. Theme organization
4. Editable output

---

## Semantic Scholar API Example

```typescript
// src/lib/apis/semantic-scholar.ts

const BASE_URL = 'https://api.semanticscholar.org/graph/v1';

export interface SemanticScholarPaper {
  paperId: string;
  title: string;
  abstract: string;
  authors: Array<{ name: string }>;
  year: number;
  venue: string;
  citationCount: number;
  externalIds: {
    DOI?: string;
    ArXiv?: string;
  };
  openAccessPdf?: {
    url: string;
  };
}

export async function searchPapers(
  query: string,
  limit: number = 10
): Promise<SemanticScholarPaper[]> {
  const url = `${BASE_URL}/paper/search?query=${encodeURIComponent(query)}&limit=${limit}&fields=title,abstract,authors,year,venue,citationCount,externalIds,openAccessPdf`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to search papers');
  }

  const data = await response.json();
  return data.data || [];
}

export async function getPaperDetails(
  paperId: string
): Promise<SemanticScholarPaper> {
  const url = `${BASE_URL}/paper/${paperId}?fields=title,abstract,authors,year,venue,citationCount,externalIds,openAccessPdf,references,citations`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch paper details');
  }

  return response.json();
}
```

---

## AI Analysis Prompt

```typescript
// src/lib/ai/paper-analyzer.ts

export const analyzePaperPrompt = (title: string, abstract: string) => `
You are a research assistant helping students understand academic papers.

Paper Title: ${title}

Abstract:
${abstract}

Provide the following analysis:

1. SUMMARY: A 2-3 sentence plain-language summary of what this paper is about and why it matters.

2. KEY FINDINGS: List 3-5 main findings or contributions of this research (bullet points).

3. METHODOLOGY: Briefly describe the research methodology used (e.g., experimental study, survey, theoretical analysis, etc.).

4. RESEARCH QUESTIONS: Generate 2-3 critical thinking questions a student could explore about this research.

Return as JSON:
{
  "summary": "Plain-language summary...",
  "keyFindings": [
    "Finding 1",
    "Finding 2",
    "Finding 3"
  ],
  "methodology": "Description of methodology...",
  "researchQuestions": [
    "Question 1?",
    "Question 2?"
  ]
}
`;
```

---

## Literature Review Generation

```typescript
// src/lib/ai/review-generator.ts

interface Paper {
  title: string;
  authors: string;
  year: number;
  summary: string;
}

export const generateLiteratureReviewPrompt = (
  topic: string,
  papers: Paper[]
) => `
You are helping a student write a literature review on: "${topic}"

Here are the papers they have collected:

${papers.map((p, i) => `
Paper ${i + 1}:
Title: ${p.title}
Authors: ${p.authors}
Year: ${p.year}
Summary: ${p.summary}
`).join('\n\n')}

Generate a literature review outline with:
1. Introduction paragraph
2. Main themes (3-5 themes, grouping related papers)
3. For each theme:
   - Theme name
   - Which papers belong to this theme
   - Key points from those papers
4. Research gaps identified
5. Conclusion paragraph

Return as JSON:
{
  "introduction": "Introduction text...",
  "themes": [
    {
      "name": "Theme name",
      "papers": [1, 3, 5],
      "keyPoints": ["Point 1", "Point 2"]
    }
  ],
  "researchGaps": ["Gap 1", "Gap 2"],
  "conclusion": "Conclusion text..."
}
`;
```

---

## Citation Formatter

```typescript
// src/lib/utils/citation-formatter.ts

interface Paper {
  title: string;
  authors: string[];
  year: number;
  venue: string;
  doi?: string;
}

export function formatCitation(
  paper: Paper,
  style: 'APA' | 'MLA' | 'Chicago' | 'BibTeX'
): string {
  const authorList = paper.authors.join(', ');

  switch (style) {
    case 'APA':
      return `${authorList} (${paper.year}). ${paper.title}. ${paper.venue}. ${paper.doi ? `https://doi.org/${paper.doi}` : ''}`;

    case 'MLA':
      return `${authorList}. "${paper.title}." ${paper.venue}, ${paper.year}.`;

    case 'Chicago':
      return `${authorList}. "${paper.title}." ${paper.venue} (${paper.year}).`;

    case 'BibTeX':
      return `@article{${authorList.split(' ')[0].toLowerCase()}${paper.year},
  title={${paper.title}},
  author={${authorList}},
  journal={${paper.venue}},
  year={${paper.year}},
  ${paper.doi ? `doi={${paper.doi}}` : ''}
}`;

    default:
      return '';
  }
}
```

---

## Testing Checklist

- [ ] Can search for papers by keyword
- [ ] Papers display correctly in results
- [ ] Can view paper details
- [ ] AI generates summaries
- [ ] Key findings extracted correctly
- [ ] Can save papers to library
- [ ] Tags can be created and assigned
- [ ] Library filtering works
- [ ] Reading status updates
- [ ] Citations generated in multiple formats
- [ ] Copy to clipboard works
- [ ] Literature review outline generated
- [ ] Papers organized by themes
- [ ] Mobile responsive
- [ ] Error handling for API failures

---

## Extensions & Improvements

### Easy Additions
- Export library as CSV
- Print paper list
- Dark mode
- Sort by citations, year, relevance
- Author profile pages

### Medium Additions
- Related papers recommendations
- Citation network graph visualization
- Email alerts for new papers on topic
- PDF upload and analysis
- Annotate PDFs
- Collaborative libraries (share with team)

### Advanced Additions
- Full-text search across PDFs
- Compare multiple papers side-by-side
- Track research trends over time
- Author influence metrics
- Integration with reference managers (Zotero, Mendeley)
- AI research assistant chat
- Paper review/critique generator
- Publish-ready literature review export

---

## Common Issues & Solutions

**Issue:** Semantic Scholar API rate limits
**Solution:** Cache results, add request throttling, or use API key for higher limits

**Issue:** Papers without abstracts
**Solution:** Fall back to title and first few paragraphs if abstract missing

**Issue:** Citation formatting inconsistencies
**Solution:** Add validation, use existing libraries like `citation-js`

**Issue:** Literature review is too generic
**Solution:** Improve prompt with specific instructions, include more paper context

---

## Resources

- [Semantic Scholar API](https://api.semanticscholar.org/) - Free academic search
- [arXiv API](https://arxiv.org/help/api) - Physics/CS/Math papers
- [CrossRef API](https://www.crossref.org/documentation/retrieve-metadata/) - DOI lookups
- [citation-js](https://citation.js.org/) - Citation formatting library
- [BibTeX](http://www.bibtex.org/Format/) - Format specification

---

## Success Metrics

You've successfully completed this project when:
- ✅ Can search and find academic papers
- ✅ AI generates meaningful summaries
- ✅ Papers saved to organized library
- ✅ Tags and filters work correctly
- ✅ Citations generated in multiple formats
- ✅ Literature review outline generated
- ✅ Mobile responsive

**Bonus:** Use this for your own research and publish a paper!

---

**Become a research power-user!** Use the Initial Prompt to start building with Claude Code.
