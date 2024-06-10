import './index.css';

import { createElement } from '../../helpers/create-element';
import { capitalize } from '../../helpers/capitalize';
import { Player } from '../../player';

/**
 * Creates DOM element (div) that has the player's information
 * @param {string} name - The name of the player (hyphened not spaced)
 * @returns {HTMLDivElement}
 */
export default function PlayerInfo(name, type) {
  if (typeof name !== 'string') {
    throw TypeError(
      `Invalid 'name' type; expected: 'string', given: '${name}'`,
    );
  }

  let typeIndicator;

  if (type === Player.TYPES.COMPUTER) {
    typeIndicator = 'COMPUTER';
  } else if (type === Player.TYPES.HUMAN) {
    typeIndicator = 'YOU';
  } else {
    throw TypeError(`Invalid player type!`);
  }

  const playerInfo = createElement('div', `${name}-info`);

  const nameIndicator = capitalize(name.replace('-', ' '));

  const playerName = createElement(
    'h3',
    'player-name',
    `${nameIndicator} (${typeIndicator})`,
  );

  playerInfo.append(playerName);

  return playerInfo;
}

export { PlayerInfo };
