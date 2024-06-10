import './index.css';

import { createElement } from '../../helpers/create-element';
import { capitalize } from '../../helpers/capitalize';

/**
 * Creates DOM element (div) that has the player's information
 * @param {string} name - The name of the player (hyphened not spaced)
 * @returns {HTMLDivElement}
 */
export default function PlayerInfo(name, type) {
  if (typeof name !== 'string' || typeof type !== 'string') {
    throw TypeError(
      `Invalid 'name' type; expected: 'string', given: '${name}'`,
    );
  }

  const playerInfo = createElement('div', `${name}-info`);

  const nameIndicator = capitalize(name.replace('-', ' '));
  const typeIndicator = type === 'computer' ? 'COMPUTER' : 'YOU';

  const playerName = createElement(
    'h3',
    'player-name',
    `${nameIndicator} (${typeIndicator})`,
  );

  playerInfo.append(playerName);

  return playerInfo;
}

export { PlayerInfo };
