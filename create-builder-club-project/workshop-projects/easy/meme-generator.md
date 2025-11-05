# AI Meme Generator

**Difficulty:** Easy | **Category:** Creative & Social

## Mission Brief

Memes are the currency of internet culture, but coming up with funny, timely memes requires creativity and cultural awareness. This tool uses AI to generate meme captions based on trending topics or custom prompts, paired with popular meme templates.

**The Problem:** Creating viral-worthy memes takes time and cultural knowledge. Students want to make funny content but don't know where to start.

**The Solution:** Input a topic or trending event, and get AI-generated meme captions matched with appropriate templates.

---

## User Stories

As a meme creator, I want to:
- ✅ Enter a topic or keyword
- ✅ Get AI-generated funny captions
- ✅ See captions paired with popular meme templates
- ✅ Customize text position and style
- ✅ Download memes as images
- ✅ Share directly to social media
- ✅ Browse trending topics for inspiration

---

## Tech Stack

### Frontend (Next.js 15)
- Next.js 15 with App Router (`src/` directory)
- Tailwind CSS
- Canvas API or html2canvas for meme generation

### Backend
- Vercel AI SDK 5 for caption generation
- Server Actions for meme creation
- No database required (stateless)

### APIs
- Vercel AI SDK 5 (OpenAI or Anthropic)
- Imgflip API (free, 100 meme templates)
- NewsAPI (optional, for trending topics)

---

## Database Schema

**No database required** - Memes generated on-demand.

**Optional: Save favorite memes**
```typescript
// src/lib/db/schema.ts
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const memes = pgTable('memes', {
  id: serial('id').primaryKey(),
  templateId: text('template_id').notNull(),
  topText: text('top_text'),
  bottomText: text('bottom_text'),
  topic: text('topic'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at').defaultNow(),
});
```

---

## Core Features

### Must-Have Features
1. **Topic Input**
   - Text input for meme topic
   - "Surprise me" button for random topics
   - Examples/suggestions

2. **AI Caption Generation**
   - Generate 3-5 caption options
   - Different meme styles (sarcastic, wholesome, dark humor)
   - Match caption to appropriate template

3. **Meme Templates**
   - 10-20 popular templates (Drake, Distracted Boyfriend, etc.)
   - Template preview
   - Auto-match template to caption style

4. **Meme Editor**
   - Add text to template (top/bottom or custom)
   - Basic text formatting (size, color)
   - Preview before download

5. **Export**
   - Download as PNG
   - Copy image
   - Share link

### Nice-to-Have Features
- Upload custom templates
- Advanced text editing (font, outline, shadow)
- Meme history gallery
- Trending topics integration
- Reddit/Twitter sharing
- Vote on funniest captions

---

## File Structure

```
src/
├── app/
│   ├── page.tsx                      # Landing page
│   ├── create/
│   │   ├── page.tsx                  # Main meme creator
│   │   ├── actions.ts                # AI caption generation
│   │   └── components/
│   │       ├── topic-input.tsx
│   │       ├── caption-options.tsx   # Display AI captions
│   │       ├── template-selector.tsx
│   │       ├── meme-canvas.tsx       # Canvas for meme creation
│   │       └── download-button.tsx
│   └── api/
│       └── generate-caption/
│           └── route.ts
├── components/
│   ├── ui/
│   └── meme-template-card.tsx
└── lib/
    ├── ai/
    │   └── meme-prompts.ts
    ├── templates/
    │   └── meme-templates.ts         # Template definitions
    └── utils/
        └── canvas-utils.ts           # Text positioning helpers
```

---

## Initial Prompt for Claude Code

```
I want to build an AI Meme Generator that creates funny meme captions based on topics.

IMPORTANT: First, use context7 MCP to get the latest Vercel AI SDK 5 documentation, or fetch it from ai.sdk.dev.

Tech Stack:
- Next.js 15 with App Router and src/ directory
- Vercel AI SDK 5 for caption generation
- Tailwind CSS
- TypeScript
- Canvas API for adding text to images

Project Structure:
- Use src/ directory
- Colocate server actions in actions.ts
- Route-specific components in local components/ folders
- Global components in src/components/

Features to implement:

1. Landing page (src/app/page.tsx):
   - Fun hero section with example memes
   - "Create Meme" CTA button

2. Create page (src/app/create/page.tsx):
   - Input field for meme topic
   - "Generate Captions" button
   - Display 3-5 AI-generated caption options
   - Show meme template options (start with 5-10 popular templates)
   - Meme preview with selected caption and template
   - Download button

3. Server action (src/app/create/actions.ts):
   - Use AI SDK 5 to generate funny captions
   - Return 3-5 caption variations in different styles
   - Suggest appropriate meme template for each caption

4. Meme Templates:
   - Create a static list of popular meme templates with image URLs
   - Use Imgflip API templates or direct image links
   - Templates: Drake, Distracted Boyfriend, Two Buttons, Expanding Brain, etc.

5. Meme Canvas:
   - Use HTML Canvas or a library to add text to template images
   - Top text and bottom text fields
   - White text with black outline (classic meme style)
   - Preview updates in real-time
   - Download as PNG

6. Styling:
   - Fun, colorful UI
   - Show template thumbnails
   - Highlight selected caption/template

Start with the project setup and basic caption generation, then we'll add the canvas functionality.
```

---

## Development Steps

### Phase 1: Setup (10 min)
1. Create Next.js 15 project
2. Install AI SDK: `bun add ai @ai-sdk/openai`
3. Set up environment variables
4. Create basic routing

