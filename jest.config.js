module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  collectCoverageFrom: ['snake_game/src/**/*.js'],
  coveragePathIgnorePatterns: ['/node_modules/']
};
