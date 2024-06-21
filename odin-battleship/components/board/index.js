import './index.css';

import { createElement } from '../../helpers/create-element';
import { GameBoard } from '../../game-board';
import { gameEvents } from '../../game-events';

// Save the held cell pair GLOBALLY to reach the previous value between renders
let heldCellPair = null;
let heldShipAreaIndex = -1;

/**
 * Creates a player's board UI component
 * @param {GameBoard} playerGameBoard - An instance of 'GameBoard'
 * @param {boolean} hidden - Hidden player's ships indicator
 * @param {boolean} disabled - If true, the returned board' UI will look disabled
 * @param {boolean} clickable - If true, the returned board won't listen to 'click' events
 * @returns {HTMLDivElement}
 */
export default function Board(
  playerGameBoard,
  hidden,
  disabled,
  clickable,
  movable,
) {
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

  const findShipAreaIndex = (shipCellPair) =>
    playerGameBoard.shipsAreas.findIndex((shipArea) =>
      shipArea.some((cellPair) => `${cellPair}` === `${shipCellPair}`),
    );

  playerGameBoard.board.forEach((row, i) => {
    boardWidth = row.length;
    row.forEach((cell, j) => {
      const cellShipAreaIndex = findShipAreaIndex([i, j]);
      const held =
        heldShipAreaIndex > -1 && heldShipAreaIndex === cellShipAreaIndex;
      let className = 'board-cell';
      if (cell.ship) {
        if (!hidden) className += ' ship';
        if (cell.ship.isSunk()) className += ' sunk';
        if (movable) className += ' movable';
        if (held) className += ' held';
        else if (cell.attacked) className += ' attacked';
      } else if (cell.missed) className += ' missed';
      const boardCell = createElement('div', className);
      // Click on a ship logic
      if (clickable) {
        boardCell.addEventListener('click', () => {
          gameEvents.emit(gameEvents.ATTACK, [i, j]);
        });
      }
      // Drag a ship logic
      if (movable) {
        const holdBoardCell = (event) => {
          if (event.button === 0 || event.pointerType === 'touch') {
            // Prevent default behaviors: drag & fire mouse event with pointer event
            event.preventDefault();
            heldCellPair = [i, j];
            heldShipAreaIndex = findShipAreaIndex(heldCellPair);
          }
        };
        const releaseHeldCell = () => {
          heldCellPair = null;
          heldShipAreaIndex = -1;
          gameEvents.emit(gameEvents.SHIP_MOVED);
        };
        const moveHeldShip = () => {
          const pairToOccupy = [i, j];
          if (heldCellPair && `${heldCellPair}` !== `${pairToOccupy}`) {
            const moved = playerGameBoard.moveShip(heldCellPair, pairToOccupy);
            if (moved) {
              heldCellPair = pairToOccupy;
              heldShipAreaIndex = findShipAreaIndex(heldCellPair);
            }
          }
        };
        if (
          boardCell.onpointerdown !== undefined ||
          window.navigator.maxTouchPoints > 0
        ) {
          // Prevent touchmove event because it intercepts the pointer events
          boardCell.addEventListener('touchmove', (e) => e.preventDefault());
          boardCell.addEventListener('gotpointercapture', (event) => {
            try {
              // https://developer.mozilla.org/en-US/docs/Web/API/Element/releasePointerCapture
              event.target.releasePointerCapture(event.pointerId);
            } catch (e) {
              console.log(e.message);
            }
          });
          boardCell.addEventListener('pointerdown', holdBoardCell);
          boardCell.addEventListener('pointerenter', moveHeldShip, {
            passive: true,
          });
          boardCell.addEventListener('pointerup', releaseHeldCell);
          boardCell.addEventListener('pointercancel', releaseHeldCell);
        } else {
          boardCell.addEventListener('mousedown', holdBoardCell);
          boardCell.addEventListener('mouseenter', moveHeldShip, {
            passive: true,
          });
          boardCell.addEventListener('mouseup', releaseHeldCell);
        }
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
