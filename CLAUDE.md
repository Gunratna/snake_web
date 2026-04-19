# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Classic Snake game implementation as a web-based interactive application. The game includes core mechanics (movement, growth, collision detection) with testable game logic and a minimal UI.

## Stack

- **Frontend Framework**: HTML5 Canvas + Vanilla JavaScript (minimal dependencies)
- **Test Runner**: Jest (if tests are added)
- **Package Manager**: npm

## Commands

### Setup & Development
```bash
npm install                    # Install dependencies
npm run dev                    # Start dev server (if applicable)
npm run build                  # Build for production (if applicable)
```

### Testing
```bash
npm test                       # Run all tests
npm test -- --watch          # Run tests in watch mode
npm test -- game.test.js      # Run specific test file
```

### Linting & Format
```bash
npm run lint                   # Run linter (if configured)
npm run format                 # Format code (if configured)
```

## Architecture

### Game State
The core game logic is separated from rendering:
- **gameState.js**: Maintains snake position, direction, food location, score
- **gameEngine.js**: Pure functions for game logic (move, checkCollision, spawnFood)
- **render.js**: Canvas rendering of grid, snake, food, UI elements
- **controls.js**: Keyboard/touch input handling

### Flow
1. User input updates direction (queued to handle simultaneous presses)
2. Game tick: validate direction → move snake → check collisions → spawn food if eaten
3. Render: draw grid → draw food → draw snake → update score display
4. Collision handling: walls (game over) or self (game over)

## File Structure

```
snake_game/
├── index.html          # Entry point with canvas element
├── src/
│   ├── gameState.js    # Game state management
│   ├── gameEngine.js   # Core game logic (pure functions)
│   ├── render.js       # Canvas rendering
│   ├── controls.js     # Input handling
│   └── main.js         # Game loop & initialization
├── tests/
│   ├── gameEngine.test.js
│   └── gameState.test.js
├── styles.css          # Minimal game styling
└── package.json
```

## Key Implementation Details

- **Grid-based**: 20x20 grid, each cell is 20px
- **Game Tick**: 10 updates per second (100ms interval)
- **Input Buffering**: Direction changes are queued to handle rapid key presses smoothly
- **Food Placement**: Random position on empty grid cells
- **Score**: +10 per food eaten

## Running the Game

1. `npm install` to set up dependencies
2. Open `index.html` in a browser or run via dev server
3. Use **Arrow Keys** or **WASD** to control snake
4. Press **Space** to pause/resume (if implemented)
5. Press **R** to restart after game over

## Testing Checklist (Manual)

- [ ] Snake moves in correct direction (all 4 directions)
- [ ] Snake grows when eating food
- [ ] Food appears randomly on grid
- [ ] Game ends when snake hits wall
- [ ] Game ends when snake eats itself
- [ ] Score updates correctly
- [ ] Can restart after game over
- [ ] Keyboard controls responsive (no input lag)
- [ ] Works on desktop browsers (Chrome, Firefox, Safari)
