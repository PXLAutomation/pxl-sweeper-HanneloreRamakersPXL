# IMPLEMENTATION_PHASE1.md

## Phase 1 Blueprint: Project Setup and Basic Structure

### Context
- Phase selected: **Phase 1** from `IMPLEMENTATION_PLAN.md`.
- `TODO.md` is currently empty, so this phase is the next logical start for the repository and matches the initial foundation work in the plan.
- Goal: establish the static web project scaffolding, entry points, and documentation without implementing game logic.

---

## 1. Architectural Design

### Core Data Structures
- No runtime game state yet; this phase focuses on static project scaffolding and module boundaries.
- Define the application entry vector as a small ES module loader pattern in `js/game.js`.

### State Definitions
- `appState` (future placeholder object) should be initialized in `js/game.js` as a simple object with these fields:
  - `currentDifficulty: string | null`
  - `isGameActive: boolean`
  - `board: null`
  - `timerId: null`

### Function Signatures
- `initializeApp(): void`
  - Responsibilities: attach DOM hooks, load starter UI, establish initial state.
- `renderLayout(): void`
  - Responsibilities: ensure HTML structure exists or is wired to static DOM elements.
- `registerEventHandlers(): void`
  - Responsibilities: wire restart and future input handlers.
- `createBoardPlaceholder(): void`
  - Responsibilities: build the grid container placeholder for later phases.

### Module Boundaries
- `index.html` remains the single-page shell and includes links to `css/styles.css` and `<script type="module" src="js/game.js"></script>`.
- `js/game.js` is the single JS module entry point for the phase.
- `css/styles.css` is the only stylesheet and provides reset, layout, and placeholder styling.
- `README.md` documents local run instructions and project intent.

---

## 2. File-Level Strategy

### Files to Touch
1. `package.json`
   - Responsibility: enable `type: "module"` and add a minimal `test` script.
   - Notes: no dependencies required; package metadata may be minimal.

2. `index.html`
   - Responsibility: define the static page shell, top bar placeholders, and main grid container.
   - Notes: ensure semantic structure with `header`, `main`, and a root `div` for the game.

3. `js/game.js`
   - Responsibility: main application entry point and future state bootstrap.
   - Notes: export initialization functions where useful.

4. `css/styles.css`
   - Responsibility: include basic CSS reset, desktop-first layout, and placeholder styling.
   - Notes: avoid game-specific styling beyond layout placeholders.

5. `README.md`
   - Responsibility: document local run instructions and reference the project structure.
   - Notes: include how to open `index.html` in a browser, and note the ES module requirement.

---

## 3. Atomic Execution Steps

For each Phase 1 TODO item, this section defines a Plan → Act → Validate cycle.

### 3.1 Create `package.json` with test script and ES module type
- Plan:
  - Add `package.json` at repo root.
  - Set `type` to `module`.
  - Add a `test` script that can be used later, e.g. `echo "No tests yet"` or `node --version`.
- Act:
  - Create `package.json` with fields: `name`, `version`, `type`, `scripts`.
- Validate:
  - Run `npm test` and confirm it exits successfully.
  - Open `package.json` to verify valid JSON and `type: "module"`.

### 3.2 Create `index.html` with basic structure (top bar placeholders, grid container)
- Plan:
  - Build an HTML shell with header and main content wrapper.
  - Include a top bar with placeholders for mine counter, restart button, and timer.
  - Add a `div` for the grid container.
- Act:
  - Write `index.html` containing the static layout and script/style includes.
- Validate:
  - Open `index.html` in a browser and confirm the page loads with visible placeholders.
  - Confirm console has no module load or syntax errors.

### 3.3 Create `js/game.js` as main entry point
- Plan:
  - Add the module file and export any setup function.
  - Implement `initializeApp()` to run once the DOM is ready.
- Act:
  - Create `js/game.js` with startup logic and placeholder `appState`.
- Validate:
  - Confirm browser console shows the module loaded and initialization executed.
  - Optionally check that `window` or DOM changes indicate the script ran.

