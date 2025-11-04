# Color Palette Generator

**Time:** ⚡ 15-20 min | **Setup:** Zero | **APIs:** None

## Mission Brief

Generate beautiful, harmonious color palettes instantly. Perfect for designers, developers, or anyone who loves colors. Completely client-side - no backend needed!

**What you'll learn:** Color theory, algorithms, DOM manipulation, clipboard API

---

## What It Does

- Generate random color palettes (5 colors)
- Different harmony modes (complementary, analogous, triadic, monochromatic)
- Lock colors you like, generate new ones for the rest
- Copy hex codes to clipboard
- Export palette as CSS/JSON
- Spacebar to generate new palette
- Responsive color cards

---

## Initial Prompt for Claude Code

```
Build a Color Palette Generator web app.

Requirements:
- Generate 5 random colors on load
- Display each color as a large card showing:
  * Color swatch (big square)
  * Hex code
  * RGB values
  * Lock button (keep this color, generate new others)
  * Copy button (copy hex to clipboard)
- Spacebar keyboard shortcut to generate new palette
- Generate button
- Different modes:
  * Random
  * Complementary
  * Analogous
  * Triadic
  * Monochromatic
- Export palette as CSS variables or JSON
- Clean, modern UI with Tailwind CSS

Use a single HTML file or Vite - your choice.

The colors should look good together (not completely random).
```

---

## Tech Stack

**Recommended: Single HTML File**
```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <!-- App here -->
</body>
</html>
```

Super quick to build!

---

## Color Generation Algorithms

### Random Color
```javascript
function randomColor() {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
}
```

### HSL-based Generation (Better for harmonious colors)
```javascript
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function generatePalette(mode = 'random') {
  const baseHue = Math.floor(Math.random() * 360);
  const colors = [];

  switch(mode) {
    case 'analogous':
      // Colors close to each other on color wheel
      for (let i = 0; i < 5; i++) {
        colors.push(hslToHex((baseHue + i * 30) % 360, 70, 60));
      }
      break;

    case 'complementary':
      // Base color and its opposite
      colors.push(hslToHex(baseHue, 70, 60));
      colors.push(hslToHex((baseHue + 180) % 360, 70, 60));
      colors.push(hslToHex((baseHue + 30) % 360, 70, 60));
      colors.push(hslToHex((baseHue + 210) % 360, 70, 60));
      colors.push(hslToHex((baseHue + 90) % 360, 70, 60));
      break;

    case 'triadic':
      // Three colors evenly spaced
      for (let i = 0; i < 5; i++) {
        colors.push(hslToHex((baseHue + i * 120) % 360, 70, 60));
      }
      break;

    case 'monochromatic':
      // Same hue, different lightness
      for (let i = 0; i < 5; i++) {
        colors.push(hslToHex(baseHue, 70, 30 + i * 15));
      }
      break;

    default: // random
      for (let i = 0; i < 5; i++) {
        colors.push(randomColor());
      }
  }

  return colors;
}
```

### Hex to RGB
```javascript
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}
```

---

## Code Snippets

### Copy to Clipboard
```javascript
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    // Show success message
    alert('Copied to clipboard!');
  } catch (err) {
    console.error('Failed to copy:', err);
  }
}
```

### Keyboard Shortcut (Spacebar)
```javascript
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && e.target === document.body) {
    e.preventDefault();
    generateNewPalette();
  }
});
```

### Export as CSS Variables
```javascript
function exportAsCSS(colors) {
  return `:root {
  --color-1: ${colors[0]};
  --color-2: ${colors[1]};
  --color-3: ${colors[2]};
  --color-4: ${colors[3]};
  --color-5: ${colors[4]};
}`;
}
```

### Determine Text Color (Light/Dark) for Contrast
```javascript
function getContrastColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
}
```

---

## Features Checklist

### Must-Have
- [ ] Generate 5 colors
- [ ] Display hex codes
- [ ] Copy hex to clipboard
- [ ] Generate new palette button
- [ ] Spacebar shortcut

### Nice-to-Have
- [ ] Lock individual colors
- [ ] Different harmony modes
- [ ] Show RGB values
- [ ] Export as CSS/JSON
- [ ] Show color name (optional)
- [ ] Undo last generation
- [ ] Save favorite palettes (localStorage)
- [ ] Adjust saturation/lightness

---

## Example UI Layout

```
┌───────────────────────────────────────────┐
│  🎨 Color Palette Generator               │
│                                           │
│  Mode: [Random ▾]  [Generate] [Export]   │
│                                           │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐│
│  │     │ │     │ │     │ │     │ │     ││
│  │ C1  │ │ C2  │ │ C3  │ │ C4  │ │ C5  ││
│  │     │ │     │ │     │ │     │ │     ││
│  │     │ │     │ │     │ │     │ │     ││
│  └─────┘ └─────┘ └─────┘ └─────┘ └─────┘│
│  #FF5733  #33FF57  #5733FF  #F3FF33 ...  │
│  [Copy]   [Copy]   [Copy]   [Copy]  ...  │
│  [🔒]     [🔒]     [🔒]     [🔒]    ...  │
│                                           │
│  Press SPACEBAR to generate new palette   │
└───────────────────────────────────────────┘
```

---

## Testing Checklist

