# Quick Project Prompts

**Copy, paste, and build in minutes. No API keys. No setup. Just code.**

Each prompt below is ready to paste directly into Claude Code. All projects can be built as single HTML files or simple Next.js apps.

---

## 🌐 Client-Side Web Apps

### 1. Pomodoro Timer

```
Build a Pomodoro Timer web app with a single HTML file using Tailwind CSS CDN.

Features:
- 25 min work, 5 min break, 15 min long break
- Start, pause, reset buttons
- Session counter
- Browser notifications when time's up
- Keyboard shortcut: spacebar to start/pause
- Clean, minimal UI with large timer display

Use setInterval for the timer. Make it visually appealing with progress circles or bars.
```

### 2. Password Generator

```
Build a secure password generator as a single HTML page.

Features:
- Length slider (8-32 characters)
- Checkboxes for: uppercase, lowercase, numbers, symbols
- Generate button
- Strength indicator (weak/medium/strong)
- Copy to clipboard button
- Option to generate multiple passwords at once
- Dark mode toggle

Use crypto.getRandomValues() for secure random generation. Tailwind CSS for styling.
```

### 3. Markdown Live Preview

```
Build a markdown editor with live preview in a single HTML file.

Features:
- Split-screen: editor on left, preview on right
- Use a markdown parsing library (marked.js from CDN)
- Syntax highlighting for code blocks (highlight.js from CDN)
- Save to localStorage automatically
- Export as HTML button
- Download as .md file
- Word count and reading time
- Mobile responsive (stacked on mobile)

Tailwind CSS for styling. Include sample markdown on load.
```

### 4. JSON Formatter & Validator

```
Build a JSON formatter/validator tool as a single HTML page.

Features:
- Textarea for pasting JSON
- Format button (prettify with indentation)
- Minify button (remove whitespace)
- Validate button (check for errors)
- Error messages with line numbers
- Copy formatted JSON button
- Tree view option (expandable/collapsible)
- Dark mode

Use JSON.parse() for validation, JSON.stringify() for formatting. Tailwind CSS.
```

### 5. Unit Converter

```
Build a unit converter web app.

Categories to include:
- Length (meters, feet, inches, km, miles)
- Weight (kg, lbs, oz, grams)
- Temperature (Celsius, Fahrenheit, Kelvin)
- Speed (mph, km/h, m/s)
- Volume (liters, gallons, cups)

Features:
- Dropdown to select category
- Input field for value
- Two dropdowns for "from" and "to" units
- Instant conversion (no button needed)
- Swap units button
- Clean, calculator-like UI

Single HTML file with Tailwind CSS.
```

### 6. Expense Tracker

```
Build an expense tracker that saves to localStorage.

Features:
- Add expense form (description, amount, category, date)
- List of all expenses
- Delete expense button
- Category filter dropdown
- Total expenses display
- Monthly breakdown
- Simple bar chart showing spending by category (use Chart.js from CDN)
- Export as CSV
- Dark mode

Single HTML file or Vite project. Tailwind CSS for styling.
```

### 7. Habit Tracker

```
Build a daily habit tracker using localStorage.

Features:
- Add habit form (name, frequency)
- Grid/calendar view showing last 30 days
- Click to mark habit as done for that day
- Streak counter for each habit
- Visual heatmap (like GitHub contributions)
- Edit/delete habits
- Today's habits prominently displayed
- Progress percentage

Single HTML file with Tailwind CSS. Use color gradient for heatmap (light to dark).
```

### 8. Typing Speed Test

```
Build a typing speed test game.

Features:
- Random paragraph of text appears
- User types in input field
- Real-time highlighting: green for correct, red for errors
- Timer starts on first keystroke
- Calculate WPM (words per minute) and accuracy
- Show results at end with retry button
- Difficulty levels (easy/medium/hard text)
- Leaderboard saved to localStorage
- Sound effects for correct/incorrect (optional)

Use a quote API or hardcoded paragraphs. Single HTML file.
```

### 9. QR Code Generator

```
Build a QR code generator using a library.

Features:
- Text input (URL, text, phone, etc.)
- Generate button
- Display QR code image
- Adjust size slider
- Download as PNG button
- History of generated codes (localStorage)
- Different color options for QR code
- URL shortener integration (use a free API like is.gd)

Use qrcode.js library from CDN. Single HTML file with Tailwind CSS.
```

### 10. Text Analyzer

```
Build a text analysis tool.

Features:
- Large textarea for input
- Real-time statistics:
  * Character count (with/without spaces)
  * Word count
  * Sentence count
  * Paragraph count
  * Reading time estimate
  * Average word length
  * Most common words (top 10)
  * Keyword density
- Find & replace functionality
- Case converter (upper, lower, title, sentence)
- Remove extra spaces button

Single HTML file with clean, dashboard-like UI.
```

