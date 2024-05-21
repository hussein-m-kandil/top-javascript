import './index.css';
import { createElement } from './helpers/createElement';
import { knightMoves } from './knight-moves';

const head = createElement('h1', 'head', 'Odin Knights Travails');

const instructions = createElement(
  'p',
  'instructions',
  'Click on any square and the Knight should move to it through one of the shortest possible routes.',
);

const chessBoard = createElement('div', 'chess-board');
for (let i = 0; i < 8; i++) {
  const row = createElement('div', 'row');
  for (let j = 0; j < 8; j++) {
    const square = createElement('div', 'square');
    row.append(square);
  }
  chessBoard.append(row);
}

document.body.append(head, instructions, chessBoard);
