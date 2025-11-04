# Date Idea Generator

**Difficulty:** 🟢 Easy | **Time:** 1-2 hours | **Category:** Creative & Social

## Mission Brief

Planning the perfect date is stressful. Students want to impress but don't always know the best spots or creative ideas. This AI-powered tool generates personalized date ideas based on budget, location, interests, and even the weather.

**The Problem:** Running out of date ideas, or not knowing what works for different budgets and interests.

**The Solution:** Answer a few questions and get AI-generated date itineraries complete with specific activities, restaurant suggestions, and backup plans.

---

## User Stories

As a student planning a date, I want to:
- ✅ Input my budget, location, and interests
- ✅ Get 3-5 complete date ideas with activities
- ✅ See estimated costs for each option
- ✅ Get specific venue recommendations
- ✅ See a timeline for the date
- ✅ Save favorite ideas
- ✅ Get backup plans for bad weather

---

## Tech Stack

### Frontend (Next.js 15)
- Next.js 15 with App Router (`src/` directory)
- Tailwind CSS
- Form with validation

### Backend
- Vercel AI SDK 5 for idea generation
- Server Actions for processing
- OpenWeather API (free tier, 1000 calls/day)
- Google Places API (optional, for venue details)

### APIs
- Vercel AI SDK 5 (OpenAI or Anthropic)
- OpenWeather API (for weather consideration)
- No database required (can add for saving favorites)

---

## Database Schema

**No database required** - Generate ideas on-demand.

**Optional: Save favorite ideas**
```typescript
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const dateIdeas = pgTable('date_ideas', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  budget: integer('budget'), // in dollars
  location: text('location').notNull(),
  activities: text('activities').notNull(), // JSON string
  weather: text('weather'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Core Features

### Must-Have Features
1. **Date Preferences Form**
   - Budget slider ($, $$, $$$, $$$$)
   - Location (city or zip code)
   - Date type (romantic, adventurous, chill, foodie)
   - Time of day (morning, afternoon, evening, all day)
   - Indoor/Outdoor preference

2. **AI Generation**
   - 3-5 complete date ideas
   - Each with title and description
   - Activity breakdown (what to do, in order)
   - Estimated timeline
   - Total estimated cost

3. **Display Date Ideas**
   - Cards for each idea
   - Visual budget indicator
   - Activity list with times
   - Map showing location (optional)

4. **Actions**
   - Save to favorites
   - Share via link
   - "Generate more" button
   - Export as calendar event

### Nice-to-Have Features
- Real-time weather check
- Specific restaurant/venue suggestions
- Google Maps integration
- User reviews/ratings
- Seasonal suggestions (fall = pumpkin patch)
- Anniversary/special occasion mode

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                       # Landing page
│   ├── generate/
│   │   ├── page.tsx                   # Main form page
│   │   ├── actions.ts                 # Server action for AI
│   │   └── components/
│   │       ├── preferences-form.tsx
│   │       ├── date-idea-card.tsx
│   │       ├── budget-slider.tsx
│   │       └── activity-timeline.tsx
│   └── api/
│       └── weather/
│           └── route.ts               # Optional weather API
├── components/
│   ├── ui/
│   └── icons/
│       └── weather-icons.tsx
└── lib/
    ├── ai/
    │   └── date-prompts.ts
    └── utils/
        └── format-currency.ts
```

---

## Initial Prompt for Claude Code

```
I want to build a Date Idea Generator that uses AI to create personalized date plans.

IMPORTANT: First, use context7 MCP to get the latest Vercel AI SDK 5 documentation, or fetch it from ai.sdk.dev.

Tech Stack:
- Next.js 15 with App Router and src/ directory
- Vercel AI SDK 5 for idea generation
- Tailwind CSS
- TypeScript
- OpenWeather API (optional, for weather consideration)

Project Structure:
- Use src/ directory
- Colocate server actions in actions.ts
- Route-specific components in local components/ folders

Features to implement:

1. Landing page (src/app/page.tsx):
   - Hero section with romantic/fun visuals
   - Example date ideas
   - "Plan a Date" CTA

2. Generate page (src/app/generate/page.tsx):
   - Form with these inputs:
     * Budget (select: $, $$, $$$, $$$$)
     * City/Location (text input)
     * Date vibe (select: Romantic, Adventurous, Chill, Foodie, Creative)
     * Time (select: Morning, Afternoon, Evening, All Day)
     * Indoor/Outdoor (select: Indoor, Outdoor, No Preference)
   - "Generate Ideas" button

3. Server action (src/app/generate/actions.ts):
   - Use AI SDK 5 to generate 4 date ideas based on preferences
   - Each idea should include:
     * Title
     * Description (2-3 sentences)
     * 3-5 activities in order
     * Estimated timeline for each activity
     * Total estimated cost
     * Indoor/outdoor indicator

4. Results display:
   - Show 4 date idea cards
   - Each card has:
     * Title and description
     * Budget indicator ($ symbols)
     * Activity list with times
     * Total cost estimate
   - "Generate More" button to get new ideas

5. Styling:
   - Use warm, romantic colors
   - Card-based layout
   - Icons for activities
   - Responsive design

Optional: Integrate OpenWeather API to check current weather and adjust suggestions (indoor if rainy).

Start with project setup and form creation, then we'll add AI generation.
```

