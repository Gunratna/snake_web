---
name: test-watch
description: Run the Snake game Jest test suite in interactive watch mode, re-running on every file change
allowed-tools: Bash(npm run test:watch*)
---

Run tests in watch mode:

```bash
cd e:/claude_code && npm run test:watch
```

Tests re-run automatically whenever any source file under `snake_game/src/` or `snake_game/tests/` changes. Press `q` in the terminal to quit watch mode.
