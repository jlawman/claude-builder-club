# Smart Study Buddy

**Difficulty:** Hard | **Category:** Academic Life

## Mission Brief

Students have lectures notes, textbooks, and study materials scattered everywhere. This AI-powered study companion allows students to upload their documents (PDFs, lecture slides, notes) and have intelligent conversations about the content, get quizzes generated, and receive personalized study recommendations.

**The Problem:** Reading through hundreds of pages of notes and textbooks is overwhelming. Students need an interactive way to study that adapts to their learning style.

**The Solution:** Upload your study materials, chat with an AI that knows your content, get auto-generated practice questions, and track your progress over time with spaced repetition.

---

## User Stories

As a student, I want to:
- ✅ Upload PDFs, DOCX, and text files of my study materials
- ✅ Chat with AI about my documents (RAG-based Q&A)
- ✅ Get auto-generated flashcards from my materials
- ✅ Take AI-generated practice quizzes
- ✅ Track which topics I've mastered
- ✅ Get study recommendations based on my progress
- ✅ Use spaced repetition for review
- ✅ Search across all my documents

---

## Tech Stack

### Frontend (Next.js 15)
- Next.js 15 with App Router (`src/` directory)
- Tailwind CSS
- React components for chat interface
- File upload with drag-and-drop

### Backend
- Neon PostgreSQL database
- Drizzle ORM
- Vercel AI SDK 5 with RAG (embeddings + vector search)
- Vercel Blob Storage for file uploads
- Server Actions and API routes

### AI/ML
- Vercel AI SDK 5 for chat and generation
- OpenAI Embeddings (text-embedding-3-small)
- Vector similarity search (pgvector extension in Neon)

### APIs
- Vercel AI SDK 5
- OpenAI API (chat + embeddings)
- Vercel Blob Storage

---

## Database Schema