---

## Development Steps

### Phase 1: Setup (10 min)
1. Create Next.js 15 project
2. Install AI SDK: `bun add ai @ai-sdk/openai`
3. Set up environment variables
4. Create routing structure

### Phase 2: Preferences Form (20 min)
1. Create form with all inputs
2. Add validation
3. Style form nicely
4. Add icons and visual elements

### Phase 3: AI Generation (30 min)
1. Write prompt for date idea generation
2. Create server action with AI SDK 5
3. Structure response as JSON
4. Handle loading states

### Phase 4: Display Results (25 min)
1. Create date idea card component
2. Display activities with timeline
3. Show budget and cost estimates
4. Add "Generate More" functionality

### Phase 5: Polish (15 min)
1. Add weather integration (optional)
2. Improve mobile responsiveness
3. Add animations
4. Error handling

---

## AI Prompt Example

```typescript
// src/lib/ai/date-prompts.ts

interface DatePreferences {
  budget: '$' | '$$' | '$$$' | '$$$$';
  location: string;
  vibe: 'Romantic' | 'Adventurous' | 'Chill' | 'Foodie' | 'Creative';
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'All Day';
  indoorOutdoor: 'Indoor' | 'Outdoor' | 'No Preference';
  weather?: string;
}

export const generateDateIdeasPrompt = (prefs: DatePreferences) => `
You are a creative date planning expert with knowledge of activities, restaurants, and attractions.

Generate 4 unique and creative date ideas based on these preferences:

Location: ${prefs.location}
Budget: ${prefs.budget} ($ = under $30, $$ = $30-60, $$$ = $60-100, $$$$ = $100+)
Vibe: ${prefs.vibe}
Time: ${prefs.timeOfDay}
Setting: ${prefs.indoorOutdoor}
${prefs.weather ? `Current weather: ${prefs.weather}` : ''}

For each date idea, provide:
1. A creative title
2. A 2-3 sentence description
3. 3-5 specific activities in chronological order
4. Time estimate for each activity
5. Estimated cost breakdown
6. Total cost

Return as JSON:
{
  "ideas": [
    {
      "title": "Sunset Picnic & Stargazing",
      "description": "...",
      "activities": [
        {
          "name": "Grab gourmet sandwiches from Local Deli",
          "time": "5:00 PM",
          "duration": "30 min",
          "cost": "$25"
        },
        {
          "name": "Picnic at City Park hilltop",
          "time": "5:30 PM",
          "duration": "2 hours",
          "cost": "$0"
        }
      ],
      "totalCost": "$25",
      "vibe": "romantic"
    }
  ]
}

Make ideas specific to ${prefs.location} when possible. Be creative but realistic.
`;
```

---

## Testing Checklist

- [ ] Form accepts all inputs
- [ ] Budget slider works
- [ ] Generate button triggers AI
- [ ] Loading state shows during generation
- [ ] 4 date ideas display correctly
- [ ] Activities have times and costs
- [ ] Total cost calculates correctly
- [ ] "Generate More" creates new ideas
- [ ] Works on mobile
- [ ] Error handling for API failures
- [ ] Empty/invalid location handled

---

## Extensions & Improvements

### Easy Additions
- Weather-based suggestions
- "Surprise me" random preferences
- Print-friendly format
- Email date plan to yourself
- Emoji icons for activity types

### Medium Additions
- Save favorite date ideas to database
- Google Maps integration showing route
- Real restaurant/venue suggestions with links
- User ratings and reviews
- Share via unique link
- Calendar export (.ics file)

### Advanced Additions
- Multi-date trip planner
- Specific venue API integration (Yelp, Google Places)
- Real-time availability checking
- Budget tracking (link to wallet/bank)
- Date matching (both people submit preferences)
- AR view of locations
- Anniversary/special occasion planning
- Group date ideas

---

## Sample Date Ideas (for inspiration)

**Budget:** $$
**Title:** Coffee Shop Crawl & Park Walk
**Activities:**
1. Morning coffee at hipster café ($12, 30 min)
2. Walk to nearby art district ($0, 20 min)
3. Browse local bookstore ($15, 45 min)
4. Lunch at food truck ($18, 40 min)
**Total:** $45

---

## Common Issues & Solutions

**Issue:** AI suggests generic ideas
**Solution:** Make prompt more specific, include actual venue types in location

**Issue:** Cost estimates unrealistic
**Solution:** Give AI price ranges for different cities

**Issue:** Weather API adds latency
**Solution:** Make it optional or cache weather data

**Issue:** Activities don't flow well
**Solution:** Add time/distance constraints to prompt

---

## Resources

- [OpenWeather API](https://openweathermap.org/api) - Free weather data
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service) - Venue details
- [Unsplash](https://unsplash.com/) - Free date activity photos
- [Lucide Icons](https://lucide.dev/) - Activity icons

---

## Success Metrics

You've successfully completed this project when:
- ✅ Form collects all preferences
- ✅ AI generates realistic, specific date ideas
- ✅ Activities have times and costs
- ✅ Ideas match user preferences
- ✅ UI is attractive and romantic
- ✅ Works on mobile

**Bonus:** Add weather integration or Google Maps!

---

**Time to plan the perfect date!** Use the Initial Prompt to start building with Claude Code.
