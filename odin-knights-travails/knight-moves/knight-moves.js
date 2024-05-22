import { createChessBoardGraph } from './create-chess-board-graph.js';

/**
 * Returns one of the shortest routes a Knight can take from the given starting place to the given destination
 * @param {[number, number]} from - Knight's starting place
 * @param {[number, number]} to - Knight's destination
 * @param {[number, number][][][]?} chessBoard
 * (Optional) Two-dim Array (8 x 8) of pairs of numbers; chess board, each square has all possible Knight's moves
 * @returns {[number, number][]} - The shortest route from the starting place to the destination
 */
export default function knightMoves(from, to, chessBoard) {
  if (
    arguments.length < 2 ||
    arguments.length > 3 ||
    !Array.isArray(from) ||
    !Array.isArray(to) ||
    from.length !== 2 ||
    to.length !== 2 ||
    !from.every((n) => Number.isInteger(n) && n >= 0 && n < 8) ||
    !to.every((n) => Number.isInteger(n) && n >= 0 && n < 8)
  ) {
    throw TypeError(
      `Expect 2 or 3 arguments; 2 pairs of numbers and optional chess board matrix! given (${Array.from(arguments).join(', ')})`,
    );
  }

  if (!chessBoard) {
    chessBoard = createChessBoardGraph();
  }

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
