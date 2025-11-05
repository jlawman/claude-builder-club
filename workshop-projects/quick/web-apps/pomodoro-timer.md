# Pomodoro Timer

**Setup:** Zero | **APIs:** None

## Mission Brief

Build a focused work timer using the Pomodoro Technique (25 min work, 5 min break). Completely client-side - no backend, no APIs, no accounts needed.

**What you'll learn:** JavaScript timers, state management, browser notifications, localStorage

---

## What It Does

- 25-minute work sessions
- 5-minute short breaks
- 15-minute long breaks (after 4 sessions)
- Browser notifications when time's up
- Track completed pomodoros
- Sound notification
- Pause/resume functionality

---

## Initial Prompt for Claude Code

```
Build a Pomodoro Timer web app.

Requirements:
- Single HTML file with inline CSS and JavaScript (or Vite if preferred)
- Use Tailwind CSS (CDN is fine)
- Timer display showing minutes and seconds
- Three timer modes: Work (25min), Short Break (5min), Long Break (15min)
- Start, Pause, Reset buttons
- Track number of completed work sessions
- Browser notification when timer completes
- Optional: Sound notification
- Optional: Save settings to localStorage

UI should be:
- Clean, minimal design
- Large timer display
- Clear mode indicator (Work/Break)
- Session counter

Start with a single HTML file approach, then we can enhance it.
```

---

## Features Checklist

### Must-Have
- [ ] 25/5/15 minute presets
- [ ] Start/Pause/Reset buttons
- [ ] Timer counts down properly
- [ ] Visual indicator of mode (work/break)
- [ ] Session counter

### Nice-to-Have
- [ ] Browser notifications
- [ ] Sound notification
- [ ] Custom time settings
- [ ] Save preferences to localStorage
- [ ] Keyboard shortcuts (spacebar to start/pause)
- [ ] Progress ring/bar
- [ ] Dark mode

---

## Tech Stack

**Option 1: Single HTML File** (Fastest)
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- Your app here -->
  <script>
    // Your JavaScript here
  </script>
</body>
</html>
```

**Option 2: Vite + Vanilla JS**
```bash
npm create vite@latest pomodoro -- --template vanilla
cd pomodoro
npm install
npm run dev
```

**Option 3: Next.js 15** (If you want to practice Next.js)
```bash
bunx create-next-app@latest pomodoro --typescript --tailwind --app --src-dir
```

---

## Code Snippets

### Timer Logic
```javascript
let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let intervalId = null;

function startTimer() {
  isRunning = true;
  intervalId = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      timerComplete();
    }
  }, 1000);
}

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById('timer').textContent =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function timerComplete() {
  clearInterval(intervalId);
  isRunning = false;
  // Show notification
  if (Notification.permission === 'granted') {
    new Notification('Pomodoro Complete!', {
      body: 'Time for a break!',
    });
  }
}
```

### Browser Notifications
```javascript
// Request permission on page load
if (Notification.permission === 'default') {
  Notification.requestPermission();
}
```

### localStorage for Preferences
```javascript
// Save settings
function saveSettings(workTime, breakTime) {
  localStorage.setItem('pomodoroSettings', JSON.stringify({
    workTime,
    breakTime,
  }));
}

