# Pokemon Info Lookup

**Setup:** Zero | **API:** PokeAPI (no auth)

## Mission Brief

Search for any Pokemon and display its stats, abilities, and image using the free PokeAPI. No API key needed - just fetch and display!

**What you'll learn:** API fetching, async/await, data transformation, responsive design

---

## What It Does

- Search Pokemon by name or ID
- Display Pokemon image (official artwork)
- Show stats (HP, Attack, Defense, etc.)
- List abilities and types
- Show evolution chain
- Display Pokedex entry
- Responsive card design

---

## Initial Prompt for Claude Code

```
Build a Pokemon Lookup web app using the PokeAPI (https://pokeapi.co).

Requirements:
- Search bar to enter Pokemon name or ID (1-1010)
- Fetch data from: https://pokeapi.co/api/v2/pokemon/{name-or-id}
- Display:
  * Pokemon name (capitalize it)
  * Official artwork image
  * Type(s) with colored badges
  * Base stats (HP, Attack, Defense, Sp.Atk, Sp.Def, Speed) as progress bars
  * Abilities list
  * Height and weight
- Handle errors (Pokemon not found)
- Loading state while fetching
- Responsive design with Tailwind CSS

Optional:
- Random Pokemon button
- Search autocomplete
- Compare two Pokemon side-by-side

Use Vite or a single HTML file - your choice!
```

---

## PokeAPI Overview

**Base URL:** `https://pokeapi.co/api/v2`

**No API key needed!** Just fetch directly.

### Example Endpoints

```javascript
// Get Pokemon by name or ID
fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
// or
fetch('https://pokeapi.co/api/v2/pokemon/25')

// Get Pokemon species (for flavor text/description)
fetch('https://pokeapi.co/api/v2/pokemon-species/25')

// Get evolution chain
fetch('https://pokeapi.co/api/v2/evolution-chain/10')
```

### Example Response Structure

```json
{
  "name": "pikachu",
  "id": 25,
  "height": 4,
  "weight": 60,
  "types": [
    { "type": { "name": "electric" } }
  ],
  "stats": [
    { "base_stat": 35, "stat": { "name": "hp" } },
    { "base_stat": 55, "stat": { "name": "attack" } }
  ],
  "abilities": [
    { "ability": { "name": "static" } }
  ],
  "sprites": {
    "other": {
      "official-artwork": {
        "front_default": "https://..."
      }
    }
  }
}
```

---

## Tech Stack

**Recommended: Vite + Vanilla JS**
```bash
npm create vite@latest pokemon-lookup -- --template vanilla
cd pokemon-lookup
npm install
npm run dev
```

**Alternative: Single HTML File**
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

---

## Code Snippets

### Fetching Pokemon Data

