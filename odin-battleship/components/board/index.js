import './index.css';

import { createElement } from '../../helpers/create-element';
import { GameBoard } from '../../game-board';
import { gameEvents } from '../../game-events';

/**
 * Creates a player's board UI component
 * @param {GameBoard} playerGameBoard - An instance of 'GameBoard'
 * @param {boolean} hidden - Hidden player's ships indicator
 * @param {boolean} disabled - If true, the returned board' UI will look disabled
 * @param {boolean} clickable - If true, the returned board won't listen to 'click' events
 * @returns {HTMLDivElement}
 */
export default function Board(playerGameBoard, hidden, disabled, clickable) {
  [playerGameBoard, hidden, disabled].forEach((arg) => {
    if (arg === undefined) {
      throw TypeError("'Board' is called with an invalid number of arguments!");
    }
  });

  if (!(playerGameBoard instanceof GameBoard)) {
    throw TypeError(
      `'Board' is called with invalid 'playerGameBoard'! Given '${playerGameBoard}'.`,
    );
  }

  if (typeof hidden !== 'boolean' || typeof disabled !== 'boolean') {
    throw TypeError(
      `'Board' expects 'hidden' & 'disabled' of type 'boolean'! Given '${hidden} & ${disabled}'.`,
    );
  }

  const board = createElement(
    'div',
    'board-container' + (disabled ? ' disabled' : ''),
  );

  let boardWidth = 0;

  playerGameBoard.board.forEach((row, i) => {
    boardWidth = row.length;
    row.forEach((cell, j) => {
      let className = 'board-cell';
      className += cell.ship && !hidden ? ' ship' : '';
      className += cell.attacked ? ' attacked' : '';
      className += cell.missed ? ' missed' : '';
      const boardCell = createElement('div', className);
      if (clickable) {
        boardCell.addEventListener('click', () => {
          gameEvents.emit(gameEvents.ATTACK, [i, j]);
        });
      }
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