// Load settings
function loadSettings() {
  const saved = localStorage.getItem('pomodoroSettings');
  return saved ? JSON.parse(saved) : { workTime: 25, breakTime: 5 };
}
```

---

## Testing Checklist

- [ ] Timer counts down correctly
- [ ] Pause button freezes timer
- [ ] Resume button continues from pause
- [ ] Reset button returns to 25:00
- [ ] Session counter increments
- [ ] Notification appears (if permission granted)
- [ ] Works on mobile
- [ ] Timer doesn't drift (stays accurate)

---

## Extensions & Improvements

### Easy
- Add sound notification (use HTML5 Audio)
- Keyboard shortcuts (spacebar = start/pause)
- Custom timer durations
- Different color schemes for work/break

### Medium
- Statistics dashboard (total pomodoros today, this week)
- Task list integration (what are you working on?)
- Multiple timer presets
- Auto-start next session

### Advanced
- Daily/weekly analytics
- Export statistics
- Sync across devices (with backend)
- Integration with calendar/todo apps

---

## Example UI Layout

```
┌─────────────────────────────┐
│                             │
│     🍅 Pomodoro Timer       │
│                             │
│        WORK MODE            │
│                             │
│         25:00               │
│      ━━━━━━━━━━━━          │
│                             │
│   [Start] [Pause] [Reset]  │
│                             │
│    Sessions: 🍅🍅🍅○        │
│                             │
└─────────────────────────────┘
```

---

## Common Issues & Solutions

**Issue:** Timer drifts over time (not accurate)
**Solution:** Use Date.now() to track actual time instead of just counting intervals

**Issue:** Tab inactive = timer stops
**Solution:** Use Web Workers or just accept it (Pomodoro should have focus anyway)

**Issue:** Notification doesn't show
**Solution:** Check permission, must be granted by user

**Issue:** Timer continues after closing tab
**Solution:** Store end time in localStorage, check on reload

---

## Real-World Example

This is a production-ready Pomodoro timer as a single HTML file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pomodoro Timer</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-red-50 to-orange-50 min-h-screen flex items-center justify-center">
  <div class="bg-white p-12 rounded-2xl shadow-2xl max-w-md w-full">
    <h1 class="text-4xl font-bold text-center mb-2">🍅</h1>
    <h2 class="text-2xl font-semibold text-center mb-8">Pomodoro Timer</h2>

    <div id="mode" class="text-center text-sm uppercase tracking-wider text-gray-500 mb-4">
      Work Mode
    </div>

    <div id="timer" class="text-7xl font-bold text-center mb-8 font-mono">
      25:00
    </div>

    <div class="flex gap-4 justify-center mb-8">
      <button id="start" class="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold">
        Start
      </button>
      <button id="pause" class="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-lg font-semibold hidden">
        Pause
      </button>
      <button id="reset" class="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold">
        Reset
      </button>
    </div>

    <div id="sessions" class="text-center text-gray-600">
      Sessions: <span id="count">0</span>
    </div>
  </div>

  <script>
    let timeLeft = 25 * 60;
    let isRunning = false;
    let intervalId = null;
    let mode = 'work';
    let sessions = 0;

    const timerEl = document.getElementById('timer');
    const startBtn = document.getElementById('start');
    const pauseBtn = document.getElementById('pause');
    const resetBtn = document.getElementById('reset');
    const modeEl = document.getElementById('mode');
    const countEl = document.getElementById('count');

    function updateDisplay() {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerEl.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    function startTimer() {
      isRunning = true;
      startBtn.classList.add('hidden');
      pauseBtn.classList.remove('hidden');

      intervalId = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          updateDisplay();
        } else {
          complete();
        }
      }, 1000);
    }

    function pauseTimer() {
      isRunning = false;
      clearInterval(intervalId);
      startBtn.classList.remove('hidden');
      pauseBtn.classList.add('hidden');
    }

    function resetTimer() {
      pauseTimer();
      timeLeft = mode === 'work' ? 25 * 60 : 5 * 60;
      updateDisplay();
    }

    function complete() {
      pauseTimer();
      if (mode === 'work') {
        sessions++;
        countEl.textContent = sessions;
        alert('Work session complete! Take a break!');
        mode = 'break';
        timeLeft = 5 * 60;
        modeEl.textContent = 'Break Mode';
      } else {
        alert('Break complete! Back to work!');
        mode = 'work';
        timeLeft = 25 * 60;
        modeEl.textContent = 'Work Mode';
      }
      updateDisplay();
    }

    startBtn.addEventListener('click', startTimer);
    pauseBtn.addEventListener('click', pauseTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  </script>
</body>
</html>
```

Copy this, save as `pomodoro.html`, and open in browser!

---

## Success Criteria

✅ Timer counts down accurately
✅ Can start, pause, and reset
✅ Sessions tracked
✅ Clean, usable interface
✅ Works on mobile

**Bonus:** Add notifications and custom durations!

---

Start with the initial prompt and let Claude Code build it for you!
