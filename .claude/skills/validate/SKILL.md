---
name: validate
description: Full project validation for the Snake game — runs all 28 tests with coverage and checks required files exist
allowed-tools: Bash(npm test*) Bash(node -e*)
---

Run full project validation in two steps.

**Step 1 — Tests with coverage:**
```bash
cd e:/claude_code && npm test -- --coverage 2>&1
```

**Step 2 — Verify required files:**
```bash
for f in snake_game/index.html snake_game/styles.css snake_game/src/main.js snake_game/src/gameState.js snake_game/src/gameEngine.js snake_game/src/render.js snake_game/src/controls.js snake_game/tests/gameState.test.js snake_game/tests/gameEngine.test.js; do
  [ -f "e:/claude_code/$f" ] && echo "OK  $f" || echo "MISSING  $f"
done
```

Summarize: total tests passed/failed, coverage percentages, and whether all required files are present. Flag anything missing or failing.
