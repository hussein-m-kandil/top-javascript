/**
 * Creates a 2D Array of empty objects
 * @returns {Object[][]}
 */
export default function createGameBoardMatrix() {
  const boardMatrix = [];

  for (let i = 0; i < 10; i++) {
    boardMatrix[i] = [];
    for (let j = 0; j < 10; j++) {
      boardMatrix[i][j] = {};
    }
  }

  return boardMatrix;
}

export { createGameBoardMatrix };
