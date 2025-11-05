# Scholarship Finder Bot

**Difficulty:** Medium | **Category:** Personal Finance

## Mission Brief

Finding scholarships is tedious and time-consuming. Students miss out on free money because they don't know where to look or what they qualify for. This tool uses AI to match students with relevant scholarships based on their profile and automatically tracks application deadlines.

**The Problem:** Scholarship searching is scattered across dozens of websites. Students don't know which scholarships they're eligible for and miss deadlines.

**The Solution:** Create a profile once, get personalized scholarship matches, track applications, and receive deadline reminders.

---

## User Stories

As a student seeking scholarships, I want to:
- ✅ Create a profile with my major, GPA, interests, demographics
- ✅ Get matched with relevant scholarships automatically
- ✅ See scholarship details (amount, deadline, requirements)
- ✅ Track which scholarships I've applied to
- ✅ Get email reminders before deadlines
- ✅ Generate essay outlines for applications
- ✅ Save scholarships for later

---

## Tech Stack

### Frontend (Next.js 15)
- Next.js 15 with App Router (`src/` directory)
- Tailwind CSS
- Forms with validation

### Backend
- Neon PostgreSQL database
- Drizzle ORM
- Vercel AI SDK 5 for matching and essay generation
- Server Actions for CRUD operations
- Resend for email notifications (100 emails/day free)

### APIs
- Vercel AI SDK 5
- Resend API (email)
- Scholarships.com API (if available) or custom dataset

---

## Database Schema

```typescript
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp, integer, boolean } from 'drizzle-orm/pg-core';

export const profiles = pgTable('profiles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  major: text('major').notNull(),
  gpa: text('gpa'), // Store as string: "3.5", "3.0-3.5", etc.
  graduationYear: integer('graduation_year'),
  ethnicity: text('ethnicity'),
  gender: text('gender'),
  interests: text('interests'), // Comma-separated
  achievements: text('achievements'),
  financialNeed: text('financial_need'), // low, medium, high
  createdAt: timestamp('created_at').defaultNow(),
});

export const scholarships = pgTable('scholarships', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  amount: text('amount').notNull(), // "$1000" or "$500-$2000"
  deadline: timestamp('deadline').notNull(),
  description: text('description').notNull(),
  requirements: text('requirements').notNull(),
  eligibilityCriteria: text('eligibility_criteria'),
  applicationUrl: text('application_url'),
  category: text('category'), // Merit, Need-based, Major-specific, etc.
  createdAt: timestamp('created_at').defaultNow(),
});

export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  profileId: integer('profile_id').references(() => profiles.id),
  scholarshipId: integer('scholarship_id').references(() => scholarships.id),
  status: text('status').notNull(), // saved, in_progress, submitted, won, rejected
  notes: text('notes'),
  appliedAt: timestamp('applied_at'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const matches = pgTable('matches', {
  id: serial('id').primaryKey(),
  profileId: integer('profile_id').references(() => profiles.id),
  scholarshipId: integer('scholarship_id').references(() => scholarships.id),
  matchScore: integer('match_score'), // 0-100
  reason: text('reason'), // Why this is a good match
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Core Features

### Must-Have Features
1. **Profile Creation**
   - Multi-step form (personal info, academic, interests)
   - Save profile to database
   - Edit profile

2. **Scholarship Matching**
   - AI analyzes profile and finds matching scholarships
   - Display match score (%) for each scholarship
   - Explanation of why it's a match
   - Filter by category, amount, deadline

3. **Scholarship Details**
   - View full scholarship information
   - Requirements checklist
   - Deadline countdown
   - Save to "My Scholarships"

4. **Application Tracker**
   - Dashboard showing saved/applied scholarships
   - Status updates (saved, in progress, submitted)
   - Add notes for each application
   - Calendar view of deadlines

5. **Email Reminders**
   - Send email 2 weeks before deadline
   - Send email 3 days before deadline
   - Weekly digest of new matches

### Nice-to-Have Features
- Essay generator/outliner for common prompts
- Auto-fill scholarship applications
- Track time spent on applications
- Success rate analytics
- Share scholarship with friends
- Browser extension to find scholarships on any page

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── profile/
│   │   ├── page.tsx                      # Profile form
│   │   ├── actions.ts                    # CRUD for profile
│   │   └── components/
│   │       ├── profile-form.tsx
│   │       └── profile-progress.tsx
│   ├── scholarships/
│   │   ├── page.tsx                      # Browse all scholarships
│   │   ├── actions.ts                    # Get scholarships, match
│   │   ├── [id]/
│   │   │   ├── page.tsx                  # Individual scholarship
│   │   │   └── components/
│   │   │       ├── requirement-checklist.tsx
│   │   │       └── save-button.tsx
│   │   └── components/
│   │       ├── scholarship-card.tsx
│   │       ├── match-score.tsx
│   │       └── filter-panel.tsx
│   ├── dashboard/
│   │   ├── page.tsx                      # My applications
│   │   ├── actions.ts                    # Track applications
│   │   └── components/
│   │       ├── application-list.tsx
│   │       ├── deadline-calendar.tsx
│   │       └── status-selector.tsx
│   └── api/
│       ├── match/
│       │   └── route.ts                  # AI matching endpoint
│       └── cron/
│           └── send-reminders/
│               └── route.ts              # Email reminder cron job
├── components/
│   ├── ui/
│   └── layout/
│       └── navbar.tsx
└── lib/
    ├── db/
    │   ├── schema.ts
    │   └── index.ts                      # DB connection
    ├── ai/
    │   └── matching.ts                   # AI matching logic
    └── email/
        └── templates.tsx                 # Email templates
```

