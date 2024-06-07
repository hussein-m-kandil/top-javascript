import './index.css';

import { createElement } from '../../helpers/createElement';
import { capitalize } from '../../helpers/capitalize';

/**
 * Creates DOM element (div) that has the player's information
 * @param {string} name - The name of the player (hyphened not spaced)
 * @returns {HTMLDivElement}
 */
export default function PlayerInfo(name) {
  if (typeof name !== 'string') {
    throw TypeError(
      `Invalid 'name' type; expected: 'string', given: '${name}'`,
    );
  }

  const playerInfo = createElement('div', `${name}-info`);

  const playerName = createElement(
    'h3',
    'player-name',
    capitalize(name.replace('-', ' ')),
  );

  const playerType = createElement(
    'button',
    'player-type',
    'Player type is not implemented!', // TODO: ...
    ['type', 'button'],
  );

  playerInfo.append(playerName, playerType);

  return playerInfo;
}

export { PlayerInfo };