- [ ] Colors display correctly
- [ ] Hex codes are valid (6 characters)
- [ ] Copy to clipboard works
- [ ] Generate button creates new palette
- [ ] Spacebar shortcut works
- [ ] Locked colors stay when regenerating
- [ ] Export creates valid CSS/JSON
- [ ] Text on color cards is readable (contrast)
- [ ] Responsive on mobile

---

## Extensions & Improvements

### Easy
- Add color names using a color name library
- Shade variations (lighter/darker)
- Save palette history (localStorage)
- Favorite palettes
- Share URL with palette encoded

### Medium
- Upload image and extract color palette from it
- Gradient generator
- Accessibility checker (contrast ratios)
- Color blindness simulator
- More harmony modes (tetradic, split-complementary)

### Advanced
- AI color suggestions based on mood/keywords
- Integration with design tools (Figma plugin)
- Community sharing of palettes
- Palette trending/popular section
- Generate from brand colors

---

## Bonus: Full Working Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Color Palette Generator</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 min-h-screen p-8">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-4xl font-bold text-center mb-8">🎨 Color Palette Generator</h1>

    <div class="text-center mb-8">
      <button id="generate" class="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg">
        Generate New Palette
      </button>
      <p class="text-gray-600 mt-2 text-sm">Press <kbd class="px-2 py-1 bg-gray-200 rounded">SPACE</kbd> to generate</p>
    </div>

    <div id="palette" class="grid grid-cols-5 gap-4 mb-8">
      <!-- Color cards will be inserted here -->
    </div>

    <div class="text-center">
      <button id="export" class="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg">
        Export as CSS
      </button>
    </div>
  </div>

  <script>
    let currentPalette = [];
    let lockedColors = [false, false, false, false, false];

    function hslToHex(h, s, l) {
      l /= 100;
      const a = s * Math.min(l, 1 - l) / 100;
      const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
      };
      return `#${f(0)}${f(8)}${f(4)}`;
    }

    function generatePalette() {
      const baseHue = Math.floor(Math.random() * 360);
      const colors = [];

      for (let i = 0; i < 5; i++) {
        if (lockedColors[i] && currentPalette[i]) {
          colors.push(currentPalette[i]);
        } else {
          const hue = (baseHue + i * 30) % 360;
          const saturation = 60 + Math.random() * 20;
          const lightness = 50 + Math.random() * 20;
          colors.push(hslToHex(hue, saturation, lightness));
        }
      }

      return colors;
    }

    function getContrastColor(hexColor) {
      const r = parseInt(hexColor.slice(1, 3), 16);
      const g = parseInt(hexColor.slice(3, 5), 16);
      const b = parseInt(hexColor.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 128 ? '#000000' : '#FFFFFF';
    }

    function displayPalette(colors) {
      currentPalette = colors;
      const paletteDiv = document.getElementById('palette');

      paletteDiv.innerHTML = colors.map((color, i) => {
        const textColor = getContrastColor(color);
        const locked = lockedColors[i];

        return `
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <div
              class="h-48 flex items-center justify-center cursor-pointer hover:opacity-90"
              style="background-color: ${color}; color: ${textColor};"
              onclick="copyColor('${color}')"
            >
              <span class="text-2xl font-bold opacity-0 hover:opacity-100 transition-opacity">
                Click to Copy
              </span>
            </div>
            <div class="p-4">
              <p class="font-mono text-center mb-2">${color.toUpperCase()}</p>
              <div class="flex gap-2">
                <button
                  onclick="copyColor('${color}')"
                  class="flex-1 bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded text-sm"
                >
                  Copy
                </button>
                <button
                  onclick="toggleLock(${i})"
                  class="px-3 py-2 rounded ${locked ? 'bg-yellow-400' : 'bg-gray-200'} hover:bg-yellow-300"
                >
                  ${locked ? '🔒' : '🔓'}
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    async function copyColor(color) {
      try {
        await navigator.clipboard.writeText(color);
        showToast(`Copied ${color}!`);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }

    function toggleLock(index) {
      lockedColors[index] = !lockedColors[index];
      displayPalette(currentPalette);
    }

    function showToast(message) {
      const toast = document.createElement('div');
      toast.textContent = message;
      toast.className = 'fixed bottom-4 right-4 bg-black text-white px-6 py-3 rounded-lg shadow-lg';
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 2000);
    }

    function exportAsCSS() {
      const css = `:root {\n${currentPalette.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
      copyColor(css);
      showToast('CSS copied to clipboard!');
    }

    document.getElementById('generate').addEventListener('click', () => {
      displayPalette(generatePalette());
    });

    document.getElementById('export').addEventListener('click', exportAsCSS);

    document.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        displayPalette(generatePalette());
      }
    });

    // Generate initial palette
    displayPalette(generatePalette());
  </script>
</body>
</html>
```

---

## Color Theory Quick Reference

**Complementary:** Colors opposite on color wheel (e.g., blue & orange)
**Analogous:** Colors next to each other (e.g., blue, blue-green, green)
**Triadic:** Three colors evenly spaced (e.g., red, yellow, blue)
**Monochromatic:** Same hue, different shades (e.g., light blue, blue, dark blue)

---

## Success Criteria

✅ Generates harmonious colors
✅ Can copy hex codes
✅ Lock/unlock individual colors
✅ Spacebar shortcut works
✅ Export functionality
✅ Readable text on all backgrounds

**Bonus:** Add image color extraction!

---

**Build time: 15-20 minutes** ⚡

Perfect quick project for learning color manipulation!