---

## 🎮 Games & Fun

### 11. Pokemon Lookup

```
Build a Pokemon information viewer using PokeAPI (no auth required).

API: https://pokeapi.co/api/v2/pokemon/{name-or-id}

Features:
- Search input for Pokemon name or ID (1-1010)
- Display:
  * Official artwork image
  * Name, ID, types (with colored badges)
  * Base stats with progress bars (HP, Attack, Defense, etc.)
  * Abilities list
  * Height and weight
- Random Pokemon button
- Error handling for invalid names
- Loading state

Single HTML file with Tailwind CSS. Make type badges colorful (fire=red, water=blue, etc.).
```

### 12. Trivia Quiz Game

```
Build a trivia quiz game using Open Trivia DB (no auth).

API: https://opentdb.com/api.php?amount=10

Features:
- Fetch 10 random questions
- Display one question at a time
- Multiple choice answers (shuffle them)
- Score tracker
- Timer per question (30 seconds)
- Next question button
- Results screen at end showing score
- Play again button
- Difficulty selector (easy/medium/hard)
- Category selector

Single HTML file. Decode HTML entities in questions/answers.
```

### 13. Breaking Bad Quote Generator

```
Build a Breaking Bad quote generator.

API: https://breakingbadapi.com/api/quote/random

Features:
- Display random quote on load
- Show character name and series
- Character image
- "New Quote" button
- Share on Twitter button (pre-filled tweet)
- Favorite quotes (save to localStorage)
- View favorites list
- Animated quote transition

Single HTML file with Tailwind CSS. Make it visually themed to Breaking Bad (yellow/green colors).
```

### 14. Memory Card Game

```
Build a memory card matching game.

Features:
- Grid of face-down cards (4x4 or configurable)
- Click to flip cards
- Match two cards with same image/emoji
- Unmatched cards flip back
- Move counter
- Timer
- Stars rating based on moves/time
- Win screen with stats
- Play again button
- Difficulty levels (more cards)

Use emojis or simple icons. Single HTML file with CSS animations for card flips.
```

### 15. Tic Tac Toe with AI

```
Build Tic Tac Toe with an AI opponent.

Features:
- 3x3 grid
- Player vs AI mode
- AI uses minimax algorithm (or simple strategy)
- Score tracker (wins/losses/draws)
- Reset game button
- Choose X or O
- Winning line highlight
- Sound effects (optional)
- Difficulty selector (easy/hard AI)

Single HTML file. Make it visually polished with hover effects.
```

### 16. Snake Game

```
Build the classic Snake game.

Features:
- Snake moves on grid using arrow keys
- Food spawns randomly
- Snake grows when eating food
- Game over on wall collision or self-collision
- Score based on food eaten
- High score (localStorage)
- Speed increases as snake grows
- Pause button (spacebar)
- Mobile controls (swipe or buttons)

Use HTML Canvas. Single HTML file. Retro styling.
```

### 17. Rick and Morty Character Browser

```
Build a Rick and Morty character browser.

API: https://rickandmortyapi.com/api/character

Features:
- Grid of character cards with:
  * Image
  * Name
  * Status (alive/dead/unknown) with colored badge
  * Species
  * Origin
- Pagination or infinite scroll
- Search by name
- Filter by status
- Filter by species
- Character detail modal on click
- Random character button

Single HTML file or Vite project. Tailwind CSS. Make it fun and themed.
```

---

## 🎨 Creative & Utilities

### 18. Color Palette Generator

```
Build a color palette generator.

Features:
- Generate 5 harmonious colors at once
- Display each as a large card with hex code
- Click to copy hex to clipboard
- Lock button to keep a color (regenerate others)
- Spacebar keyboard shortcut to generate
- Harmony modes: random, analogous, complementary, triadic, monochromatic
- Export as CSS variables
- Show RGB values
- Text contrast checker (readable text on background)

Single HTML file. Use HSL color space for better harmony.
```

### 19. Gradient Generator

```
Build a CSS gradient generator.

Features:
- Two color pickers (start and end)
- Gradient direction selector (to right, to bottom, diagonal, radial)
- Live preview of gradient
- Copy CSS code button
- Add more color stops (3+ colors)
- Angle slider for linear gradients
- Preset popular gradients gallery
- Random gradient button
- Export as PNG image

Single HTML file with Tailwind CSS. Make the preview area large and prominent.
```

### 20. Lorem Ipsum Generator