### 3.4 Create `css/styles.css` with basic reset
- Plan:
  - Add a lightweight reset for body, headings, buttons, and links.
  - Define layout rules for the top bar and grid container.
- Act:
  - Create `css/styles.css` and link it from `index.html`.
- Validate:
  - Reload the browser page and check that the reset and layout styles apply.
  - Inspect the top bar and container spacing visually.

### 3.5 Update `README.md` with local run instructions
- Plan:
  - Document how to open the game locally and what the repo contains.
  - Note that the project is built for desktop browsers and uses ES modules.
- Act:
  - Edit `README.md` with a short setup section.
- Validate:
  - Read the README and confirm the instructions are complete, accurate, and minimal.

---

## 4. Edge Case & Boundary Audit

### Phase 1-specific risks
- `index.html` not linking `js/game.js` with `type="module"`, causing script failure in modern browsers.
- `package.json` invalid JSON syntax or missing `type` property.
- CSS file not referenced correctly, leaving the page unstyled.
- `js/game.js` loaded before DOM content exists, causing null-element lookups.
- `README.md` instructions missing the `ES module` requirement.

### Boundary conditions to watch
- Browser caching serving stale JS/CSS; ensure reload after edits.
- File paths in HTML must be relative and correct for a static hosting root.
- `npm test` command should not require installing packages yet.
- `package.json` should not introduce unneeded dependencies.

---

## 5. Verification Protocol

### Manual UX checks
- Open `index.html` in a desktop browser.
- Confirm the top bar placeholders are visible:
  - left: mine counter placeholder
  - center: restart button placeholder
  - right: timer placeholder
- Confirm the grid container placeholder is visible and centered.
- Confirm no JavaScript errors appear in the browser console.
- Confirm the page renders as a static single-page shell.

### Automated test checklist
- `npm test` returns success.
- `package.json` contains:
  - `"type": "module"`
  - a `scripts.test` entry.
- `index.html` contains:
  - `<link rel="stylesheet" href="css/styles.css">`
  - `<script type="module" src="js/game.js"></script>`
- `js/game.js` exports or initializes without syntax errors.
- `css/styles.css` exists and contains base reset rules.
- `README.md` includes a local run section with explicit browser/open instructions.

---

## 6. Code Scaffolding

### `package.json`
```json
{
  "name": "pxl-sweeper",
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "test": "echo \"No tests yet\" && exit 0"
  }
}
```

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PXL Sweeper</title>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <div class="app-shell">
    <header class="top-bar">
      <div class="counter">Mines: 0</div>
      <button class="restart">Restart</button>
      <div class="timer">00:00</div>
    </header>
    <main class="main-content">
      <section class="grid-placeholder">
        <p>Grid will render here.</p>
      </section>
    </main>
  </div>
  <script type="module" src="js/game.js"></script>
</body>
</html>
```

### `js/game.js`
```js
const appState = {
  currentDifficulty: null,
  isGameActive: false,
  board: null,
  timerId: null,
};

function initializeApp() {
  document.querySelector('.restart')?.addEventListener('click', () => {
    console.log('Restart placeholder clicked');
  });

  renderLayout();
}

function renderLayout() {
  const gridPlaceholder = document.querySelector('.grid-placeholder');
  if (gridPlaceholder) {
    gridPlaceholder.textContent = 'Game grid placeholder';
  }
}

window.addEventListener('DOMContentLoaded', initializeApp);

export { initializeApp, renderLayout };
```

### `css/styles.css`
```css
:root {
  color-scheme: light;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body {
  min-height: 100%;
}

body {
  font-family: system-ui, sans-serif;
  background: #f0f0f0;
  color: #1a1a1a;
}

.app-shell {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.grid-placeholder {
  min-height: 320px;
  background: #e0e0e0;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
```

### `README.md` section
```md
## Local Run Instructions

1. Open `index.html` in a modern desktop browser.
2. Ensure the browser supports ES modules.
3. No build step is required for Phase 1.
```

---

## Notes
- This blueprint is intentionally narrow: it does not include game logic, solver, or UI interaction details. Those belong to later phases.
- Keep the phase scoped to static layout and scaffolding so review can be surgical and focused.
