import './index.css';

import { createElement } from './helpers/createElement';
import { PlayerInfo } from './components/player-info';
import { Board } from './components/board';
import { Player } from './player';

// Create game players
const playersData = [
  {
    name: 'first-player',
    player: Player('human'),
  },
  {
    name: 'second-player',
    player: Player('computer'),
  },
];

// Add player's UI data
playersData.forEach((playerData) => {
  playerData.infoUI = PlayerInfo(playerData.name, playerData.player.type);
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

// TODO: Add the ability to change who plays first

// TODO: Switch between the 2 players

// TODO: Rerender the player's board after the 'gameBoard' receives an attack
