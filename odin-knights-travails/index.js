import './index.css';
import { createElement } from './helpers/createElement';
import { knightMoves } from './knight-moves';

// Create page's head (title)
const head = createElement('h1', 'head', 'Odin Knights Travails');

// Create instructions paragraph
const instructions = createElement(
  'p',
  'instructions',
  'Click on any square and the Knight should move to it through one of the shortest possible routes.',
);

// Create the knight shape
const knight = createElement('div', 'knight');
knight.append(createElement('div', 'knight-shape'));

// Prepare a placeholder to hold Knight's current place
const knightPlace = [0, 0];

// Prepare a placeholder to hold the moves (steps)
const moves = [];

// Create the chess board
const chessBoard = createElement('div', 'chess-board');
for (let i = 0; i < 8; i++) {
  const row = createElement('div', 'row');
  for (let j = 0; j < 8; j++) {
    const square = createElement('div', 'square');
    row.append(square);
    // On click
    square.addEventListener('click', () => {
      // Remove highlight from all highlighted squares, if any!
      moves.forEach(([x, y], index) => {
        if (index !== moves.length - 1) {
          const move = chessBoard.children.item(x).children.item(y);
          move.classList.remove('highlight');
          move.querySelector('.step-count')?.remove();
        }
      });
      // Remove all old moves
      moves.splice(0);
      // Get new moves
      moves.push(...knightMoves(knightPlace, [i, j]));
      // Highlight all squares we moves on, except the last move
      moves.forEach(([x, y], index) => {
        if (index !== moves.length - 1) {
          const move = chessBoard.children.item(x).children.item(y);
          move.classList.add('highlight');
          move.append(createElement('div', 'step-count', String(index)));
        }
      });
      // Set Knight's current place to the last move place
      [knightPlace[0], knightPlace[1]] = moves.at(-1);
      // Move the Knight to its new place
      chessBoard.children
        .item(knightPlace[0])
        .children.item(knightPlace[1])
        .append(knight);
    });
  }
  chessBoard.append(row);
}

// Place the Knight on the default place
chessBoard.children
  .item(knightPlace[0])
  .children.item(knightPlace[1])
  .append(knight);

// Append all components to body
document.body.append(head, instructions, chessBoard);
