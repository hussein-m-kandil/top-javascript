import './index.css';

import { createElement } from '../../helpers/create-element';
import { capitalize } from '../../helpers/capitalize';
import { Player } from '../../player';

/**
 * Creates DOM element (div) that has the player's information
 * @param {string} name - The name of the player (hyphened not spaced)
 * @param {string} type - The type of the player
 * @param {Object} gameBoard - The player's game board
 * @returns {HTMLDivElement}
 */
export default function PlayerInfo(name, type, gameBoard) {
  if (typeof name !== 'string') {
    throw TypeError(
      `Invalid 'name' type; expected: 'string', given: '${name}'`,
    );
  }

  const playerInfo = createElement('div', `${name}-info`);

  const nameIndicator = capitalize(name.replace('-', ' '));

  const playerName = createElement('h3', 'player-name', `${nameIndicator}`);

  playerInfo.append(playerName);

  if (gameBoard && type === Player.TYPES.HUMAN) {
    const shipNav = createElement('div', 'ship-nav');
    const selectContainer = createElement('div', 'select-container');
    const selectShip = createElement('select', 'select-ship', null, [
      'name',
      'select-ship',
    ]);
    gameBoard.shipsAreas.forEach((shipArea, i) => {
      selectShip.appendChild(
        createElement(
          'option',
          'ship-option',
          ''.padStart(shipArea.length, '◼'),
          ['value', i],
        ),
      );
    });
    const [moveUpBtn, moveDownBtn, moveLeftBtn, moveRightBtn] = [
      createElement('button', 'move-up-btn', 'Up', ['type', 'button']),
      createElement('button', 'move-down-btn', 'Down', ['type', 'button']),
      createElement('button', 'move-left-btn', 'Left', ['type', 'button']),
      createElement('button', 'move-right-btn', 'Right', ['type', 'button']),
    ];
    const moveHandler = (functionName) => {
      if (selectShip.value) {
        const shipAreaIndex = Number(selectShip.value);
        if (Number.isInteger(shipAreaIndex)) {
          gameBoard[functionName](shipAreaIndex);
        }
      }
    };
    moveUpBtn.addEventListener('click', () => moveHandler('moveShipUp'));
    moveDownBtn.addEventListener('click', () => moveHandler('moveShipDown'));
    moveLeftBtn.addEventListener('click', () => moveHandler('moveShipLeft'));
    moveRightBtn.addEventListener('click', () => moveHandler('moveShipRight'));
    selectContainer.addEventListener('pointerdown', () => {
      selectContainer.classList.add('open');
    });
    document.body.addEventListener('pointerup', () => {
      if (selectContainer.classList.contains('open')) {
        selectContainer.classList.remove('open');
      }
    });
    selectContainer.appendChild(selectShip);
    shipNav.append(
      selectContainer,
      moveUpBtn,
      moveDownBtn,
      moveLeftBtn,
      moveRightBtn,
    );
    playerInfo.appendChild(shipNav);
  }

  return playerInfo;
}

export { PlayerInfo };