```javascript
async function fetchPokemon(nameOrId) {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`
    );

    if (!response.ok) {
      throw new Error('Pokemon not found');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
```

### Displaying Stats with Progress Bars

```javascript
function displayStats(stats) {
  return stats.map(stat => `
    <div class="mb-2">
      <div class="flex justify-between text-sm mb-1">
        <span class="capitalize">${stat.stat.name}</span>
        <span class="font-bold">${stat.base_stat}</span>
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-500 h-2 rounded-full"
          style="width: ${(stat.base_stat / 255) * 100}%"
        ></div>
      </div>
    </div>
  `).join('');
}
```

### Type Badge Colors

```javascript
const typeColors = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-700',
  flying: 'bg-indigo-300',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-800',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

function getTypeBadge(type) {
  const color = typeColors[type] || 'bg-gray-400';
  return `<span class="${color} text-white px-3 py-1 rounded-full text-sm">${type}</span>`;
}
```

---

## Features Checklist

### Must-Have
- [ ] Search by name or ID
- [ ] Display Pokemon image
- [ ] Show types with colored badges
- [ ] Display base stats with progress bars
- [ ] List abilities
- [ ] Error handling (not found)
- [ ] Loading state

### Nice-to-Have
- [ ] Random Pokemon button
- [ ] Search suggestions/autocomplete
- [ ] Display Pokedex entry text
- [ ] Show evolution chain
- [ ] Shiny sprite toggle
- [ ] Compare two Pokemon
- [ ] Favorite Pokemon list (localStorage)
- [ ] Dark mode

---

## Example UI Layout

```
┌─────────────────────────────────┐
│   🔍 [Search Pokemon...]  [Go]  │
│                                 │
│  ┌─────────────────────────┐   │
│  │                         │   │
│  │      [Pokemon Image]    │   │
│  │                         │   │
│  │      PIKACHU (#25)      │   │
│  │    [⚡Electric]          │   │
│  │                         │   │
│  │  HP:        ████░░  35  │   │
│  │  Attack:    █████░  55  │   │
│  │  Defense:   ████░░  40  │   │
│  │  Sp.Atk:    █████░  50  │   │
│  │  Sp.Def:    █████░  50  │   │
│  │  Speed:     ██████  90  │   │
│  │                         │   │
│  │  Abilities: Static,     │   │
│  │             Lightning Rod│   │
│  │                         │   │
│  │  Height: 0.4m           │   │
│  │  Weight: 6.0kg          │   │
│  └─────────────────────────┘   │
│                                 │
│      [Random Pokemon]           │
└─────────────────────────────────┘
```

---

## Testing Checklist

- [ ] Can search by name (lowercase works)
- [ ] Can search by ID number
- [ ] Image loads correctly
- [ ] Stats display properly
- [ ] Type badges have correct colors
- [ ] Handles invalid Pokemon (error message)
- [ ] Loading state shows during fetch
- [ ] Responsive on mobile
- [ ] Works with special cases (Farfetch'd, Mr. Mime)

---

## Extensions & Improvements

### Easy
- Add "Random Pokemon" button
- Show height/weight in both metric and imperial
- Add shiny sprite toggle
- Favorite Pokemon list (localStorage)

### Medium
- Search autocomplete (fetch Pokemon list)
- Evolution chain display
- Moves list with filters
- Compare two Pokemon side-by-side
- Pokedex mode (browse all Pokemon)

### Advanced
- Team builder (6 Pokemon max)
- Type effectiveness calculator
- Stats calculator with EVs/IVs
- Battle simulator
- Integration with Pokemon Showdown

---

## Fun Pokemon to Test

- **pikachu** (25) - Classic
- **charizard** (6) - Dual type
- **mewtwo** (150) - Legendary
- **ditto** (132) - Transform ability
- **magikarp** (129) - Weak stats
- **arceus** (493) - Highest stats
- **mr-mime** (122) - Special characters in name
- **farfetchd** (83) - Apostrophe in name

---

## Common Issues & Solutions

**Issue:** Pokemon names with special characters fail
**Solution:** Convert to API format: "Farfetch'd" → "farfetchd", "Mr. Mime" → "mr-mime"

**Issue:** Images load slowly
**Solution:** Add loading skeleton/placeholder, use `loading="lazy"` attribute

**Issue:** Some Pokemon have multiple forms
**Solution:** PokeAPI defaults to base form, can fetch specific forms

**Issue:** Evolution chain is complex
**Solution:** Requires separate API call to `/pokemon-species/` then `/evolution-chain/`

---

## Bonus: Full Working Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pokemon Lookup</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen p-8">
  <div class="max-w-2xl mx-auto">
    <h1 class="text-4xl font-bold text-center mb-8">🔍 Pokemon Lookup</h1>

    <div class="flex gap-2 mb-8">
      <input
        id="search"
        type="text"
        placeholder="Enter Pokemon name or ID..."
        class="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 outline-none"
      >
      <button
        id="searchBtn"
        class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
      >
        Search
      </button>
    </div>

    <div id="result" class="hidden">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="text-center mb-6">
          <img id="sprite" class="w-48 h-48 mx-auto" />
          <h2 id="name" class="text-3xl font-bold capitalize"></h2>
          <p id="id" class="text-gray-500"></p>
          <div id="types" class="flex gap-2 justify-center mt-4"></div>
        </div>

        <div id="stats" class="mb-6"></div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span class="text-gray-500">Height:</span>
            <span id="height" class="font-semibold ml-2"></span>
          </div>
          <div>
            <span class="text-gray-500">Weight:</span>
            <span id="weight" class="font-semibold ml-2"></span>
          </div>
        </div>

        <div class="mt-6">
          <h3 class="font-semibold mb-2">Abilities</h3>
          <div id="abilities" class="flex flex-wrap gap-2"></div>
        </div>
      </div>
    </div>

    <div id="error" class="hidden">
      <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        Pokemon not found! Try another name or ID.
      </div>
    </div>

    <div id="loading" class="hidden text-center">
      <p class="text-lg">Loading...</p>
    </div>
  </div>

  <script>
    const searchInput = document.getElementById('search');
    const searchBtn = document.getElementById('searchBtn');
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');
    const loadingDiv = document.getElementById('loading');

    const typeColors = {
      fire: 'bg-red-500', water: 'bg-blue-500', grass: 'bg-green-500',
      electric: 'bg-yellow-400', psychic: 'bg-pink-500', ice: 'bg-cyan-300',
      dragon: 'bg-indigo-600', dark: 'bg-gray-800', fairy: 'bg-pink-300',
      normal: 'bg-gray-400', fighting: 'bg-orange-700', flying: 'bg-blue-300',
      poison: 'bg-purple-500', ground: 'bg-yellow-600', rock: 'bg-yellow-800',
      bug: 'bg-green-600', ghost: 'bg-purple-700', steel: 'bg-gray-500',
    };

    async function searchPokemon() {
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      resultDiv.classList.add('hidden');
      errorDiv.classList.add('hidden');
      loadingDiv.classList.remove('hidden');

      try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!res.ok) throw new Error('Not found');

        const data = await res.json();
        displayPokemon(data);
      } catch (error) {
        loadingDiv.classList.add('hidden');
        errorDiv.classList.remove('hidden');
      }
    }

    function displayPokemon(data) {
      document.getElementById('sprite').src = data.sprites.other['official-artwork'].front_default;
      document.getElementById('name').textContent = data.name;
      document.getElementById('id').textContent = `#${data.id}`;
      document.getElementById('height').textContent = `${data.height / 10}m`;
      document.getElementById('weight').textContent = `${data.weight / 10}kg`;

      // Types
      const typesHTML = data.types.map(t =>
        `<span class="${typeColors[t.type.name] || 'bg-gray-400'} text-white px-4 py-1 rounded-full text-sm capitalize">${t.type.name}</span>`
      ).join('');
      document.getElementById('types').innerHTML = typesHTML;

      // Stats
      const statsHTML = data.stats.map(s => `
        <div class="mb-3">
          <div class="flex justify-between text-sm mb-1">
            <span class="capitalize">${s.stat.name.replace('-', ' ')}</span>
            <span class="font-bold">${s.base_stat}</span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-blue-500 h-2.5 rounded-full" style="width: ${(s.base_stat / 255) * 100}%"></div>
          </div>
        </div>
      `).join('');
      document.getElementById('stats').innerHTML = statsHTML;

      // Abilities
      const abilitiesHTML = data.abilities.map(a =>
        `<span class="bg-gray-200 px-3 py-1 rounded-full text-sm capitalize">${a.ability.name.replace('-', ' ')}</span>`
      ).join('');
      document.getElementById('abilities').innerHTML = abilitiesHTML;

      loadingDiv.classList.add('hidden');
      resultDiv.classList.remove('hidden');
    }

    searchBtn.addEventListener('click', searchPokemon);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') searchPokemon();
    });
  </script>
</body>
</html>
```

---

## Success Criteria

✅ Can search and display any Pokemon
✅ Image loads correctly
✅ Stats show with progress bars
✅ Type badges colored correctly
✅ Error handling works
✅ Responsive design

**Bonus:** Add random Pokemon and favorites!

---

Perfect for learning API fetching with zero setup!
