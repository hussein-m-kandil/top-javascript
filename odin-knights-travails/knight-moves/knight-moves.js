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

  if (from[0] === to[0] && from[1] === to[1]) return [from];

  const chessBoard = [];
  for (let i = 0; i <= 7; i++) {
    chessBoard[i] = [];
    for (let j = 0; j <= 7; j++) {
      chessBoard[i][j] = getKnightPossibleMoves([i, j]);
    }
  }

  let paths = [[from]];

  const q = [[from, chessBoard[from[0]][from[1]]]];

  while (q.length !== 0) {
    const [currentPlace, possibleMoves] = q.shift();
    // If possible moves DOES NOT our destination
    if (possibleMoves.every(([x, y]) => !(x === to[0] && y === to[1]))) {
      const newPaths = [];
      paths.forEach((path) => {
        // Check wether this path ends on the current place (the parent of this possible moves)
        if (path.at(-1) === currentPlace) {
          // Create a new path to every possible move from the current path
          for (let j = 0; j < possibleMoves.length; j++) {
            const newMove = possibleMoves[j];
            // But only if the new possible move is not already in the current path
            if (!path.includes(newMove)) {
              newPaths.push([...path, newMove]);
              q.push([newMove, chessBoard[newMove[0]][newMove[1]]]);
            }
          }
        } else {
          newPaths.push(path);
        }
      });
      paths = newPaths;
    } else {
      const shortestPath = paths.find((path) => path.at(-1) === currentPlace);
      shortestPath?.push(to);
      return shortestPath ?? [from];
    }
  }

  return paths.length > 0
    ? paths.reduce((prev, cur) => {
        return cur.length < prev.length ? cur : prev;
      }, paths[0])
    : [from];
}

export { knightMoves };
