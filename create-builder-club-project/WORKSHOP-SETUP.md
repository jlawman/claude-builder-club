# Workshop Setup Guide

Quick setup guide for Claude Builder Club workshop participants at Oxford.

## Before the Workshop

### Required

1. **Install Node.js (18+)**
   - Download: https://nodejs.org
   - Verify: `node -v` (should show v18 or higher)

2. **Install Bun (Recommended)**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```
   - Or use npm/pnpm if you prefer
   - Verify: `bun -v`

### Recommended

3. **Install Git**
   - Download: https://git-scm.com/downloads
   - Verify: `git --version`

4. **Install GitHub CLI**
   - Download: https://cli.github.com
   - Verify: `gh --version`
   - Login: `gh auth login`

5. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```
   - Verify: `vercel --version`
   - Login: `vercel login`

### Get Your API Keys

You'll need at least one LLM API key:

**Option 1: OpenAI (Recommended)**
1. Go to https://platform.openai.com
2. Sign up / Log in
3. Navigate to API Keys
4. Create a new key
5. Save it somewhere safe!

**Option 2: Anthropic**
1. Go to https://console.anthropic.com
2. Sign up / Log in
3. Navigate to API Keys
4. Create a new key
5. Save it somewhere safe!

**Note:** Workshop may provide shared API keys if needed.

### Optional: Set Up Accounts

**Neon (Database)**
- Visit: https://neon.tech
- Sign up for free account
- You can create databases during the workshop

**Vercel (Deployment)**
- Visit: https://vercel.com
- Sign up with GitHub
- Free tier is perfect for projects

## During the Workshop

### 1. Create Your Project

Run this command:
```bash
npx builder-club
```

Follow the prompts to:
- Choose a category
- Select difficulty
- Pick a specific project
- Name your project

### 2. Configure Your Project

```bash
cd your-project-name

# Add your API key to .env.local
echo "OPENAI_API_KEY=your-key-here" >> .env.local

# If the project needs a database, add:
echo "DATABASE_URL=your-neon-url" >> .env.local
```

### 3. Read the Mission Brief

```bash
# Open MISSION.md in your editor
cat MISSION.md
```

This file contains:
- Full project requirements
- Database schema
- Initial Claude Code prompt
- Step-by-step development plan

### 4. Start Claude Code

The initial prompt was copied to your clipboard! Just:
1. Open Claude Code
2. Paste the prompt (Cmd+V / Ctrl+V)
3. Let Claude guide you!

### 5. Run Your Project

```bash
# Start development server
bun dev

# Or with npm
npm run dev
```

Open http://localhost:3000

## Quick Reference

### Common Commands

```bash
# Install dependencies
bun install

# Run dev server
bun dev

# Build for production
bun run build

# Database migrations (if using DB)
bun run db:push
bun run db:studio

# Deploy to Vercel
vercel
```

### File Structure

```
your-project/
├── MISSION.md          # Read this first!
├── .env.local          # Your API keys (DO NOT COMMIT)
├── src/
│   ├── app/            # Your pages
│   ├── components/     # Reusable components
│   └── lib/            # Utilities, DB, etc.
└── package.json
```

### Getting Help

1. **Read MISSION.md** - Most answers are there!
2. **Ask Claude Code** - It's your coding partner
3. **Ask instructor/TAs** - We're here to help
4. **Check the docs**:
   - Vercel AI SDK: https://sdk.vercel.ai/docs
   - Next.js: https://nextjs.org/docs
   - Drizzle ORM: https://orm.drizzle.team

## Troubleshooting

### "Command not found: bunx"

Bun isn't installed. Either:
- Install Bun: `curl -fsSL https://bun.sh/install | bash`
- Use npx instead: `npx builder-club`

### "Module not found" errors

```bash
bun install
# or
npm install
```

### "API key not found"

Make sure you've added your key to `.env.local`:
```env
OPENAI_API_KEY=sk-your-key-here
```

### Database connection errors

1. Check your DATABASE_URL in `.env.local`
2. Make sure your Neon database is created
3. Run `bun run db:push` to create tables

### Next.js version issues

The tool automatically uses Next.js 15. If you see warnings about version 16, the tool should handle this automatically.

## Tips for Success

1. **Start Small** - Pick an EASY project first to learn the stack
2. **Read the Brief** - Everything you need is in MISSION.md
3. **Use Claude Code** - Let AI handle the boilerplate
4. **Ask Questions** - No question is too small
5. **Have Fun!** - Build something you'll actually use

---

## After the Workshop

### Deploy Your Project

```bash
# Deploy to Vercel (free!)
vercel

# Follow the prompts
# Your project will be live at your-project.vercel.app
```

### Add to Portfolio

1. Push to GitHub:
   ```bash
   gh repo create my-project --public --source=. --push
   ```

2. Add a good README with:
   - Screenshots
   - What you built
   - Tech stack
   - Deployment link

3. Share on LinkedIn/Twitter!

### Keep Building

- Add features from the "Extensions" section
- Try a harder project
- Help others in the community
- Contribute new project ideas

---

**Questions?** Ask during the workshop or open an issue on GitHub.

**Happy building!** 🚀