### Phase 2: Meme Templates Data (15 min)
1. Create meme template definitions
2. Find/list popular meme template images
3. Create template selector component

### Phase 3: AI Caption Generation (25 min)
1. Write caption generation prompt
2. Create server action with AI SDK 5
3. Display multiple caption options
4. Add loading states

### Phase 4: Meme Canvas (35 min)
1. Set up HTML Canvas
2. Load template image
3. Add text overlay (top/bottom)
4. Style text (white with black outline)
5. Download functionality

### Phase 5: Polish (15 min)
1. Improve UI/UX
2. Add "Surprise Me" feature
3. Better template preview
4. Mobile responsive

---

## Meme Templates Example

```typescript
// src/lib/templates/meme-templates.ts

export interface MemeTemplate {
  id: string;
  name: string;
  imageUrl: string;
  textAreas: ('top' | 'bottom' | 'custom')[];
  style: 'classic' | 'modern' | 'wholesome' | 'dark';
}

export const memeTemplates: MemeTemplate[] = [
  {
    id: 'drake',
    name: 'Drake Hotline Bling',
    imageUrl: 'https://i.imgflip.com/30b1gx.jpg',
    textAreas: ['top', 'bottom'],
    style: 'classic',
  },
  {
    id: 'distracted-boyfriend',
    name: 'Distracted Boyfriend',
    imageUrl: 'https://i.imgflip.com/1ur9b0.jpg',
    textAreas: ['custom'],
    style: 'modern',
  },
  {
    id: 'two-buttons',
    name: 'Two Buttons',
    imageUrl: 'https://i.imgflip.com/1g8my4.jpg',
    textAreas: ['top', 'bottom'],
    style: 'classic',
  },
  {
    id: 'expanding-brain',
    name: 'Expanding Brain',
    imageUrl: 'https://i.imgflip.com/1jwhww.jpg',
    textAreas: ['custom'],
    style: 'modern',
  },
  // Add more templates
];
```

---

## AI Prompt for Caption Generation

```typescript
// src/lib/ai/meme-prompts.ts

export const generateMemeCaptionPrompt = (topic: string) => `
You are a meme expert who understands internet culture and humor.

Generate 5 funny meme captions based on this topic: "${topic}"

Requirements:
- Make them relatable to college students
- Mix different humor styles: sarcastic, wholesome, self-deprecating
- Keep captions short (under 100 characters total)
- Format for classic top/bottom text memes

Return as JSON:
{
  "captions": [
    {
      "topText": "Top text",
      "bottomText": "Bottom text",
      "style": "sarcastic",
      "suggestedTemplate": "drake"
    }
  ]
}

Suggested templates: drake, distracted-boyfriend, two-buttons, expanding-brain, woman-yelling-at-cat

Be funny but appropriate for a university setting.
`;
```

---

## Canvas Text Rendering Example

```typescript
// src/lib/utils/canvas-utils.ts

export function drawMemeText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number
) {
  const fontSize = 40;
  ctx.font = `bold ${fontSize}px Impact, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';

  // Draw black outline
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 3;
  ctx.strokeText(text, x, y, maxWidth);

  // Draw white fill
  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y, maxWidth);
}
```

---

## Testing Checklist

- [ ] Can enter a topic
- [ ] AI generates multiple caption options
- [ ] Can select a caption
- [ ] Can choose a template
- [ ] Text appears on meme preview
- [ ] Text is readable (white with black outline)
- [ ] Download button works
- [ ] Downloaded image includes text
- [ ] Works on mobile
- [ ] Loading states work
- [ ] Error handling for API failures

---

## Extensions & Improvements

### Easy Additions
- More meme templates (30+ popular ones)
- Custom template upload
- Font size adjustment
- Text color options
- "Surprise Me" random topic generator

### Medium Additions
- Trending topics from NewsAPI or Reddit
- Save favorite memes to gallery
- User voting on funniest captions
- Share to Twitter/Reddit directly
- GIF meme support

### Advanced Additions
- Multi-panel meme maker
- Video meme generator
- AI image generation for custom templates (Stable Diffusion)
- Meme competitions/leaderboard
- OCR to extract text from existing memes
- Meme remix feature

---

## Sample Topics for Testing

- "Monday morning lectures"
- "Group project procrastination"
- "When the deadline is tonight"
- "Finals week"
- "Dining hall food"
- "Dorm life"
- "Student loans"
- "Coffee addiction"

---

## Common Issues & Solutions

**Issue:** Text doesn't fit on template
**Solution:** Add text wrapping and automatic font size adjustment

**Issue:** Image CORS errors
**Solution:** Use a proxy or serve images through your API

**Issue:** Download quality is poor
**Solution:** Increase canvas resolution (2x or 3x)

**Issue:** AI captions aren't funny
**Solution:** Improve prompt with examples of good memes

---

## Resources

- [Imgflip API](https://imgflip.com/api) - Free meme templates
- [Canvas API MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [html2canvas](https://html2canvas.hertzen.com/) - Alternative to Canvas API
- [Know Your Meme](https://knowyourmeme.com/) - Research popular memes

---

## Success Metrics

You've successfully completed this project when:
- ✅ Can input a topic and get AI captions
- ✅ Can select caption and template
- ✅ Meme preview shows correctly
- ✅ Can download meme as image
- ✅ Text is styled like classic memes
- ✅ UI is fun and engaging

**Bonus:** Add trending topics or share to social media!

---

**Let's make some memes!** Use the Initial Prompt to start building with Claude Code.