```typescript
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp, integer, vector, boolean } from 'drizzle-orm/pg-core';

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  fileName: text('file_name').notNull(),
  fileUrl: text('file_url').notNull(), // Vercel Blob URL
  fileType: text('file_type').notNull(), // pdf, docx, txt
  content: text('content').notNull(), // Extracted text
  subject: text('subject'), // Math, CS, Biology, etc.
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

// For RAG: Store document chunks with embeddings
export const documentChunks = pgTable('document_chunks', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').references(() => documents.id),
  content: text('content').notNull(), // Chunk of text
  embedding: vector('embedding', { dimensions: 1536 }), // OpenAI embedding
  chunkIndex: integer('chunk_index').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const flashcards = pgTable('flashcards', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').references(() => documents.id),
  front: text('front').notNull(),
  back: text('back').notNull(),
  confidence: integer('confidence').default(0), // 0-5 (spaced repetition)
  nextReview: timestamp('next_review'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').references(() => documents.id),
  title: text('title').notNull(),
  questions: text('questions').notNull(), // JSON string
  createdAt: timestamp('created_at').defaultNow(),
});

export const chatSessions = pgTable('chat_sessions', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').references(() => documents.id),
  messages: text('messages').notNull(), // JSON string of messages
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const studyProgress = pgTable('study_progress', {
  id: serial('id').primaryKey(),
  documentId: integer('document_id').references(() => documents.id),
  topicsCovered: text('topics_covered'), // JSON array
  quizzesTaken: integer('quizzes_taken').default(0),
  averageScore: integer('average_score'), // 0-100
  lastStudied: timestamp('last_studied'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Core Features

### Must-Have Features
1. **Document Upload & Processing**
   - Drag-and-drop file upload
   - Support PDF, DOCX, TXT
   - Extract text from files
   - Store in Vercel Blob
   - Display document library

2. **Document Chunking & Embeddings**
   - Split document into chunks (500-1000 chars)
   - Generate embeddings for each chunk using OpenAI
   - Store embeddings in Neon (pgvector)

3. **RAG-based Chat**
   - Chat interface for each document
   - User asks question
   - Retrieve relevant chunks via vector search
   - Generate answer using LLM + context
   - Show sources (which chunks used)

4. **Auto-generated Flashcards**
   - Generate flashcards from document
   - Flashcard UI (click to flip)
   - Spaced repetition algorithm
   - Track confidence level

5. **Practice Quizzes**
   - Generate multiple-choice quizzes
   - Take quiz and submit answers
   - Show score and explanations
   - Track quiz history

6. **Study Dashboard**
   - Show all uploaded documents
   - Progress tracking per document
   - Study streak calendar
   - Recommended next study session

### Nice-to-Have Features
- Multi-document search (query across all docs)
- Export flashcards to Anki
- Voice input for questions
- Highlight important concepts in documents
- Collaborative study groups
- Mobile app

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                             # Landing page
│   ├── dashboard/
│   │   ├── page.tsx                         # Document library
│   │   ├── actions.ts                       # Upload, list documents
│   │   └── components/
│   │       ├── upload-zone.tsx
│   │       ├── document-card.tsx
│   │       └── progress-widget.tsx
│   ├── documents/
│   │   ├── [id]/
│   │   │   ├── page.tsx                     # Document detail page
│   │   │   ├── chat/
│   │   │   │   ├── page.tsx                 # Chat interface
│   │   │   │   ├── actions.ts               # RAG chat logic
│   │   │   │   └── components/
│   │   │   │       ├── chat-messages.tsx
│   │   │   │       ├── chat-input.tsx
│   │   │   │       └── source-citation.tsx
│   │   │   ├── flashcards/
│   │   │   │   ├── page.tsx                 # Flashcard practice
│   │   │   │   ├── actions.ts               # Generate, update confidence
│   │   │   │   └── components/
│   │   │   │       ├── flashcard-deck.tsx
│   │   │   │       └── spaced-repetition-indicator.tsx
│   │   │   └── quiz/
│   │   │       ├── page.tsx                 # Quiz interface
│   │   │       ├── actions.ts               # Generate quiz, grade
│   │   │       └── components/
│   │   │           ├── quiz-question.tsx
│   │   │           └── results-summary.tsx
│   └── api/
│       ├── upload/
│       │   └── route.ts                     # File upload to Blob
│       ├── embeddings/
│       │   └── route.ts                     # Generate embeddings
│       └── chat/
│           └── route.ts                     # Streaming chat responses
├── components/
│   ├── ui/
│   └── layout/
│       └── navbar.tsx
└── lib/
    ├── db/
    │   ├── schema.ts
    │   └── index.ts
    ├── ai/
    │   ├── embeddings.ts                    # Embedding generation
    │   ├── rag.ts                           # RAG retrieval logic
    │   ├── flashcard-generator.ts
    │   └── quiz-generator.ts
    ├── storage/
    │   └── blob.ts                          # Vercel Blob helpers
    └── utils/
        ├── pdf-parser.ts                    # Extract text from PDF
        ├── text-chunker.ts                  # Split text into chunks
        └── spaced-repetition.ts             # SR algorithm
```

---

## Initial Prompt for Claude Code

