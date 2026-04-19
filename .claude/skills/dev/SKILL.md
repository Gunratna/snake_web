---
name: dev
description: Start the Snake game development server and open it in the browser at http://localhost:8000
argument-hint: "[port]"
allowed-tools: Bash(npx http-server*)
---

Start the Snake game dev server.

Run:
```bash
npx http-server snake_game -p ${1:-8000} -o
```

Tell the user the game is running at `http://localhost:8000` and remind them:
- Arrow Keys or WASD to move
- Space to pause/resume
- R to restart after game over
