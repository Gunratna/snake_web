class Renderer {
  constructor(canvasId, cellSize = 20) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.cellSize = cellSize;
    this.gridWidth = this.canvas.width / cellSize;
    this.gridHeight = this.canvas.height / cellSize;
  }

  render(gameState) {
    this.ctx.fillStyle = '#1a1a1a';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawGrid();
    this.drawFood(gameState.food);
    this.drawSnake(gameState.snake);
    this.drawUI(gameState);
  }

  drawGrid() {
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 1;

    for (let i = 0; i <= this.gridWidth; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.cellSize, 0);
      this.ctx.lineTo(i * this.cellSize, this.canvas.height);
      this.ctx.stroke();
    }

    for (let i = 0; i <= this.gridHeight; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.cellSize);
      this.ctx.lineTo(this.canvas.width, i * this.cellSize);
      this.ctx.stroke();
    }
  }

  drawSnake(snake) {
    snake.forEach((segment, index) => {
      if (index === 0) {
        this.ctx.fillStyle = '#00ff00';
      } else {
        this.ctx.fillStyle = '#00cc00';
      }
      this.ctx.fillRect(
        segment.x * this.cellSize + 1,
        segment.y * this.cellSize + 1,
        this.cellSize - 2,
        this.cellSize - 2
      );
    });
  }

  drawFood(food) {
    this.ctx.fillStyle = '#ff3333';
    this.ctx.fillRect(
      food.x * this.cellSize + 2,
      food.y * this.cellSize + 2,
      this.cellSize - 4,
      this.cellSize - 4
    );
  }

  drawUI(gameState) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, 90, 24);
    this.ctx.fillStyle = '#00ff00';
    this.ctx.font = 'bold 14px monospace';
    this.ctx.fillText(`Score: ${gameState.score}`, 8, 16);

    if (gameState.isPaused) {
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      this.ctx.font = 'bold 24px Arial';
      const text = 'PAUSED';
      const textMetrics = this.ctx.measureText(text);
      const x = (this.canvas.width - textMetrics.width) / 2;
      const y = this.canvas.height / 2;
      this.ctx.fillText(text, x, y);
    }

    if (gameState.isGameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = '#ff3333';
      this.ctx.font = 'bold 32px Arial';
      const gameOverText = 'GAME OVER';
      const gameOverMetrics = this.ctx.measureText(gameOverText);
      const gameOverX = (this.canvas.width - gameOverMetrics.width) / 2;
      this.ctx.fillText(gameOverText, gameOverX, this.canvas.height / 2 - 20);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.font = '16px Arial';
      const finalScoreText = `Final Score: ${gameState.score}`;
      const finalScoreMetrics = this.ctx.measureText(finalScoreText);
      const finalScoreX = (this.canvas.width - finalScoreMetrics.width) / 2;
      this.ctx.fillText(finalScoreText, finalScoreX, this.canvas.height / 2 + 10);

      this.ctx.fillStyle = '#ffff00';
      this.ctx.font = '14px Arial';
      const restartText = 'Press R to Restart';
      const restartMetrics = this.ctx.measureText(restartText);
      const restartX = (this.canvas.width - restartMetrics.width) / 2;
      this.ctx.fillText(restartText, restartX, this.canvas.height / 2 + 40);
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Renderer;
}
