# IMPLEMENTATION_PLAN.md

## Overview

**Project Name:** PXL Sweeper

**Project Type:** Browser-based puzzle game

**Goal:** Deliver a desktop-first, single-page Minesweeper-inspired game with guaranteed solvable boards, first-click zero guarantee, and classic gameplay mechanics.

**Constraints:** Vanilla JavaScript, single HTML page, no heavy external dependencies, modern desktop browsers only, static site deployment.

**Existing Documents Available:** REQUIREMENTS.md

**Deployment Target:** LOCAL ONLY

**Risk Tolerance:** MEDIUM

## Assumptions

- The project will use vanilla JavaScript with ES modules for modularity.
- Solvability validation will be implemented via a basic constraint-based solver simulation, regenerating boards if unsolvable.
- UI will be DOM-based with CSS for styling, no canvas or frameworks.
- Local storage will use browser APIs for best times.
- No mobile optimization beyond basic responsiveness.
- Review cadence is weekly, with phases sized for one-week cycles.
- Tests will be manual and basic unit tests using a simple test runner.

## Delivery Strategy

This plan uses a hybrid approach: layered implementation for core game logic followed by vertical slices for UI and features. This fits the project type as a self-contained game where logic must be solid before UI integration, while allowing incremental feature delivery. The strategy supports the weekly review cadence by keeping phases small and focused, enabling early validation of core mechanics before full UI polish.

## Phase List

- Phase 1: Project Setup and Basic Structure
- Phase 2: Core Game Logic Implementation
- Phase 3: Basic UI Rendering and Grid Display
- Phase 4: Game Interactions and State Management
- Phase 5: Advanced Features and Polish
- Phase 6: Testing and Stabilization

## Detailed Phases

### Phase 1: Project Setup and Basic Structure

**Goal:** Establish the project foundation with file structure, package.json, and initial HTML skeleton.

**Scope:** Create the basic project layout, configure ES modules, and set up a minimal HTML page with placeholders for game elements.

**Expected Files to Change:**
- package.json
- index.html
- js/game.js (main entry point)
- css/styles.css
- README.md (update with setup instructions)

**Dependencies:** None (initial phase).

**Risks:** Low risk; standard web project setup with no complex logic.

**Tests and Checks to Run:**
- `npm run build` (if build script added)
- Manual check: Open index.html in browser, verify basic page loads
- Lint check: `npm run lint` (if linting added)

**Review Check Before Moving Work to DONE.md:**
- Code review: Confirm clean, minimal setup code.
- Requirement traceability: Matches REQUIREMENTS.md project setup section.
- Regression risk: None.
- Documentation: README.md updated with run instructions.
- Scope creep: No extra features added.
- TODO refresh: All setup items completed.

**Exact TODO.md Entries to Refresh from This Phase:**
- [ ] Create package.json with test script and ES module type
- [ ] Create index.html with basic structure (top bar placeholders, grid container)
- [ ] Create js/game.js as main entry point
- [ ] Create css/styles.css with basic reset
- [ ] Update README.md with local run instructions

**Exit Criteria for Moving Items to DONE.md:**
- package.json exists with "type": "module" and "test" script.
- index.html loads in browser with visible placeholders.
- js/game.js and css/styles.css files created and linked.
- README.md includes command to open index.html locally.
- All TODO items checked and verified.

### Phase 2: Core Game Logic Implementation

**Goal:** Implement board generation, mine placement, solvability validation, and reveal logic.

**Scope:** Build the game board data structures, mine placement algorithm ensuring first-click safety and solvability, and tile reveal mechanics including flood fill.

**Expected Files to Change:**
- js/board.js (new file for board logic)
- js/game.js (integrate board creation)
- js/solver.js (new file for solvability check)

**Dependencies:** Completion of Phase 1.

**Risks:** Medium risk; solvability algorithm could be complex and error-prone if not validated properly.

**Tests and Checks to Run:**
- Manual unit tests: Generate boards and verify mine counts, first-click safety, and basic reveal logic
- `npm test` (run any added tests)
- Manual check: Console log board state for various difficulties