---

## Initial Prompt for Claude Code

```
I want to build a Scholarship Finder Bot that matches students with scholarships.

IMPORTANT: First, use context7 MCP to get documentation for:
1. Vercel AI SDK 5 (ai.sdk.dev)
2. Drizzle ORM (orm.drizzle.team)

Tech Stack:
- Next.js 15 with App Router and src/ directory
- Neon PostgreSQL + Drizzle ORM
- Vercel AI SDK 5
- Tailwind CSS
- Resend for emails (optional for now)

Project Structure:
- Use src/ directory
- Colocate server actions in actions.ts
- Route-specific components in local components/ folders

Features to implement:

Phase 1 - Profile & Database:
1. Set up Neon database and Drizzle ORM
2. Create database schema with these tables:
   - profiles (student info: name, email, major, GPA, interests, etc.)
   - scholarships (scholarship details: title, amount, deadline, requirements)
   - applications (track which scholarships students apply to)
   - matches (AI-generated matches with scores)

3. Create profile form (src/app/profile/page.tsx):
   - Name, email, major, GPA
   - Graduation year
   - Interests (multi-select or tags)
   - Achievements (textarea)
   - Save to database

Phase 2 - Scholarships:
1. Seed database with 20-30 sample scholarships (various majors, GPAs, interests)
2. Create scholarships browse page (src/app/scholarships/page.tsx):
   - List all scholarships as cards
   - Show amount, deadline, and category
   - Filter by category
3. Individual scholarship page (src/app/scholarships/[id]/page.tsx):
   - Full details
   - Requirements checklist
   - "Save" and "Mark as Applied" buttons

Phase 3 - AI Matching:
1. Create matching server action using AI SDK 5:
   - Takes profile data and scholarship list
   - Returns match scores (0-100) and reasons
   - Store matches in database
2. Display matches on scholarships page:
   - Show match score percentage
   - Explain why it's a good match
   - Sort by match score

Phase 4 - Dashboard:
1. Create dashboard (src/app/dashboard/page.tsx):
   - Show saved scholarships
   - Show applications with status (saved, in progress, submitted)
   - Deadline calendar view
   - Status selector for each application

Start with database setup and profile creation. We'll add features incrementally.
```

---

## Development Steps

### Phase 1: Database Setup (30 min)
1. Create Neon database
2. Set up Drizzle ORM
3. Create schema with all tables
4. Generate migrations and push to DB

### Phase 2: Profile System (30 min)
1. Build profile form
2. Create server actions for CRUD
3. Form validation
4. Save profile to database

### Phase 3: Scholarship Listing (30 min)
1. Seed database with sample scholarships
2. Build scholarships browse page
3. Create scholarship card component
4. Individual scholarship detail page

### Phase 4: AI Matching (45 min)
1. Write matching prompt for AI
2. Create server action that analyzes profile + scholarships
3. Store matches in database
4. Display match scores on scholarship cards

### Phase 5: Dashboard (30 min)
1. Build application tracker dashboard
2. Save/apply buttons
3. Status updates
4. Deadline display

### Phase 6: Email Reminders (Optional, 15 min)
1. Set up Resend
2. Create email templates
3. Cron job for sending reminders

---

## AI Matching Prompt

