---
name: game-status
description: Show a quick status overview of the Snake game — file list, test results, and available npm scripts
allowed-tools: Bash(npm test*) Bash(node -e*)
---

Show the current project status by running:

```bash
cd e:/claude_code && npm test --silent 2>&1 | tail -4
```

Then report:
- Test suite result (N passed / N failed)
- Source files: `snake_game/src/*.js` (count)
- Test files: `snake_game/tests/*.test.js` (count)
- Available scripts: `dev`, `test`, `test:watch`
- Controls reminder: Arrow Keys / WASD · Space = pause · R = restart