```
I want to build a Smart Study Buddy - an AI-powered study companion with document upload, RAG-based chat, flashcards, and quizzes.

IMPORTANT: First, use context7 MCP to get documentation for:
1. Vercel AI SDK 5 (ai.sdk.dev) - especially RAG patterns
2. Drizzle ORM (orm.drizzle.team)

Tech Stack:
- Next.js 15 with App Router and src/ directory
- Neon PostgreSQL with pgvector extension (for embeddings)
- Drizzle ORM
- Vercel AI SDK 5
- Vercel Blob Storage
- OpenAI API (chat + embeddings)

Project Structure:
- Use src/ directory
- Colocate server actions in actions.ts
- Route-specific components in local components/ folders

This is a complex project. We'll build it in phases:

Phase 1 - Document Upload:
1. Set up Neon database with Drizzle ORM
2. Enable pgvector extension in Neon
3. Create database schema (documents, documentChunks, flashcards, quizzes)
4. Create dashboard with file upload (src/app/dashboard/page.tsx)
5. Upload files to Vercel Blob
6. Extract text from PDFs (use pdf-parse or similar)
7. Save document metadata to database

Phase 2 - Document Chunking & Embeddings:
1. Split document text into chunks (500 tokens each)
2. Generate OpenAI embeddings for each chunk
3. Store chunks and embeddings in database
4. Create progress indicator for processing

Phase 3 - RAG Chat:
1. Create chat interface (src/app/documents/[id]/chat/page.tsx)
2. When user asks question:
   - Generate embedding for question
   - Vector search for relevant chunks (cosine similarity)
   - Pass chunks as context to LLM
   - Stream response back
3. Show which chunks were used (citations)

Phase 4 - Flashcards:
1. Use AI to generate flashcards from document
2. Create flashcard practice interface
3. Implement spaced repetition (track confidence)
4. Update next review date based on performance

Phase 5 - Quizzes:
1. Generate multiple-choice quizzes from document
2. Quiz taking interface
3. Grade and show results
4. Track quiz scores

Phase 6 - Dashboard:
1. Show all documents with progress
2. Study streak tracker
3. Recommended study sessions

Start with Phase 1: database setup and document upload.
```

---

## Development Steps

### Phase 1: Setup & Upload (60 min)
1. Create Neon database
2. Enable pgvector extension
3. Set up Drizzle with schema
4. Build upload UI
5. Integrate Vercel Blob
6. Extract PDF text
7. Save to database

### Phase 2: Embeddings (45 min)
1. Text chunking algorithm
2. Generate embeddings via OpenAI
3. Store in database with pgvector
4. Background job for processing

### Phase 3: RAG Chat (60 min)
1. Build chat UI
2. Implement vector search
3. RAG retrieval logic
4. Streaming chat responses
5. Source citations

### Phase 4: Flashcards (45 min)
1. AI flashcard generation
2. Flashcard UI
3. Spaced repetition logic
4. Confidence tracking

### Phase 5: Quizzes (30 min)
1. Quiz generation
2. Quiz taking interface
3. Grading logic
4. Results display

### Phase 6: Dashboard (30 min)
1. Document library
2. Progress tracking
3. Study recommendations

---

## RAG Implementation Example

```typescript
// src/lib/ai/rag.ts

import { embedMany, embed } from 'ai';
import { openai } from '@ai-sdk/openai';
import { db } from '@/lib/db';
import { documentChunks } from '@/lib/db/schema';
import { cosineDistance, desc, sql } from 'drizzle-orm';

// Generate embedding for query
export async function generateQueryEmbedding(query: string) {
  const { embedding } = await embed({
    model: openai.embedding('text-embedding-3-small'),
    value: query,
  });
  return embedding;
}

// Find relevant chunks via vector search
export async function findRelevantChunks(
  documentId: number,
  queryEmbedding: number[],
  limit: number = 5
) {
  const similarChunks = await db
    .select()
    .from(documentChunks)
    .where(eq(documentChunks.documentId, documentId))
    .orderBy(
      sql`${documentChunks.embedding} <=> ${JSON.stringify(queryEmbedding)}`
    )
    .limit(limit);

  return similarChunks;
}

// Generate answer with context
export async function generateAnswer(
  question: string,
  relevantChunks: string[]
) {
  const context = relevantChunks.join('\n\n');

  const prompt = `
You are a helpful study assistant. Answer the student's question based ONLY on the provided context from their study materials.

Context:
${context}

Student's Question:
${question}

If the answer is not in the context, say "I don't have enough information in your materials to answer that."
`;

  return prompt; // Use with streamText() or generateText()
}
```

---

## Text Chunking Example

```typescript
// src/lib/utils/text-chunker.ts

export function chunkText(
  text: string,
  chunkSize: number = 500,
  overlap: number = 50
): string[] {
  const words = text.split(/\s+/);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(' ');
    chunks.push(chunk);
  }

  return chunks;
}
```