```
Build a Lorem Ipsum text generator.

Features:
- Select format: paragraphs, sentences, or words
- Quantity input (how many)
- Generate button
- Copy to clipboard
- Start with "Lorem ipsum dolor sit amet"
- Option to use different placeholder text:
  * Classic Lorem Ipsum
  * Hipster Ipsum
  * Bacon Ipsum
  * Corporate buzzwords
- Word count display
- HTML format option (with <p> tags)

Single HTML file. Include arrays of words for different themes.
```

### 21. URL Shortener (Client-Side)

```
Build a URL shortener using a free API.

API: https://is.gd/create.php?format=json&url=YOUR_URL

Features:
- Input field for long URL
- Shorten button
- Display shortened URL
- Copy to clipboard button
- QR code of short URL
- History of shortened URLs (localStorage)
- Click count (if API supports)
- Custom short code (if API supports)
- Validate URL before shortening

Single HTML file with Tailwind CSS.
```

### 22. BMI Calculator

```
Build a BMI (Body Mass Index) calculator.

Features:
- Input fields for:
  * Height (with unit toggle: cm/feet+inches)
  * Weight (with unit toggle: kg/lbs)
- Calculate button
- Display:
  * BMI number
  * Category (underweight/normal/overweight/obese)
  * Colored indicator
  * BMI chart showing where user falls
- Ideal weight range
- History of calculations (localStorage)
- Export data as CSV

Single HTML file. Make it health-focused with calming colors.
```

### 23. Countdown Timer

```
Build a customizable countdown timer.

Features:
- Set hours, minutes, seconds
- Start, pause, reset buttons
- Full-screen mode
- Change timer name/title
- Browser notification when complete
- Sound alarm (optional)
- Save multiple timers
- Quick presets (5 min, 10 min, etc.)
- Progress bar
- Background color changes as time runs out

Single HTML file with large, readable numbers.
```

### 24. Dice Roller

```
Build a dice rolling simulator.

Features:
- Choose number of dice (1-10)
- Choose dice type (d4, d6, d8, d10, d12, d20, d100)
- Roll button with animation
- Show individual die results
- Show total
- Roll history (last 10 rolls)
- Statistics (average, min, max)
- Modifier input (+/- to roll)
- Sound effect on roll
- Themed for D&D/RPGs

Single HTML file with CSS animations for dice rolling.
```

---

## 🐍 Python Scripts

### 25. Movie Dataset Analyzer

```
Build a Python script to analyze a movie dataset.

Use the IMDB 5000 Movies dataset (publicly available CSV).

Script should:
- Load CSV with pandas
- Clean data (handle missing values)
- Analysis:
  * Top 10 highest-grossing movies
  * Average rating by genre
  * Directors with most movies
  * Budget vs revenue scatter plot
  * Rating distribution histogram
  * Genre popularity over time
- Save visualizations as PNG files
- Export summary statistics to JSON

Use: pandas, matplotlib, seaborn. Include setup instructions with uv.
```

### 26. Wikipedia Scraper

```
Build a Python script to extract data from Wikipedia.

Features:
- Input: topic or article title
- Scrape:
  * Article summary (first paragraph)
  * Infobox data (if exists)
  * All section headings
  * External links
  * References count
  * Images (download top 3)
- Save to JSON file
- Option to scrape multiple related articles
- Handle redirects

Use: requests, BeautifulSoup4, Wikipedia API. Setup with uv.
```

### 27. Weather Data Visualizer

```
Build a Python script to visualize weather data.

Use publicly available weather data (NOAA or download a CSV dataset).

Script should:
- Load historical weather data
- Visualizations:
  * Temperature trends over time (line chart)
  * Monthly average temperature (bar chart)
  * Precipitation patterns (area chart)
  * Temperature distribution (histogram)
  * Correlation matrix (temp, humidity, pressure)
- Save all plots as PNG
- Generate PDF report with all visualizations

Use: pandas, matplotlib, seaborn. Setup with uv.
```

### 28. CSV Data Dashboard

```
Build an interactive Python dashboard for any CSV file.

Features:
- Load any CSV file
- Automatic column detection (numeric/categorical)
- Display:
  * Data preview (first 10 rows)
  * Summary statistics
  * Missing values report
  * Correlation heatmap
  * Distribution plots for numeric columns
  * Bar charts for categorical columns
- Filter data by column values
- Export filtered data
- Save dashboard as HTML

Use: pandas, plotly or matplotlib. Consider Streamlit for interactivity. Setup with uv.
```

### 29. Stock Price Tracker

