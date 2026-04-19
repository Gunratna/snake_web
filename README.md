# Snake Game

A classic Snake game implementation built with vanilla HTML5 Canvas and JavaScript.

## Quick Start

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```
This will start an HTTP server and open the game at `http://localhost:8000/snake_game/`

### Run Tests
```bash
npm test
```

Run tests in watch mode:
```bash
npm test:watch
```

## How to Play

### Controls
- **Arrow Keys** or **WASD** - Move the snake
- **Space** - Pause/Resume game
- **R** - Restart after game over

### Objective
- Eat food to grow your snake and increase your score
- Avoid hitting the walls or yourself
- Try to get the highest score!

## Game Rules

- The snake starts with 3 segments in the center of a 20x20 grid
- Movement happens at 10 ticks per second (100ms interval)
- Each food eaten adds 10 points to your score
- Collision with walls or yourself ends the game
- The grid wraps around at boundaries

## Architecture

The game is organized into modular components:

### Game State (`src/gameState.js`)
- Manages snake position, direction, food location, and score
- Handles collision detection
- Provides game state queries

### Game Engine (`src/gameEngine.js`)
- Processes game ticks
- Handles user input mapping
- Manages game flow (reset, pause, etc.)

### Rendering (`src/render.js`)
- Draws the game grid, snake, and food
- Displays UI elements (score, game over, pause state)
- Uses HTML5 Canvas for rendering

### Input Controls (`src/controls.js`)
- Sets up keyboard event listeners
- Delegates input to game engine

### Main Loop (`src/main.js`)
- Initializes all components
- Runs the game loop at regular intervals
- Coordinates rendering and game updates

## Testing

The project includes comprehensive unit tests for core game logic:

- **gameState.test.js**: Tests for game state management, movement, collision detection, and scoring
- **gameEngine.test.js**: Tests for input handling, game flow, and engine operations

All tests are written with Jest and can be run with `npm test`

### Test Coverage

Tests verify:
- Snake movement in all directions
- Food consumption and growth
- Collision detection (walls and self)
- Score calculation
- Pause/resume functionality
- Game restart
- Grid wrapping
- Input handling (keyboard controls)

## Project Structure

```
.
├── README.md                  # This file
├── package.json              # Project dependencies and scripts
├── jest.config.js            # Jest test configuration
├── snake_game/
│   ├── index.html           # Game entry point
│   ├── styles.css           # Game styling
│   └── src/
│       ├── main.js          # Game loop and initialization
│       ├── gameState.js     # Game state management
│       ├── gameEngine.js    # Game logic
│       ├── render.js        # Canvas rendering
│       └── controls.js      # Input handling
└── snake_game/tests/
    ├── gameState.test.js    # Game state tests
    └── gameEngine.test.js   # Game engine tests
```

## Manual Testing Checklist

- [ ] Snake moves in all 4 directions with arrow keys
- [ ] Snake moves with WASD keys
- [ ] Snake grows when eating food
- [ ] Food appears at random locations
- [ ] Food doesn't spawn on the snake
- [ ] Game ends when snake hits a wall
- [ ] Game ends when snake eats itself
- [ ] Score increases by 10 for each food
- [ ] Game can be paused with space
- [ ] Game can be resumed from pause
- [ ] Game can be restarted after game over
- [ ] Keyboard controls are responsive (no lag)
- [ ] Grid wraps around at boundaries
- [ ] Works in Chrome, Firefox, Safari
- [ ] Looks good on desktop and mobile viewports

## Dependencies

- **Jest** (dev): Testing framework
- **http-server** (dev): Simple HTTP server for development

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Requires:
- HTML5 Canvas support
- ES6 JavaScript support