---

## Spaced Repetition Algorithm

```typescript
// src/lib/utils/spaced-repetition.ts

export function calculateNextReview(
  confidence: number, // 0-5
  currentDate: Date = new Date()
): Date {
  const intervals = [
    1, // 0: 1 day
    3, // 1: 3 days
    7, // 2: 1 week
    14, // 3: 2 weeks
    30, // 4: 1 month
    90, // 5: 3 months
  ];

  const daysToAdd = intervals[confidence] || 1;
  const nextReview = new Date(currentDate);
  nextReview.setDate(nextReview.getDate() + daysToAdd);

  return nextReview;
}

export function updateConfidence(
  currentConfidence: number,
  correct: boolean
): number {
  if (correct) {
    return Math.min(5, currentConfidence + 1);
  } else {
    return Math.max(0, currentConfidence - 1);
  }
}
```

---

## Testing Checklist

- [ ] Can upload PDF/DOCX/TXT files
- [ ] Text extracted correctly from PDFs
- [ ] Document saved to Blob and database
- [ ] Chunks generated correctly
- [ ] Embeddings created and stored
- [ ] Vector search finds relevant chunks
- [ ] Chat responds with context
- [ ] Source citations show correct chunks
- [ ] Flashcards generated from document
- [ ] Flashcard flip animation works
- [ ] Spaced repetition updates correctly
- [ ] Quiz questions generated
- [ ] Quiz grading works
- [ ] Dashboard shows all documents
- [ ] Progress tracking accurate
- [ ] Mobile responsive

---

## Extensions & Improvements

### Easy Additions
- Export flashcards as CSV
- Print study guide
- Dark mode
- Document folders/categories
- Search within document

### Medium Additions
- Multi-document queries (search across all)
- Voice input for chat
- Export to Anki format
- Highlight key concepts in PDFs
- Study timer with Pomodoro
- Study streak gamification

### Advanced Additions
- Collaborative study rooms
- AI tutor that adapts to learning style
- Handwritten note OCR
- Video lecture transcription + chat
- Concept map generation
- Personalized study path recommendations
- Integration with Canvas/Blackboard
- Mobile app with offline mode
- Real-time collaboration

---

## Common Issues & Solutions

**Issue:** PDF extraction doesn't work well
**Solution:** Use `pdf-parse` npm package or `pdf.js`, handle scanned PDFs with OCR

**Issue:** Embeddings are slow to generate
**Solution:** Process in background job, show progress bar, batch embeddings

**Issue:** Vector search returns irrelevant results
**Solution:** Improve chunking strategy, use larger overlap, fine-tune similarity threshold

**Issue:** Chat doesn't use all relevant context
**Solution:** Increase number of retrieved chunks, improve prompt engineering

**Issue:** Vercel Blob storage costs
**Solution:** Add file size limits, delete old documents, compress files

---

## Resources

- [Vercel AI SDK RAG Guide](https://sdk.vercel.ai/docs/guides/rag-chatbot)
- [pgvector Documentation](https://github.com/pgvector/pgvector)
- [OpenAI Embeddings](https://platform.openai.com/docs/guides/embeddings)
- [pdf-parse](https://www.npmjs.com/package/pdf-parse) - PDF text extraction
- [Vercel Blob](https://vercel.com/docs/storage/vercel-blob)
- [Spaced Repetition](https://en.wikipedia.org/wiki/Spaced_repetition)

---

## Success Metrics

You've successfully completed this project when:
- ✅ Can upload and process documents
- ✅ Embeddings generated and stored
- ✅ RAG chat works with relevant answers
- ✅ Flashcards generated and practice works
- ✅ Quizzes generated and grading works
- ✅ Dashboard tracks progress
- ✅ Spaced repetition schedules correctly
- ✅ Mobile responsive

**Bonus:** Use this for your own studying and improve your grades!

---

**Build your AI study companion!** This is an advanced project - take your time and use the Initial Prompt to start building with Claude Code.