```
Build a Python script to track and visualize stock prices.

Use Yahoo Finance public data (yfinance library).

Features:
- Input: stock ticker symbol
- Fetch historical data (last 1 year)
- Visualizations:
  * Price line chart
  * Volume bar chart
  * Moving averages (50-day, 200-day)
  * Daily returns distribution
  * Candlestick chart
- Calculate metrics (volatility, max drawdown)
- Compare multiple stocks
- Save report as PDF

Use: yfinance, pandas, matplotlib, mplfinance. Setup with uv.
```

### 30. PDF Text Extractor & Analyzer

```
Build a Python script to extract and analyze text from PDFs.

Features:
- Extract all text from PDF
- Analysis:
  * Word count
  * Character count
  * Most frequent words (with stopword removal)
  * Readability score
  * Sentiment analysis (if applicable)
  * Named entity recognition
- Extract images from PDF
- Save text to .txt file
- Support batch processing (folder of PDFs)

Use: PyPDF2 or pdfplumber, nltk, spacy. Setup with uv.
```

---

## 🎤 Browser API Projects

### 31. Voice Notes App

```
Build a voice notes app using Web Speech API.

Features:
- Record button (uses speech-to-text)
- Display transcribed text in real-time
- Save notes list (localStorage)
- Edit saved notes
- Delete notes
- Search notes
- Export all notes as text file
- Language selector
- Works offline once loaded

Single HTML file. No backend needed. Use webkitSpeechRecognition API.
```

### 32. Text-to-Speech Reader

```
Build a text reader using Speech Synthesis API.

Features:
- Large textarea for text input
- Play, pause, stop buttons
- Speed control slider
- Pitch control slider
- Voice selector dropdown (system voices)
- Highlight current word being spoken
- Save text (localStorage)
- Upload .txt file to read
- Reading progress bar

Single HTML file. Use speechSynthesis browser API.
```

### 33. Image Filter App

```
Build an image filter app using Canvas API.

Features:
- Upload image button
- Filters to apply:
  * Grayscale
  * Sepia
  * Blur
  * Brightness
  * Contrast
  * Saturation
  * Invert
- Sliders for filter intensity
- Reset button
- Download edited image button
- Before/after comparison slider
- Multiple filters at once

Single HTML file. Use Canvas API for pixel manipulation.
```

### 34. Screenshot Tool

```
Build a screenshot capture tool.

Features:
- Capture entire screen button
- Capture selected window button
- Capture specific area (if supported)
- Preview screenshot
- Annotate screenshot (draw, text, arrows)
- Download as PNG
- Copy to clipboard
- Recent screenshots gallery (localStorage)

Use Screen Capture API. Single HTML file. Note: requires HTTPS.
```

### 35. Geolocation Weather

```
Build a weather app using geolocation.

APIs needed (both no-auth):
- Geolocation API (built-in browser)
- wttr.in for weather (no key): http://wttr.in/{location}?format=j1

Features:
- Auto-detect user location on load
- Display:
  * Current temperature
  * Weather condition (sunny, rainy, etc.)
  * "Feels like" temperature
  * Humidity, wind speed
  * 5-day forecast
- Search for other locations
- Save favorite locations (localStorage)
- Weather emoji/icons

Single HTML file with Tailwind CSS.
```

---

## 💡 Bonus: Ultra-Quick Projects (5-10 min)

### 36. Random Quote Display

```
Single HTML file. Fetch random quotes from: https://api.quotable.io/random
Display quote and author. "New Quote" button. Copy button. Tailwind CSS.
```

### 37. Base64 Encoder/Decoder

```
Single HTML file. Two textareas (input/output). Encode and Decode buttons.
Use btoa() and atob(). Copy button. File upload to encode. Download encoded file.
```

### 38. Age Calculator

```
Single HTML file. Birth date input. Calculate exact age in years, months, days.
Next birthday countdown. Fun facts (days lived, hours, minutes). Zodiac sign.
```

### 39. Tip Calculator

```
Single HTML file. Bill amount input. Tip percentage slider or buttons (10%, 15%, 20%, custom).
Number of people to split. Show per-person amount. Total with tip.
```

### 40. Random Name Generator

```
Single HTML file. Arrays of first and last names. Generate random full name button.
Gender selector. Quantity input (generate multiple). Copy names. Save favorites.
```

---

## 🎯 How to Use These Prompts

1. **Copy the entire prompt** (the code block) for a project
2. **Paste into Claude Code** (or Claude.ai)
3. **Let it build** - Claude will create the files
4. **Run and test** - Open in browser or run dev server
5. **Customize** - Add your own features!

All projects work immediately with no API keys or account setup. Perfect for learning, portfolio fillers, or just having fun! ⚡