**Review Check Before Moving Work to DONE.md:**
- Code review: Logic correctness for mine placement and reveal.
- Requirement traceability: Matches REQUIREMENTS.md core gameplay rules.
- Regression risk: None yet.
- Documentation: Inline comments for complex logic.
- Scope creep: No UI or advanced features.
- TODO refresh: All logic items completed.

**Exact TODO.md Entries to Refresh from This Phase:**
- [ ] Implement board data structure (2D array with tile properties)
- [ ] Create mine placement algorithm with first-click exclusion
- [ ] Implement solvability validation via constraint simulation
- [ ] Add tile reveal logic with flood fill for zeros
- [ ] Add basic win/loss detection

**Exit Criteria for Moving Items to DONE.md:**
- Board generates correctly for all difficulties with correct mine counts.
- First click always reveals zero and opens region.
- Solvability check regenerates invalid boards.
- Reveal logic works for single tiles and flood fill.
- Win/loss conditions detected accurately.
- All TODO items checked and manually verified.

### Phase 3: Basic UI Rendering and Grid Display

**Goal:** Render the game grid visually with tile states and top bar.

**Scope:** Create DOM elements for the grid, implement tile rendering (hidden, revealed, numbers), and add top bar with mine counter, restart button, and timer placeholder.

**Expected Files to Change:**
- js/ui.js (new file for UI rendering)
- css/styles.css (add grid and tile styles)
- index.html (add top bar elements)
- js/game.js (integrate UI rendering)

**Dependencies:** Completion of Phase 2.

**Risks:** Low risk; standard DOM manipulation and CSS styling.

**Tests and Checks to Run:**
- Manual check: Grid renders correctly for different sizes
- Visual check: Tiles show proper states (hidden, revealed)
- Browser dev tools: No console errors on load

**Review Check Before Moving Work to DONE.md:**
- Code review: Clean DOM manipulation code.
- Requirement traceability: Matches REQUIREMENTS.md UI layout and visual style.
- Regression risk: None.
- Documentation: CSS comments for styling choices.
- Scope creep: No interactions yet.
- TODO refresh: All rendering items completed.

**Exact TODO.md Entries to Refresh from This Phase:**
- [ ] Create DOM grid rendering function
- [ ] Style tiles with raised/inset borders and colors
- [ ] Add top bar with mine counter and restart button
- [ ] Implement timer display placeholder
- [ ] Integrate UI with board state

**Exit Criteria for Moving Items to DONE.md:**
- Grid displays correctly sized for all difficulties.
- Tiles visually distinguish hidden/revealed states.
- Top bar elements present and styled.
- No layout breaks on standard desktop window.
- All TODO items checked and visually verified.

### Phase 4: Game Interactions and State Management

**Goal:** Enable player interactions and manage game state transitions.

**Scope:** Implement click handlers for reveal and flag, chord functionality, game state updates, and endgame handling with mine reveals.

**Expected Files to Change:**
- js/interactions.js (new file for event handlers)
- js/game.js (add state management)
- css/styles.css (add hover and flag styles)

**Dependencies:** Completion of Phase 3.

**Risks:** Medium risk; event handling could introduce race conditions or invalid state transitions.

**Tests and Checks to Run:**
- Manual interaction tests: Click tiles, flag, chord, verify state updates
- Edge case tests: Rapid clicking, invalid actions
- Manual check: Win/loss screens display correctly

**Review Check Before Moving Work to DONE.md:**
- Code review: Event handling and state logic correctness.
- Requirement traceability: Matches REQUIREMENTS.md controls and game state.
- Regression risk: UI rendering still works.
- Documentation: Comments on state transitions.
- Scope creep: No advanced features.
- TODO refresh: All interaction items completed.

**Exact TODO.md Entries to Refresh from This Phase:**
- [ ] Add left-click reveal handler
- [ ] Add right-click flag toggle
- [ ] Implement chord reveal logic
- [ ] Update game state on actions (win/loss)
- [ ] Handle endgame display (show mines, highlight errors)

**Exit Criteria for Moving Items to DONE.md:**
- Left-click reveals tiles correctly with flood fill.
- Right-click toggles flags visually.
- Chord works when flags match number.
- Win/loss detected and board frozen with mines shown.
- No crashes on rapid or invalid inputs.
- All TODO items checked and interactively verified.

