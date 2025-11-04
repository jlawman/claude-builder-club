# Study Guide Generator

**Difficulty:** 🟢 Easy | **Time:** 1-2 hours | **Category:** Academic Life

## Mission Brief

Students often have messy lecture notes and study materials scattered across different documents. This tool helps them transform their raw notes into organized study guides with AI-generated flashcards, quizzes, and summaries.

**The Problem:** Converting notes into effective study materials is time-consuming and students often don't know the best way to study specific content.

**The Solution:** Upload text notes or paste content, and get back a comprehensive study guide with multiple learning formats.

---

## User Stories

As a student, I want to:
- ✅ Paste or upload my lecture notes
- ✅ Get an AI-generated summary of key concepts
- ✅ Receive flashcards for memorization
- ✅ Generate practice quiz questions
- ✅ Save my study guides for later review
- ✅ Export study materials as PDF or Markdown

---

## Tech Stack

### Frontend (Next.js 15)
- Next.js 15 with App Router (`src/` directory)
- Tailwind CSS for styling
- React components for study guide display

### Backend
- Vercel AI SDK 5 for text generation
- Server Actions for form handling
- No database required (can be added for persistence)

### Optional Storage
- Vercel Blob for uploaded files
- LocalStorage for client-side save

### APIs
- Vercel AI SDK 5 (OpenAI or Anthropic)
- No external APIs required

---

## Database Schema

**Option 1: No Database (Simplest)**
- Generate on-demand, no persistence
- Use client-side state management

**Option 2: With Neon + Drizzle (For saving study guides)**

```typescript
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

export const studyGuides = pgTable('study_guides', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  originalContent: text('original_content').notNull(),
  summary: text('summary'),
  flashcards: jsonb('flashcards').$type<Array<{
    front: string;
    back: string;
  }>>(),
  quizQuestions: jsonb('quiz_questions').$type<Array<{
    question: string;
    options: string[];
    correctAnswer: number;
  }>>(),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Core Features

### Must-Have Features
1. **Text Input Area**
   - Large textarea for pasting notes
   - Character count display
   - Clear/reset button

2. **AI Generation**
   - Generate summary of key concepts
   - Create 5-10 flashcards
   - Generate 5 multiple-choice questions
   - Loading states with progress indicators

3. **Display Results**
   - Formatted summary with headings
   - Flashcard UI (click to flip)
   - Quiz interface with answer checking

4. **Export Options**
   - Copy to clipboard
   - Download as Markdown
   - Print-friendly view

### Nice-to-Have Features
- Save study guides to database
- File upload (.txt, .pdf, .docx)
- Difficulty selector (easy/medium/hard quizzes)
- Spaced repetition scheduling
- Study guide history
- Share link generation

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── generate/
│   │   ├── page.tsx             # Main study guide generator
│   │   ├── actions.ts           # Server action for AI generation
│   │   └── components/
│   │       ├── input-form.tsx   # Text input component
│   │       ├── summary-display.tsx
│   │       ├── flashcard.tsx    # Individual flashcard with flip
│   │       └── quiz.tsx         # Quiz interface
│   └── api/
│       └── generate/
│           └── route.ts         # Alternative: API route
├── components/
│   ├── ui/                      # shadcn/ui components
│   └── layout/
│       └── navbar.tsx
└── lib/
    ├── ai/
    │   └── prompts.ts           # Prompt templates
    └── utils.ts
```

---

## Initial Prompt for Claude Code

Copy and paste this into Claude Code to get started:

```
I want to build a Study Guide Generator web app using Next.js 15.

IMPORTANT: First, use context7 MCP to get the latest Vercel AI SDK 5 documentation and examples, or fetch it from ai.sdk.dev.

Tech Stack:
- Next.js 15 with App Router and src/ directory
- Vercel AI SDK 5 for text generation
- Tailwind CSS
- TypeScript

Project Structure:
- Use src/ directory
- Colocate server actions in actions.ts next to the pages that use them
- Create a components/ folder within each route for route-specific components
- Global components go in src/components/

Features to implement:
1. A landing page (src/app/page.tsx) with a hero section and "Get Started" button
2. A generate page (src/app/generate/page.tsx) with:
   - Large textarea for pasting lecture notes
   - Character count (minimum 100 chars to generate)
   - "Generate Study Guide" button
3. Server action (src/app/generate/actions.ts) that uses Vercel AI SDK 5 to:
   - Generate a summary (2-3 paragraphs of key concepts)
   - Create 8 flashcards (question on front, answer on back)
   - Generate 5 multiple choice questions (4 options each)
4. Display components:
   - Summary with nice formatting
   - Flashcards that flip on click
   - Quiz with radio buttons and "Check Answers" functionality
5. Export button to copy all content as markdown

Use streaming from AI SDK 5 if possible to show real-time generation.

Please start by creating the Next.js 15 project with the correct structure, then we'll build the features step by step.
```

