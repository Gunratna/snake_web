let gameState;
let gameEngine;
let renderer;
let controls;
let gameLoopId;

const TICK_INTERVAL = 100; // 100ms = 10 ticks per second

function init() {
  gameState = new GameState(20, 20);
  gameEngine = new GameEngine(gameState);
  renderer = new Renderer('gameCanvas', 20);
  controls = new Controls(gameEngine);

  startGameLoop();
  render();
}

function startGameLoop() {
  gameLoopId = setInterval(() => {
    gameEngine.tick();
    render();
  }, TICK_INTERVAL);
}

function render() {
  const state = gameEngine.getGameState();
  renderer.render(state);
  const el = document.getElementById('scoreDisplay');
  if (el) el.textContent = `Score: ${state.score}`;
}

function stopGameLoop() {
  if (gameLoopId) {
    clearInterval(gameLoopId);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
