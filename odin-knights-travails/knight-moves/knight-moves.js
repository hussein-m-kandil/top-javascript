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
    if (possibleX >= 0 && possibleX <= 7 && possibleY >= 0 && possibleY <= 7)
      destinations.push([possibleX, possibleY]);
  });
  return destinations;
}

function createChessBoardGraph() {
  const chessBoard = [];
  for (let i = 0; i <= 7; i++) {
    chessBoard[i] = [];
    for (let j = 0; j <= 7; j++) {
      chessBoard[i][j] = getKnightPossibleMoves([i, j]);
    }
  }
  return chessBoard;
}

export default function knightMoves(from, to) {
  if (
    arguments.length !== 2 ||
    !Array.isArray(from) ||
    !Array.isArray(to) ||
    from.length !== 2 ||
    to.length !== 2 ||
    !from.every((n) => Number.isInteger(n) && n >= 0 && n <= 7) ||
    !to.every((n) => Number.isInteger(n) && n >= 0 && n <= 7)
  ) {
    throw TypeError(
      `Expect 2 arguments each of which is a pair of numbers! given (${Array.from(arguments).join(', ')})`,
    );
  }

  const chessBoard = createChessBoardGraph();

  let shortestPath = [];
  let possibleMoves = [from];
  const q = [[shortestPath, possibleMoves]];

  // While current possible moves does not include out destination
  while (possibleMoves.every(([x, y]) => !(x === to[0] && y === to[1]))) {
    const [path, moves] = q.shift();
    // Enqueue copies of the current path each of which ends on one of the current possible moves
    moves.forEach(([x, y]) => {
      q.push([[...path, [x, y]], chessBoard[x][y]]);
    });
    shortestPath = q[0][0];
    possibleMoves = q[0][1];
  }

  shortestPath.push(to);

  return shortestPath;
}

export { knightMoves };
