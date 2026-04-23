# REQUIREMENTS.md

## 1. Product Overview

**Description**

* A desktop-first, single-page Minesweeper-inspired puzzle game.
* Players reveal tiles on a grid to avoid hidden mines using logical deduction.

**Distinct Features**

* Guaranteed solvable boards (no guessing required).
* One twist: **First-click safe + zero-region opening** (first click always reveals a zero tile and triggers a meaningful opening).

**Target Experience**

* Feel: Retro, focused, distraction-free.
* Pacing: Starts with immediate progress (no dead starts), then ramps into thoughtful deduction.
* Challenge: Pure logic, no randomness-induced failure.

---

## 2. Core Gameplay Rules

**Grid & Mines**

* Rectangular grid (e.g., Beginner 9×9, Intermediate 16×16, Expert 30×16).
* Fixed number of mines per difficulty.
* Each tile:

  * Contains a mine OR
  * Displays a number (0–8) indicating adjacent mines.

**Win Condition**

* All non-mine tiles are revealed.

**Loss Condition**

* Player reveals a mine (except first click, see below).

**Solvability Definition**

* The generated board must be solvable using deterministic logic:

  * At any decision point, at least one move can be deduced without guessing.
* Implementation assumption:

  * Use a generator that validates solvability via a constraint-based solver or rule simulation.
  * If unsolvable, regenerate.

**First Click Behavior**

* First click:

  * Never hits a mine.
  * Always reveals a **0 tile** (no adjacent mines).
  * Triggers flood fill to open a starting region.

**Player Actions**

* Left click:

  * Reveal tile.
* Right click:

  * Toggle flag (hidden → flagged → hidden).
* Chord (optional but included):

  * Left + right click (or middle click) on a revealed number:

    * If number of adjacent flags equals tile number → reveal surrounding tiles.

---

## 3. Game State & Logic

**Board Representation**

* 2D array of tiles.
* Each tile stores:

  * `isMine: boolean`
  * `isRevealed: boolean`
  * `isFlagged: boolean`
  * `adjacentMineCount: 0–8`

**Mine Placement Strategy**

* After first click:

  * Exclude clicked tile + its neighbors from mine placement.
* Place mines randomly within constraints.
* Validate board:

  * Run solvability check.
  * If fails → regenerate.

**Reveal Logic**

* If tile is:

  * Mine → trigger loss.
  * Number > 0 → reveal only itself.
  * Number = 0 → flood fill:

    * Reveal all connected zero tiles.
    * Reveal boundary number tiles.

**Edge Cases**

* Clicking revealed tile → no-op (unless chord).
* Clicking flagged tile → no-op.

**Flagging Rules**

* Flags are optional aids.
* No penalty for incorrect flags.
* Flag count displayed but not enforced as a hard limit.

**Endgame Detection**

* Win:

  * All non-mine tiles revealed.
* Loss:

  * Mine revealed.
  * Reveal all mines.
  * Highlight incorrect flags.

---

## 4. The One Twist

**Twist: First-Click Zero Guarantee**

* First click always reveals a zero tile and opens a region.

**Justification**

* Eliminates frustrating starts.
* Reduces early-game randomness without altering core rules.

**Impact on Strategy**

* Encourages immediate deduction from an open region.
* No change to mid/late-game logic.

---

## 5. User Interface Requirements

**Layout**

* Fixed layout:

  * Top bar:

    * Mine counter (left)
    * Restart button (center)
    * Timer (right)
  * Main grid centered below.

**Visual Style**

* Retro aesthetic inspired by classic desktop games:

  * Gray panel background.
  * Beveled tile borders (raised for hidden, inset for revealed).
  * Pixel-style font (or system fallback).
* Color scheme:

  * Numbers use classic colors (1=blue, 2=green, etc.).

**Tile States**

* Hidden: raised tile.
* Hover: subtle highlight.
* Revealed:

  * Empty (flat)
  * Numbered
* Flagged: flag icon.
* Exploded mine: distinct red highlight.
* Incorrect flag (on loss): marked visually.

**Feedback**

* Immediate visual response on click.
* No heavy animations.
* Win:

  * Freeze board.
  * Optional subtle highlight.
* Loss:

  * Show all mines instantly.

---

## 6. Controls & Interaction Model

**Mouse**

* Left click: reveal.
* Right click: toggle flag.
* Chord: reveal neighbors (if valid).

**Keyboard (minimal)**

* `R`: restart game.
* Optional:

  * Arrow keys + Enter (not required).

**Responsiveness**

* Desktop-first:

  * Fixed grid scaling.
  * Window resize:

    * Center grid.
    * No dynamic scaling required (assumption).

---

## 7. Progression & Replayability

**Difficulties**

* Beginner: 9×9, 10 mines.
* Intermediate: 16×16, 40 mines.
* Expert: 30×16, 99 mines.

**Timer**

* Starts on first click.
* Stops on win/loss.
* Displayed in seconds.

**Scoring**

* Best time per difficulty stored locally.

**Local Storage**

* Store:

  * Best times.

**Restart Flow**

* Restart button resets board instantly.
* No confirmation dialog.

---

## 8. Non-Goals

* No animations beyond minimal UI feedback.
* No sound effects or music.
* No accounts or user profiles.
* No backend or server communication.
* No multiplayer.
* No advanced hint system.
* No mobile optimization beyond basic usability.
* No custom board editor.
* No achievements or meta-progression.

---

## 9. Technical Constraints

* Single HTML page (SPA without routing).
* Vanilla JavaScript (preferred) or minimal framework.
* No heavy external dependencies.
* Rendering:

  * DOM-based grid (no canvas required).
* Performance:

  * Instant interaction for up to Expert grid.
* Browser Support:

  * Modern desktop browsers (Chrome, Firefox, Edge).
  * No legacy browser support required.

---

## 10. Edge Cases & Failure Modes

**First Click**

* Must never be a mine.
* Must always produce a valid opening.

**Rapid Clicking**

* Prevent race conditions:

  * Ignore input during state transitions.

**Invalid States**

* Prevent:

  * Revealing flagged tiles.
  * Double-processing clicks.

**Chord Misuse**

* If flags ≠ number:

  * No action.

**Resize Issues**

* Grid remains usable.
* No layout breaking.

**Game Reset During Play**

* Clean state reset:

  * Clear timer.
  * Clear board state.

---
## Project Setup Requirements

- The project shall include a `package.json` file in the repository root.
- The `package.json` file shall define the project's runnable commands in a consistent way.
- The `package.json` file shall include at least a `test` script so the same test command can be run every time.
- If the project uses ES module imports in JavaScript, `package.json` shall set `"type": "module"`.
- The project shall remain compatible with a plain JavaScript, static-site workflow.
---
Recommend 3 stack options for this project.

Constraints:
- understandable in this course
- easy for an AI coding agent to generate, review, and test
- simple deployment
- no unnecessary complexity

For each option, give:
- why it fits
- what it makes harder
- test strategy
- deploy strategy

Then recommend one option and explain why it is the best teaching choice.