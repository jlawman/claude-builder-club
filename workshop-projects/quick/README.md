# Quick Start Projects

**Zero Setup • No API Keys • Build in Minutes**

Perfect for getting started with Claude Code or when you want to build something fast without dealing with API keys, databases, or account setup.

## What Makes These "Quick"?

✅ **No API keys required** - Use public endpoints or no backend at all
✅ **No account signup** - Start building immediately
✅ **No database setup** - Use localStorage, public APIs, or pure client-side
✅ **Build in 15-30 minutes** - Simple, focused projects
✅ **Perfect for learning** - Focus on code, not configuration

---

## Project Categories

### 🌐 Client-Side Web Apps
Pure frontend, no backend needed. Everything runs in the browser.

- **[Pomodoro Timer](./web-apps/pomodoro-timer.md)** - Focus timer with notifications
- **[Color Palette Generator](./web-apps/color-palette-generator.md)** - Generate beautiful color schemes
- **[Markdown Live Preview](./web-apps/markdown-preview.md)** - Write and preview markdown in real-time
- **[JSON Formatter](./web-apps/json-formatter.md)** - Format and validate JSON
- **[Password Generator](./web-apps/password-generator.md)** - Secure password creator
- **[Unit Converter](./web-apps/unit-converter.md)** - Convert between units
- **[Habit Tracker](./web-apps/habit-tracker.md)** - Track daily habits with localStorage
- **[Expense Tracker](./web-apps/expense-tracker.md)** - Budget tracking with charts
- **[Typing Speed Test](./web-apps/typing-test.md)** - Test your WPM
- **[Text Analyzer](./web-apps/text-analyzer.md)** - Word count, reading time, sentiment

### 🎮 Fun & Games
Simple games and entertainment apps.

- **[Trivia Quiz Game](./web-apps/trivia-quiz.md)** - Questions from Open Trivia DB (no auth)
- **[Pokemon Info Lookup](./web-apps/pokemon-lookup.md)** - Search Pokemon using PokeAPI
- **[Breaking Bad Quote Generator](./web-apps/breaking-bad-quotes.md)** - Random quotes
- **[Tic Tac Toe](./web-apps/tic-tac-toe.md)** - Classic game with AI opponent
- **[Memory Card Game](./web-apps/memory-game.md)** - Match pairs
- **[Snake Game](./web-apps/snake-game.md)** - Classic snake

### 🎨 Browser API Projects
Use powerful browser APIs for creative projects.

- **[Voice Notes App](./browser-apis/voice-notes.md)** - Speech-to-text notes
- **[Text to Speech Reader](./browser-apis/text-to-speech.md)** - Read any text aloud
- **[QR Code Generator](./browser-apis/qr-code-generator.md)** - Create QR codes instantly
- **[Image Filter App](./browser-apis/image-filters.md)** - Apply filters using Canvas API
- **[Audio Visualizer](./browser-apis/audio-visualizer.md)** - Visualize music with Web Audio API
- **[Screenshot Tool](./browser-apis/screenshot-tool.md)** - Capture screen regions
- **[Geolocation Weather](./browser-apis/geo-weather.md)** - Weather based on your location (public weather API)

### 🐍 Python Scripts
Quick data analysis and automation scripts using public data.

- **[Movie Dataset Analyzer](./python-scripts/movie-analysis.md)** - Analyze IMDB/public datasets
- **[Weather Data Visualizer](./python-scripts/weather-viz.md)** - Plot historical weather data
- **[Wikipedia Scraper](./python-scripts/wiki-scraper.md)** - Extract data from Wikipedia
- **[Reddit Thread Analyzer](./python-scripts/reddit-analysis.md)** - Analyze public Reddit data
- **[Stock Price Tracker](./python-scripts/stock-tracker.md)** - Visualize Yahoo Finance public data
- **[PDF Text Extractor](./python-scripts/pdf-extractor.md)** - Extract and analyze PDF content
- **[CSV Data Dashboard](./python-scripts/csv-dashboard.md)** - Interactive data exploration

---

## Public APIs (No Auth Required)

These APIs work without any API keys:

### Data & Content
- **JSONPlaceholder** - `https://jsonplaceholder.typicode.com` - Fake REST API
- **PokeAPI** - `https://pokeapi.co` - Pokemon data
- **Open Trivia DB** - `https://opentdb.com` - Trivia questions
- **Breaking Bad API** - `https://breakingbadapi.com` - Quotes and characters
- **Rick and Morty API** - `https://rickandmortyapi.com` - Characters and episodes
- **Star Wars API** - `https://swapi.dev` - Star Wars data
- **REST Countries** - `https://restcountries.com` - Country information
- **Wikipedia API** - `https://en.wikipedia.org/w/api.php` - Wikipedia data

### Quotes & Text
- **Quotable API** - `https://api.quotable.io` - Random quotes
- **Advice Slip** - `https://api.adviceslip.com` - Random advice
- **Kanye Rest** - `https://api.kanye.rest` - Kanye West quotes
- **Chuck Norris API** - `https://api.chucknorris.io` - Chuck Norris jokes