### Phase 5: Advanced Features and Polish

**Goal:** Add timer, scoring, local storage, and final polish.

**Scope:** Implement timer start/stop, best time tracking with local storage, restart functionality, and minor UI refinements.

**Expected Files to Change:**
- js/timer.js (new file for timer logic)
- js/storage.js (new file for local storage)
- css/styles.css (final styling touches)
- js/game.js (integrate features)

**Dependencies:** Completion of Phase 4.

**Risks:** Low risk; standard browser APIs for storage and timing.

**Tests and Checks to Run:**
- Manual tests: Timer starts/stops correctly, scores save/load
- Browser refresh test: Scores persist
- Accessibility check: Keyboard restart works

**Review Check Before Moving Work to DONE.md:**
- Code review: Clean integration of features.
- Requirement traceability: Matches REQUIREMENTS.md progression and storage.
- Regression risk: Core gameplay intact.
- Documentation: No additional docs needed.
- Scope creep: Stick to specified features.
- TODO refresh: All feature items completed.

**Exact TODO.md Entries to Refresh from This Phase:**
- [ ] Implement timer start on first click, stop on end
- [ ] Add best time storage and display
- [ ] Implement restart button functionality
- [ ] Add keyboard shortcut for restart
- [ ] Final UI polish (colors, spacing)

**Exit Criteria for Moving Items to DONE.md:**
- Timer displays seconds accurately.
- Best times save and load from local storage.
- Restart resets game cleanly.
- Keyboard 'R' restarts game.
- Visual polish matches retro aesthetic.
- All TODO items checked and verified.

### Phase 6: Testing and Stabilization

**Goal:** Comprehensive testing and bug fixes for release readiness.

**Scope:** Run full manual test suite, fix any discovered issues, and ensure all requirements are met.

**Expected Files to Change:**
- Any files with bugs discovered
- test/test.js (if unit tests added)

**Dependencies:** Completion of Phase 5.

**Risks:** Low risk; final validation phase.

**Tests and Checks to Run:**
- Full gameplay test: Play through all difficulties, verify solvability
- Edge case tests: First click, rapid actions, resize
- Browser compatibility: Test in Chrome, Firefox, Edge
- Performance check: Expert grid loads instantly

**Review Check Before Moving Work to DONE.md:**
- Code review: Final code quality check.
- Requirement traceability: All REQUIREMENTS.md met.
- Regression risk: Full retest of previous phases.
- Documentation: README.md complete.
- Scope creep: None.
- TODO refresh: All stabilization items completed.

**Exact TODO.md Entries to Refresh from This Phase:**
- [ ] Test all difficulties for solvability and first-click guarantee
- [ ] Verify win/loss conditions and endgame display
- [ ] Test interactions: reveal, flag, chord, restart
- [ ] Check local storage and timer accuracy
- [ ] Fix any discovered bugs

**Exit Criteria for Moving Items to DONE.md:**
- All difficulties playable with guaranteed solvability.
- No crashes or invalid states in testing.
- Requirements fully implemented.
- Game runs smoothly in target browsers.
- All TODO items checked and issues resolved.

## Dependency Notes

- Phases are strictly sequential due to dependencies on core logic before UI and interactions before features.
- No parallel work identified as all components build on the previous phase's deliverables.
- Phase 2 depends on Phase 1 for file structure; all others depend on the prior phase's completion.

## Review Policy

Phases are sized for weekly review cycles, with each phase deliverable in 1-2 days of focused work. If a phase exceeds this scope during planning, it must be split before implementation begins. Oversized phases are not allowed to proceed unchanged; split them into smaller, reviewable chunks.

## Definition of Done for the Plan

The project is complete when all phases are finished, all REQUIREMENTS.md specifications are implemented and tested, the game runs locally without errors, and documentation (README.md) provides clear setup and play instructions. No deployment is required beyond local static hosting.

## Open Questions

- Exact solvability algorithm implementation details: Is a full constraint solver needed, or can a simpler rule-based simulation suffice?
- Browser compatibility specifics: Any known issues with ES modules in older modern browsers? (Non-blocking, can test during Phase 6)