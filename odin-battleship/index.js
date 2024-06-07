import './index.css';

import { createElement } from './helpers/createElement';
import { PlayerInfo } from './components/player-info';
import { Player } from './player';

// Create game players
const players = [
  { player: Player('human'), info: PlayerInfo('player-one') },
  {
    player: Player('computer'),
    info: PlayerInfo('player-two'),
  },
];

// Header
const head = createElement('h1', 'head', 'Odin BattleShip');

// Players information
const playersInfo = createElement('div', 'players-info');
playersInfo.append(players[0].info, players[1].info);

// Append the components to the DOM
document.body.append(head, playersInfo);
