# Resume Roaster

**Difficulty:** Easy | **Category:** Career Development

## Mission Brief

Job hunting is tough, and students often don't know if their resume is good enough. This tool provides brutally honest AI feedback on resumes and suggests improvements to help students land interviews.

**The Problem:** Students submit weak resumes without knowing what's wrong. Generic resume advice doesn't help with specific issues.

**The Solution:** Upload or paste your resume, get detailed AI feedback on content, formatting, and impact, plus specific suggestions for improvement.

---

## User Stories

As a job seeker, I want to:
- ✅ Upload my resume (PDF, DOCX, or paste text)
- ✅ Get honest feedback on what's good and what needs work
- ✅ See specific suggestions for improvement
- ✅ Get an overall score/rating
- ✅ Receive tips for tailoring to specific jobs
- ✅ Download an improved version

---

## Tech Stack

### Frontend (Next.js 15)
- Next.js 15 with App Router (`src/` directory)
- Tailwind CSS for styling
- File upload component

### Backend
- Vercel AI SDK 5 for resume analysis
- Server Actions for file processing
- Vercel Blob for file storage (optional)

### APIs
- Vercel AI SDK 5 (OpenAI or Anthropic)
- No database required (stateless)

---

## Database Schema

**No database needed** - This is a stateless tool that analyzes on-demand.

**Optional: Add persistence**
```typescript
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const resumeAnalyses = pgTable('resume_analyses', {
  id: serial('id').primaryKey(),
  fileName: text('file_name'),
  resumeText: text('resume_text').notNull(),
  score: integer('score'), // 0-100
  feedback: text('feedback').notNull(),
  suggestions: text('suggestions').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Core Features

### Must-Have Features
1. **Resume Input**
   - Text paste area
   - File upload (PDF/DOCX/TXT)
   - Preview of uploaded content

2. **AI Analysis**
   - Overall score (0-100)
   - Strengths list
   - Weaknesses/areas to improve
   - Specific actionable suggestions
   - ATS-friendly check

3. **Results Display**
   - Score with visual indicator (progress bar)
   - Sectioned feedback (Experience, Education, Skills, etc.)
   - Bullet-point suggestions
   - Before/After examples

4. **Actions**
   - Copy feedback
   - Download analysis as PDF
   - "Roast another resume" button

### Nice-to-Have Features
- Job description upload for tailored feedback
- Compare to industry standards
- Keyword optimization suggestions
- Visual formatting checker
- LinkedIn profile sync
- Multiple resume versions comparison

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── analyze/
│   │   ├── page.tsx                # Main analysis page
│   │   ├── actions.ts              # Server action for AI analysis
│   │   └── components/
│   │       ├── upload-form.tsx     # File upload component
│   │       ├── score-display.tsx   # Score visualization
│   │       ├── feedback-section.tsx
│   │       └── suggestions-list.tsx
│   └── api/
│       └── upload/
│           └── route.ts            # File upload endpoint (if using Blob)
├── components/
│   ├── ui/
│   └── file-drop-zone.tsx          # Drag-and-drop component
└── lib/
    ├── ai/
    │   └── resume-prompts.ts       # Analysis prompts
    └── utils/
        └── pdf-parser.ts           # Extract text from PDF
```

---

## Initial Prompt for Claude Code

```
I want to build a Resume Roaster web app that gives AI-powered feedback on resumes.

IMPORTANT: First, use context7 MCP to get the latest Vercel AI SDK 5 documentation, or fetch it from ai.sdk.dev.

Tech Stack:
- Next.js 15 with App Router and src/ directory
- Vercel AI SDK 5 for resume analysis
- Tailwind CSS
- TypeScript
- (Optional) Vercel Blob for file storage

Project Structure:
- Use src/ directory
- Colocate server actions in actions.ts next to pages
- Route-specific components in local components/ folders
- Global components in src/components/

Features to implement:
1. Landing page (src/app/page.tsx):
   - Hero section with catchy copy like "Is your resume getting ghosted?"
   - Example scores/feedback
   - CTA to "Roast My Resume"

2. Analyze page (src/app/analyze/page.tsx):
   - Textarea for pasting resume text
   - OR file upload for PDF/DOCX (start with text, add file later)
   - "Analyze Resume" button

3. Server action (src/app/analyze/actions.ts) using AI SDK 5:
   - Analyze resume content
   - Generate structured feedback with:
     * Overall score (0-100)
     * 3-5 strengths
     * 3-5 weaknesses
     * 5-7 specific actionable suggestions
     * ATS compatibility notes

4. Results display components:
   - Score with circular progress indicator
   - Strengths in green cards
   - Weaknesses in yellow/orange cards
   - Suggestions as actionable checklist
   - Copy and download buttons

5. Styling:
   - Make it fun and slightly cheeky (like a "roast")
   - Use emojis for personality
   - Responsive design

Start by creating the project structure and landing page, then we'll add the analysis features.
```

---

## Development Steps

