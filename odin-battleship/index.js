import './index.css';

import { gameEvents } from './game-events';
import { createElement } from './helpers/createElement';
import { PlayerInfo } from './components/player-info';
import { Board } from './components/board';
import { Player } from './player';

// Create game object to hold the state of the game
const game = {
  playersData: [
    {
      name: 'first-player',
      player: Player('human'),
      playerUI: createElement('div', 'first-player'),
    },
    {
      name: 'second-player',
      player: Player('computer'),
      playerUI: createElement('div', 'second-player'),
    },
  ],
  allPlayersDisabled: false,
  currentPlayerIndex: 0,
  /**
   * Switches the current player's index
   */
  switchCurrentPlayer() {
    this.currentPlayerIndex = (this.currentPlayerIndex + 1) % 2;
  },
  /**
   * Renders the recent player's UI-information/board to the DOM
   * @param {number} playerIndex
   * @param {HTMLDivElement?} parentElement - Optional parent to append player's UI to it
   */
  renderPlayerUI(playerIndex, parentElement) {
    const playerData = this.playersData[playerIndex];
    [...playerData.playerUI.children].forEach((child) => child.remove());
    playerData.playerUI.append(
      PlayerInfo(playerData.name, playerData.player.type),
      Board(
        playerData.player.gameBoard,
        playerData.player.type === 'computer',
        this.allPlayersDisabled || playerIndex === this.currentPlayerIndex,
      ),
    );
    if (parentElement) parentElement.append(playerData.playerUI);
  },
  /**
   * Renders the recent ALL player's UIs-information/board to the DOM
   * @param {HTMLDivElement} parentElement - Optional parent to append ALL player's UIs to it
   */
  renderAllPlayersUI(parentElement) {
    for (let i = 0; i < game.playersData.length; i++) {
      game.renderPlayerUI(i, parentElement);
    }
  },
};

// Handle game events
gameEvents.add(gameEvents.HIT, () => {
  game.renderPlayerUI(game.currentPlayerIndex === 0 ? 1 : 0);
});
gameEvents.add(gameEvents.MISS, () => {
  game.switchCurrentPlayer();
  game.renderAllPlayersUI();
});
gameEvents.add(gameEvents.LOSS, () => {
  game.allPlayersDisabled = true;
  game.renderAllPlayersUI();
  // TODO: Present a game over message & give the option to play again
});

// Header
const head = createElement('h1', 'head', 'Odin BattleShip');

// Game container
const gameContainer = createElement('div', 'game-container');

// Initiate player's UI
game.renderAllPlayersUI(gameContainer);

// TODO: Add the ability to change who plays first

// Append the components to the DOM
document.body.append(head, gameContainer);
