const GameState = require('../src/gameState.js');
const GameEngine = require('../src/gameEngine.js');

describe('GameEngine', () => {
  let gameState;
  let gameEngine;

  beforeEach(() => {
    gameState = new GameState(20, 20);
    gameEngine = new GameEngine(gameState);
  });

  test('initializes with game state', () => {
    expect(gameEngine.gameState).toBe(gameState);
  });

  test('advances game with tick', () => {
    const initialX = gameState.snake[0].x;
    gameEngine.tick();
    expect(gameState.snake[0].x).toBe(initialX + 1);
  });

  test('handles arrow key input up', () => {
    gameEngine.handleInput('ArrowUp');
    gameEngine.tick();
    expect(gameState.direction).toEqual({ x: 0, y: -1 });
  });

  test('handles arrow key input down', () => {
    gameEngine.handleInput('ArrowDown');
    gameEngine.tick();
    expect(gameState.direction).toEqual({ x: 0, y: 1 });
  });

  test('handles arrow key input left', () => {
    // First move up to change direction, then try left
    gameEngine.handleInput('ArrowUp');
    gameEngine.tick();
    gameEngine.handleInput('ArrowLeft');
    gameEngine.tick();
    expect(gameState.direction).toEqual({ x: -1, y: 0 });
  });

  test('handles arrow key input right', () => {
    gameEngine.handleInput('ArrowRight');
    gameEngine.tick();
    expect(gameState.direction).toEqual({ x: 1, y: 0 });
  });

  test('handles WASD input', () => {
    gameEngine.handleInput('w');
    gameEngine.tick();
    expect(gameState.direction).toEqual({ x: 0, y: -1 });

    gameState = new GameState(20, 20);
    gameEngine = new GameEngine(gameState);
    gameEngine.handleInput('s');
    gameEngine.tick();
    expect(gameState.direction).toEqual({ x: 0, y: 1 });
  });

  test('handles pause input', () => {
    gameEngine.handleInput(' ');
    expect(gameState.isPaused).toBe(true);
    gameEngine.handleInput(' ');
    expect(gameState.isPaused).toBe(false);
  });

  test('handles restart input when game over', () => {
    gameState.isGameOver = true;
    const initialScore = gameState.score;
    gameState.score = 100;
    gameEngine.handleInput('r');
    expect(gameState.score).toBe(0);
    expect(gameState.isGameOver).toBe(false);
  });

  test('ignores restart input when game not over', () => {
    gameState.score = 100;
    gameEngine.handleInput('r');
    expect(gameState.score).toBe(100);
  });

  test('getGameState returns current state', () => {
    const state = gameEngine.getGameState();
    expect(state.snake).toBeDefined();
    expect(state.food).toBeDefined();
    expect(state.score).toBeDefined();
    expect(state.isGameOver).toBe(false);
  });

  test('reset clears game state', () => {
    gameState.score = 100;
    gameState.isGameOver = true;
    gameEngine.reset();
    const state = gameEngine.getGameState();
    expect(state.score).toBe(0);
    expect(state.isGameOver).toBe(false);
  });

  test('tick count increases', () => {
    expect(gameEngine.tickCount).toBe(0);
    gameEngine.tick();
    expect(gameEngine.tickCount).toBe(1);
    gameEngine.tick();
    expect(gameEngine.tickCount).toBe(2);
  });

  test('reset resets tick count', () => {
    gameEngine.tick();
    gameEngine.tick();
    gameEngine.reset();
    expect(gameEngine.tickCount).toBe(0);
  });
});