```typescript
// src/lib/ai/matching.ts

interface Profile {
  major: string;
  gpa: string;
  interests: string;
  achievements: string;
  // ... other fields
}

interface Scholarship {
  id: number;
  title: string;
  requirements: string;
  eligibilityCriteria: string;
  category: string;
}

export const matchScholarshipsPrompt = (
  profile: Profile,
  scholarships: Scholarship[]
) => `
You are a scholarship matching expert. Analyze this student profile and determine which scholarships are the best matches.

STUDENT PROFILE:
Major: ${profile.major}
GPA: ${profile.gpa}
Interests: ${profile.interests}
Achievements: ${profile.achievements}

SCHOLARSHIPS:
${scholarships.map((s, i) => `
${i + 1}. ${s.title}
   Requirements: ${s.requirements}
   Eligibility: ${s.eligibilityCriteria}
   Category: ${s.category}
`).join('\n')}

For each scholarship, provide:
1. Match score (0-100)
2. Brief reason why it's a good/bad match
3. What the student should highlight in their application

Return as JSON:
{
  "matches": [
    {
      "scholarshipId": 1,
      "matchScore": 85,
      "reason": "Strong match because...",
      "applicationTips": "Highlight your..."
    }
  ]
}

Only include scholarships with match score >= 40.
`;
```

---

## Sample Scholarships Data

```typescript
// Sample seed data
const sampleScholarships = [
  {
    title: "Computer Science Excellence Scholarship",
    amount: "$2,500",
    deadline: new Date("2025-03-15"),
    description: "For outstanding CS students",
    requirements: "3.5+ GPA, CS major, essay about tech project",
    eligibilityCriteria: "CS major, Junior or Senior, 3.5+ GPA",
    category: "Major-specific",
  },
  {
    title: "First Generation College Student Grant",
    amount: "$1,000",
    deadline: new Date("2025-04-01"),
    description: "Supporting first-gen students",
    requirements: "First-gen status, 2.5+ GPA, recommendation letter",
    eligibilityCriteria: "First generation college student, any major",
    category: "Demographic",
  },
  // Add 20-30 more
];
```

---

## Testing Checklist

- [ ] Can create and save profile
- [ ] Scholarships load from database
- [ ] Can view individual scholarship
- [ ] AI matching generates scores
- [ ] Match scores display correctly
- [ ] Can save scholarship
- [ ] Can mark as applied
- [ ] Dashboard shows saved scholarships
- [ ] Status updates work
- [ ] Deadlines display correctly
- [ ] Mobile responsive
- [ ] Error handling for DB failures

---

## Extensions & Improvements

### Easy Additions
- Export scholarships as CSV
- Print-friendly scholarship list
- Dark mode
- Sorting options (deadline, amount, match score)

### Medium Additions
- Email reminders with Resend
- Essay generator for common prompts
- Upload resume to improve matching
- Browser extension for finding scholarships
- Share scholarships with friends

### Advanced Additions
- User authentication (multiple users)
- OCR for scholarship requirements from images
- Auto-fill applications using profile data
- Success rate tracking (% of scholarships won)
- AI recommendation for which to apply to first
- Integration with financial aid systems
- Crowdsourced scholarship database

---

## Common Issues & Solutions

**Issue:** AI matching is slow with many scholarships
**Solution:** Batch process or limit to top 50 scholarships, cache matches

**Issue:** Deadlines passed but still showing
**Solution:** Add filter to hide past deadlines, or archive old scholarships

**Issue:** Match scores inconsistent
**Solution:** Improve prompt with specific criteria and weights

**Issue:** Email reminders not sending
**Solution:** Test Resend setup, check for verified sender domain

---

## Resources

- [Drizzle ORM Docs](https://orm.drizzle.team/docs)
- [Neon Database](https://neon.tech/)
- [Resend](https://resend.com/docs) - Email API
- [Scholarships.com](https://www.scholarships.com/) - Research real scholarships
- [Vercel Cron Jobs](https://vercel.com/docs/cron-jobs) - For reminders

---

## Success Metrics

You've successfully completed this project when:
- ✅ Profile saves to database
- ✅ Scholarships display from database
- ✅ AI generates match scores
- ✅ Can track applications in dashboard
- ✅ Status updates persist
- ✅ Responsive UI
- ✅ (Optional) Email reminders work

**Bonus:** Deploy and help real students find scholarships!

---

**Let's find that free money!** Use the Initial Prompt to start building with Claude Code.