### Phase 1: Setup (10 min)
1. Create Next.js 15 project
2. Install AI SDK: `bun add ai @ai-sdk/openai`
3. Set up environment variables
4. Create routing structure

### Phase 2: Landing Page (15 min)
1. Create hero with compelling copy
2. Add example feedback preview
3. Build CTA button to analyze page

### Phase 3: Input Form (20 min)
1. Create textarea for resume text
2. Add character count and validation
3. Build loading state for analysis

### Phase 4: AI Analysis (25 min)
1. Write analysis prompt for AI SDK 5
2. Create server action that returns structured data
3. Parse response into score, strengths, weaknesses, suggestions
4. Add error handling

### Phase 5: Results Display (30 min)
1. Build score visualization component
2. Create feedback cards (strengths/weaknesses)
3. Display suggestions as checklist
4. Add copy and export functionality

---

## Example AI Prompt

```typescript
// src/lib/ai/resume-prompts.ts

export const analyzeResumePrompt = (resumeText: string) => `
You are a brutally honest but constructive resume reviewer with expertise in recruiting and career development.

Analyze the following resume and provide feedback in this exact JSON format:

{
  "score": <number 0-100>,
  "strengths": [
    "<strength 1>",
    "<strength 2>",
    "<strength 3>"
  ],
  "weaknesses": [
    "<weakness 1>",
    "<weakness 2>",
    "<weakness 3>"
  ],
  "suggestions": [
    "<actionable suggestion 1>",
    "<actionable suggestion 2>",
    "<actionable suggestion 3>",
    "<actionable suggestion 4>",
    "<actionable suggestion 5>"
  ],
  "atsScore": <number 0-100>,
  "atsNotes": "<notes about ATS compatibility>"
}

RESUME TEXT:
${resumeText}

Scoring rubric:
- 90-100: Exceptional, ready for top-tier companies
- 75-89: Strong, needs minor improvements
- 60-74: Decent, needs notable improvements
- 40-59: Weak, major overhaul needed
- 0-39: Not competitive, complete rewrite recommended

Be honest but constructive. Focus on:
- Quantifiable achievements vs vague responsibilities
- Action verbs and impact statements
- Relevant skills and keywords
- Clear progression and growth
- Formatting and readability for ATS systems
`;
```

---

## Testing Checklist

- [ ] Can paste resume text
- [ ] Character count works
- [ ] Analyze button triggers loading state
- [ ] AI generates structured feedback
- [ ] Score displays correctly (0-100)
- [ ] Strengths show in positive styling
- [ ] Weaknesses show in warning styling
- [ ] Suggestions are actionable
- [ ] Copy feedback works
- [ ] Responsive on mobile
- [ ] Error handling for empty input
- [ ] Error handling for API failures

---

## Extensions & Improvements

### Easy Additions
- Add file upload for PDF/DOCX
- Job title/industry selector for context
- Multiple scoring categories (Content, Format, Impact)
- Share result link
- Before/After examples

### Medium Additions
- Job description comparison
- Keyword matching analysis
- Save analyses to database
- Resume template suggestions
- LinkedIn profile analyzer

### Advanced Additions
- Side-by-side comparison of multiple versions
- AI-powered resume rewriting
- Industry-specific scoring (tech, finance, etc.)
- Cover letter generator based on resume
- Interview question predictions
- Resume tracking dashboard

---

## Sample Resume for Testing

```
JOHN DOE
john.doe@email.com | (555) 123-4567

EXPERIENCE
Company A - Software Engineer
- Worked on projects
- Helped team members
- Attended meetings
- Fixed bugs

EDUCATION
University Name
Bachelor of Science in Computer Science

SKILLS
Python, JavaScript, Communication, Teamwork
```

**This is intentionally weak** - use it to test the roasting capability!

---

## Common Issues & Solutions

**Issue:** AI gives generic feedback
**Solution:** Add more specific criteria in prompt (quantified achievements, action verbs, etc.)

**Issue:** Parsing resumes is hard
**Solution:** Start with text input; add PDF parsing later with libraries like `pdf-parse`

**Issue:** Feedback too harsh or too nice
**Solution:** Adjust prompt tone; add examples of good/bad resumes in prompt

**Issue:** Long resumes timeout
**Solution:** Add character limit (2000 words) or use streaming

---

## Resources

- [Vercel AI SDK 5 Docs](https://sdk.vercel.ai/docs)
- [Resume best practices](https://www.levels.fyi/blog/resume-tips.html)
- [ATS-friendly formatting](https://www.jobscan.co/blog/ats-resume/)
- [PDF parsing in Node.js](https://www.npmjs.com/package/pdf-parse)

---

## Success Metrics

You've successfully completed this project when:
- ✅ Can input resume text
- ✅ AI generates meaningful, specific feedback
- ✅ Score is calculated and displayed
- ✅ Feedback is categorized (strengths/weaknesses/suggestions)
- ✅ UI is engaging and "fun"
- ✅ Works on mobile

**Bonus:** Add file upload for PDF resumes!

---

**Time to roast some resumes!** Use the Initial Prompt to get started with Claude Code.
