import './index.css';

import { createElement } from '../../helpers/createElement';

export default function Board(playerGameBoard) {
  const board = createElement('div', 'board-container');

  let boardWidth = 0;

  playerGameBoard.board.forEach((row) => {
    boardWidth = row.length;
    row.forEach((cell) => {
      let className = 'board-cell';
      className += cell.ship ? ' ship' : '';
      className += cell.attacked ? ' attacked' : '';
      className += cell.missed ? ' missed' : '';
      board.appendChild(createElement('div', className));
    });
  });

  // Grid styles
  board.style.display = 'grid';
  board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${boardWidth}, auto)`;

  return board;
}

export { Board };
