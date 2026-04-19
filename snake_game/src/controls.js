class Controls {
  constructor(gameEngine) {
    this.gameEngine = gameEngine;
    this.setupKeyboardListeners();
  }

  setupKeyboardListeners() {
    document.addEventListener('keydown', (e) => {
      const keyMap = {
        'ArrowUp': 'ArrowUp',
        'ArrowDown': 'ArrowDown',
        'ArrowLeft': 'ArrowLeft',
        'ArrowRight': 'ArrowRight',
        'w': 'w',
        'W': 'w',
        'a': 'a',
        'A': 'a',
        's': 's',
        'S': 's',
        'd': 'd',
        'D': 'd',
        ' ': ' ',
        'r': 'r',
        'R': 'r'
      };

      const mappedKey = keyMap[e.key];
      if (mappedKey) {
        e.preventDefault();
        this.gameEngine.handleInput(mappedKey);
      }
    });
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Controls;
}
