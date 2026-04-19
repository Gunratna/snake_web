class GameEngine {
  constructor(gameState) {
    this.gameState = gameState;
    this.tickCount = 0;
  }

  tick() {
    this.tickCount++;
    this.gameState.moveSnake();
  }

  reset() {
    this.gameState.reset();
    this.tickCount = 0;
  }

  handleInput(key) {
    switch (key.toLowerCase()) {
      case 'arrowup':
      case 'w':
        this.gameState.setNextDirection(0, -1);
        break;
      case 'arrowdown':
      case 's':
        this.gameState.setNextDirection(0, 1);
        break;
      case 'arrowleft':
      case 'a':
        this.gameState.setNextDirection(-1, 0);
        break;
      case 'arrowright':
      case 'd':
        this.gameState.setNextDirection(1, 0);
        break;
      case ' ':
        this.gameState.togglePause();
        break;
      case 'r':
        if (this.gameState.isGameOver) {
          this.reset();
        }
        break;
    }
  }

  getGameState() {
    return this.gameState.getGameState();
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameEngine;
}
