class GameState {
  constructor(gridWidth = 20, gridHeight = 20) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
    this.reset();
  }

  reset() {
    this.snake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 }
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.food = { x: 15, y: 15 };
    this.score = 0;
    this.isGameOver = false;
    this.isPaused = false;
  }

  setNextDirection(dx, dy) {
    const head = this.snake[0];
    const current = this.direction;

    // Prevent reversing into itself
    if ((dx === -current.x && dy === -current.y) || (dx === current.x && dy === current.y)) {
      return;
    }

    this.nextDirection = { x: dx, y: dy };
  }

  moveSnake() {
    if (this.isGameOver || this.isPaused) return;

    this.direction = this.nextDirection;
    const head = this.snake[0];
    const newHead = {
      x: (head.x + this.direction.x + this.gridWidth) % this.gridWidth,
      y: (head.y + this.direction.y + this.gridHeight) % this.gridHeight
    };

    // Check self collision
    if (this.checkSelfCollision(newHead)) {
      this.isGameOver = true;
      return;
    }

    this.snake.unshift(newHead);

    // Check food collision
    if (newHead.x === this.food.x && newHead.y === this.food.y) {
      this.score += 10;
      this.spawnFood();
    } else {
      this.snake.pop();
    }
  }

  checkSelfCollision(head) {
    return this.snake.some(segment => segment.x === head.x && segment.y === head.y);
  }

  spawnFood() {
    let newFood;
    let isOnSnake;

    do {
      newFood = {
        x: Math.floor(Math.random() * this.gridWidth),
        y: Math.floor(Math.random() * this.gridHeight)
      };
      isOnSnake = this.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    } while (isOnSnake);

    this.food = newFood;
  }

  togglePause() {
    if (!this.isGameOver) {
      this.isPaused = !this.isPaused;
    }
  }

  getGameState() {
    return {
      snake: JSON.parse(JSON.stringify(this.snake)),
      food: { ...this.food },
      score: this.score,
      isGameOver: this.isGameOver,
      isPaused: this.isPaused,
      direction: { ...this.direction }
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameState;
}