### Images & Media
- **Lorem Picsum** - `https://picsum.photos` - Random placeholder images
- **Dog API** - `https://dog.ceo/api` - Random dog pictures
- **Cat as a Service** - `https://cataas.com` - Random cat images
- **Unsplash Source** - `https://source.unsplash.com` - Random photos

### Utilities
- **IP API** - `https://ipapi.co` - IP geolocation (100/day free, no key)
- **Bored API** - `https://www.boredapi.com` - Activity suggestions
- **Numbers API** - `http://numbersapi.com` - Fun facts about numbers
- **Random User Generator** - `https://randomuser.me` - Fake user profiles
- **Public Holiday API** - `https://date.nager.at/api` - Holiday dates
- **ISS Location** - `http://api.open-notify.org` - International Space Station location

---

## Browser APIs (Built-in, No Setup)

These powerful APIs are built into modern browsers:

- **localStorage/sessionStorage** - Store data client-side
- **Geolocation API** - Get user's location
- **Speech Recognition** - Convert speech to text
- **Speech Synthesis** - Text to speech
- **Canvas API** - Draw graphics and manipulate images
- **Web Audio API** - Audio processing and visualization
- **Clipboard API** - Copy/paste functionality
- **Notifications API** - Browser notifications
- **File API** - Read uploaded files
- **Drag and Drop API** - Drag/drop interactions

---

## Python Public Datasets

No API keys needed, just download and analyze:

- **Titanic Dataset** - Available via seaborn or Kaggle public download
- **Iris Dataset** - Classic ML dataset (built into scikit-learn)
- **COVID-19 Data** - Johns Hopkins public repository
- **Movie Datasets** - IMDB, MovieLens (public download)
- **Weather Data** - NOAA public archives
- **Stock Prices** - Yahoo Finance public endpoints
- **Government Data** - data.gov, census data
- **Public Subreddit Data** - Reddit public JSON feeds

---

## Quick Start Templates

### Client-Side Web App (Vite + Vanilla JS)
```bash
# Fastest setup - no framework needed
npm create vite@latest my-app -- --template vanilla
cd my-app
npm install
npm run dev
```

### Next.js 15 (if you want SSR)
```bash
bunx create-next-app@latest my-app --typescript --tailwind --app --src-dir --use-bun
cd my-app
bun run dev
```

### Python Script (with uv)
```bash
uv init my-script
cd my-script
uv add pandas matplotlib requests
uv run python main.py
```

---

## Example: Simplest Quick Project

**Random Quote Display** (5 minutes to build)

```html
<!DOCTYPE html>
<html>
<head>
  <title>Random Quote</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen flex items-center justify-center">
  <div class="bg-white p-8 rounded-lg shadow-lg max-w-md">
    <blockquote id="quote" class="text-xl italic mb-4"></blockquote>
    <p id="author" class="text-gray-600"></p>
    <button onclick="getQuote()" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
      New Quote
    </button>
  </div>

  <script>
    async function getQuote() {
      const res = await fetch('https://api.quotable.io/random');
      const data = await res.json();
      document.getElementById('quote').textContent = `"${data.content}"`;
      document.getElementById('author').textContent = `— ${data.author}`;
    }
    getQuote();
  </script>
</body>
</html>
```

Save as `index.html` and open in browser. Done! 🎉

---

## Tips for Quick Projects

1. **Use Vite for web apps** - Faster than Next.js for simple projects
2. **Single HTML file** - For ultra-quick projects, one HTML file with inline JS works great
3. **Tailwind CDN** - Use `<script src="https://cdn.tailwindcss.com"></script>` instead of installing
4. **localStorage first** - Before adding a database, try localStorage
5. **Test APIs in browser first** - Open DevTools and `fetch()` the API to see response
6. **Python notebooks** - Use Jupyter for quick data exploration

---

## Project Difficulty

**⚡ Ultra Quick (5-15 min)**
- Random quote display
- Color palette generator
- JSON formatter
- Password generator
- Unit converter

**⚡⚡ Quick (15-30 min)**
- Pomodoro timer
- Trivia quiz
- Pokemon lookup
- Habit tracker
- Markdown preview

**⚡⚡⚡ Still Pretty Quick (30-45 min)**
- Typing speed test
- Expense tracker with charts
- Voice notes app
- Image filter app
- Python data analysis

---

## Why Build Quick Projects?

✅ **Learn Claude Code faster** - Focus on prompting, not setup
✅ **Portfolio fillers** - Quick wins for your GitHub
✅ **Practice new tech** - Try APIs/libraries without commitment
✅ **Debugging practice** - Simpler projects = easier to debug
✅ **Fun!** - Build something playable in minutes

---

## Contributing Quick Projects

Have an idea for a quick project? It should:
- [ ] Require ZERO API keys or accounts
- [ ] Be buildable in under 45 minutes
- [ ] Use only public/free resources
- [ ] Work immediately (no complex setup)
- [ ] Be actually useful or fun

---

**Ready to build something quick? Pick a project and get started!** ⚡
