const GameState = require('../src/gameState.js');

describe('GameState', () => {
  let gameState;

  beforeEach(() => {
    gameState = new GameState(20, 20);
  });

  test('initializes with snake in center', () => {
    const state = gameState.getGameState();
    expect(state.snake.length).toBe(3);
    expect(state.snake[0]).toEqual({ x: 10, y: 10 });
  });

  test('initializes with score 0', () => {
    const state = gameState.getGameState();
    expect(state.score).toBe(0);
  });

  test('initializes not paused and not game over', () => {
    const state = gameState.getGameState();
    expect(state.isPaused).toBe(false);
    expect(state.isGameOver).toBe(false);
  });

  test('moves snake in correct direction', () => {
    gameState.moveSnake();
    const state = gameState.getGameState();
    expect(state.snake[0]).toEqual({ x: 11, y: 10 });
  });

  test('prevents snake from reversing into itself', () => {
    gameState.setNextDirection(1, 0); // right
    gameState.moveSnake();
    gameState.setNextDirection(-1, 0); // try to go left
    gameState.moveSnake();
    const state = gameState.getGameState();
    expect(state.snake[0].x).toBe(12);
  });

  test('detects self collision', () => {
    // Create a longer snake that can collide with itself
    gameState.snake = [
      { x: 10, y: 10 }, // head
      { x: 9, y: 10 },
      { x: 8, y: 10 },
      { x: 8, y: 11 },
      { x: 8, y: 12 }
    ];
    gameState.direction = { x: 0, y: -1 }; // moving up
    gameState.moveSnake(); // head moves to (10, 9)

    // Now we move to collide with body
    gameState.setNextDirection(1, 0); // go right
    gameState.moveSnake(); // head at (11, 9)
    gameState.setNextDirection(0, 1); // go down
    gameState.moveSnake(); // head at (11, 10)
    gameState.setNextDirection(-1, 0); // go left
    gameState.moveSnake(); // head at (10, 10)
    gameState.setNextDirection(0, -1); // go up
    gameState.moveSnake(); // head at (10, 9) - collides!

    expect(gameState.isGameOver).toBe(true);
  });

  test('grows snake when eating food', () => {
    gameState.food = { x: 11, y: 10 };
    const initialLength = gameState.snake.length;
    gameState.moveSnake();
    expect(gameState.snake.length).toBe(initialLength + 1);
  });

  test('increases score when eating food', () => {
    gameState.food = { x: 11, y: 10 };
    gameState.moveSnake();
    expect(gameState.score).toBe(10);
  });

  test('spawns new food after eating', () => {
    const oldFood = gameState.food;
    gameState.food = { x: 11, y: 10 };
    gameState.moveSnake();
    expect(gameState.food).not.toEqual(oldFood);
  });

  test('wraps around grid boundaries', () => {
    gameState.snake = [{ x: 19, y: 10 }];
    gameState.direction = { x: 1, y: 0 };
    gameState.moveSnake();
    expect(gameState.snake[0].x).toBe(0);
  });

  test('toggles pause state', () => {
    expect(gameState.isPaused).toBe(false);
    gameState.togglePause();
    expect(gameState.isPaused).toBe(true);
    gameState.togglePause();
    expect(gameState.isPaused).toBe(false);
  });

  test('cannot pause when game is over', () => {
    gameState.isGameOver = true;
    gameState.togglePause();
    expect(gameState.isPaused).toBe(false);
  });

  test('resets game state', () => {
    gameState.score = 100;
    gameState.isGameOver = true;
    gameState.reset();
    const state = gameState.getGameState();
    expect(state.score).toBe(0);
    expect(state.isGameOver).toBe(false);
    expect(state.snake.length).toBe(3);
  });

  test('food is never spawned on snake', () => {
    for (let i = 0; i < 10; i++) {
      gameState.spawnFood();
      const foodOnSnake = gameState.snake.some(
        segment => segment.x === gameState.food.x && segment.y === gameState.food.y
      );
      expect(foodOnSnake).toBe(false);
    }
  });
});
