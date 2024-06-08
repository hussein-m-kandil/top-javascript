import './index.css';

import { createElement } from '../../helpers/createElement';

export default function Board(playerGameBoard) {
  const board = createElement('div', 'board-container');

  let boardWidth = 0;

  playerGameBoard.board.forEach((row, i) => {
    boardWidth = row.length;
    row.forEach((cell, j) => {
      let className = 'board-cell';
      className += cell.ship ? ' ship' : '';
      className += cell.attacked ? ' attacked' : '';
      className += cell.missed ? ' missed' : '';
      const boardCell = createElement('div', className);
      boardCell.addEventListener('click', () => {
        playerGameBoard.receiveAttack([i, j]);
      });
      board.appendChild(boardCell);
    });
  });

  // Grid styles
  board.style.display = 'grid';
  board.style.gridTemplateColumns = `repeat(${boardWidth}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${boardWidth}, auto)`;

  return board;
}

export { Board };