---

## Development Steps

### Phase 1: Setup (15 min)
1. Create Next.js 15 project with `src/` directory
2. Install Vercel AI SDK 5: `bun add ai @ai-sdk/openai`
3. Set up environment variables (`OPENAI_API_KEY`)
4. Create basic routing structure

### Phase 2: Core UI (20 min)
1. Build landing page with hero and CTA
2. Create input form on `/generate` page
3. Add loading states and character validation

### Phase 3: AI Integration (30 min)
1. Create server action with AI SDK 5
2. Write prompts for summary, flashcards, and quiz generation
3. Parse AI responses into structured data
4. Test generation with sample notes

### Phase 4: Display Components (25 min)
1. Build summary display with formatting
2. Create interactive flashcard component
3. Implement quiz with answer checking
4. Add export functionality

### Phase 5: Polish (10 min)
1. Add error handling
2. Improve loading states
3. Responsive design tweaks
4. Test with different types of notes

---

## Example Prompt for AI Generation

```typescript
// src/lib/ai/prompts.ts

export const createStudyGuidePrompt = (notes: string) => `
You are a helpful study assistant. Based on the following lecture notes, create a comprehensive study guide.

LECTURE NOTES:
${notes}

Please provide the following in your response:

1. SUMMARY: A 2-3 paragraph summary of the key concepts and main ideas.

2. FLASHCARDS: Create 8 flashcards in this exact JSON format:
[
  {
    "front": "Question or term",
    "back": "Answer or definition"
  }
]

3. QUIZ: Create 5 multiple choice questions in this exact JSON format:
[
  {
    "question": "The question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0
  }
]

Format your response with clear sections: ## SUMMARY, ## FLASHCARDS, ## QUIZ
`;
```

---

## Testing Checklist

- [ ] Can paste text into textarea
- [ ] Character count updates correctly
- [ ] Generate button disabled until minimum chars
- [ ] Loading state shows during generation
- [ ] Summary displays with proper formatting
- [ ] Flashcards flip on click
- [ ] Quiz allows selecting answers
- [ ] Check answers button works correctly
- [ ] Export to clipboard works
- [ ] Works on mobile screens
- [ ] Error handling for failed API calls

---

## Extensions & Improvements

### Easy Additions
- Dark mode toggle
- Save generated guides to localStorage
- Different quiz difficulty levels
- Timer for quiz mode
- Score tracking

### Medium Additions
- Add Drizzle + Neon to save study guides
- User authentication (Clerk)
- File upload for PDF/DOCX notes
- Search through saved study guides
- Tag system for organization

### Advanced Additions
- Spaced repetition algorithm
- Collaborative study groups
- AI tutor chat based on notes
- Voice narration of flashcards
- Integration with Notion/Google Drive
- Progress tracking and analytics
- Export to Anki format

---

## Common Issues & Solutions

**Issue:** AI generates inconsistent JSON
**Solution:** Use structured output with Vercel AI SDK 5's `generateObject()` instead of parsing text

**Issue:** Large notes timeout
**Solution:** Add note length limit (5000 chars) and chunk if needed

**Issue:** Flashcards too easy/hard
**Solution:** Add difficulty selector and adjust prompt accordingly

**Issue:** Generation is slow
**Solution:** Use streaming with `streamText()` to show incremental results

---

## Resources

- [Vercel AI SDK 5 Docs](https://sdk.vercel.ai/docs)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Drizzle ORM Quickstart](https://orm.drizzle.team/docs/quick-start)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Flashcard UI inspiration](https://ui.aceternity.com)

---

## Success Metrics

You've successfully completed this project when:
- ✅ You can paste notes and generate a study guide
- ✅ Flashcards flip smoothly on interaction
- ✅ Quiz questions have correct answer validation
- ✅ Export functionality works
- ✅ The app is responsive and looks good
- ✅ (Optional) Study guides persist in database

**Bonus:** Deploy to Vercel and share with classmates!

---

**Ready to build?** Start with the Initial Prompt above and let Claude Code guide you through the implementation!
