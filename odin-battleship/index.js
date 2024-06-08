import './index.css';

import { createElement } from './helpers/createElement';
import { PlayerInfo } from './components/player-info';
import { Board } from './components/board';
import { Player } from './player';

// Create game players
const playersData = [
  {
    name: 'player-one',
    player: Player('human'),
  },
  {
    name: 'player-two',
    player: Player('computer'),
  },
];

playersData.forEach((playerData) => {
  playerData.infoUI = PlayerInfo(playerData.name);
  playerData.boardUI = Board(playerData.player.gameBoard);
});

// Header
const head = createElement('h1', 'head', 'Odin BattleShip');

// Game container
const gameContainer = createElement('div', 'game-container');

playersData.forEach((player) => {
  const playerDiv = createElement('div', `${player.name}`);
  playerDiv.append(player.infoUI, player.boardUI);
  gameContainer.append(playerDiv);
});

// Append the components to the DOM
document.body.append(head, gameContainer);
