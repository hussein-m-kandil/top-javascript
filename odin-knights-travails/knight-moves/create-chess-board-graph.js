function getKnightPossibleMoves([currentX, currentY]) {
  const destinations = [];
  const modifiers = [
    [1, 2],
    [2, 1],
    [-1, 2],
    [-2, 1],
    [-1, -2],
    [-2, -1],
    [1, -2],
    [2, -1],
  ];
  modifiers.forEach(([xMod, yMod]) => {
    const possibleX = currentX + xMod;
    const possibleY = currentY + yMod;
    if (possibleX >= 0 && possibleX < 8 && possibleY >= 0 && possibleY < 8)
      destinations.push([possibleX, possibleY]);
  });
  return destinations;
}

export default function createChessBoardGraph() {
  const chessBoard = [];
  for (let i = 0; i < 8; i++) {
    chessBoard[i] = [];
    for (let j = 0; j < 8; j++) {
      chessBoard[i][j] = getKnightPossibleMoves([i, j]);
    }
  }
  return chessBoard;
}

export { createChessBoardGraph };
