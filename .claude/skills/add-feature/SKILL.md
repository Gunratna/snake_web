---
name: add-feature
description: Guided workflow for adding a new feature to the Snake game. Argument is the feature description.
argument-hint: "<feature description>"
allowed-tools: Bash(npm test*) Read Glob
---

Feature to add: **$ARGUMENTS**

Follow this process exactly:

## 1. Identify affected modules

Check which files need changes based on the feature:
- `snake_game/src/gameState.js` — state data, snake/food/score properties
- `snake_game/src/gameEngine.js` — game logic, input handling, tick behavior
- `snake_game/src/render.js` — anything that needs to be drawn on the canvas
- `snake_game/src/controls.js` — new key bindings or input mappings
- `snake_game/src/main.js` — game loop timing or initialization changes

## 2. Write tests first

Add new test cases to the relevant file in `snake_game/tests/` before implementing. Tests should cover:
- The happy path (feature works correctly)
- Edge cases (boundaries, invalid input, empty state)

## 3. Implement

Make the minimal changes needed across the identified files. Keep rendering separate from logic — `gameState.js` and `gameEngine.js` must remain testable without a DOM.

## 4. Verify

```bash
cd e:/claude_code && npm test
```

All 28 original tests plus new tests must pass. If any fail, fix before proceeding.

## 5. Update CLAUDE.md

If the feature adds new key bindings, changes game rules, or modifies the grid — update the relevant section in `CLAUDE.md`.
