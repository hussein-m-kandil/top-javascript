import './index.css';

import { gameEvents } from './game-events';
import { createElement } from './helpers/create-element';
import { PlayerInfo } from './components/player-info';
import { Board } from './components/board';
import { Player } from './player';

// Create game object to hold the state of the game
const game = {
  playersData: [
    {
      name: 'first-player',
      player: Player(Player.TYPES.HUMAN),
      playerUI: createElement('div', 'first-player'),
    },
    {
      name: 'second-player',
      player: Player(Player.TYPES.COMPUTER),
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
        playerData.player.type === Player.TYPES.COMPUTER,
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

// create a flag to be 'true' while the computer player is thinking...
let computerThinking = false;

// Play on a computer turn
const playIfComputerTurn = () => {
  const currentPlayer = game.playersData[game.currentPlayerIndex].player;
  if (currentPlayer.type === Player.TYPES.COMPUTER) {
    computerThinking = true;
    setTimeout(() => {
      computerThinking = false;
      currentPlayer.play();
    }, 1000);
  }
};

// Create a flag to be 'true' while evaluating an attack
let evaluatingAttack = false;

// Handle game events
gameEvents.add(gameEvents.ATTACK, (cellPlacePair) => {
  if (!evaluatingAttack && !computerThinking) {
    evaluatingAttack = true;
    const opponentIndex = game.currentPlayerIndex === 0 ? 1 : 0;
    const opponentPlayer = game.playersData[opponentIndex].player;
    opponentPlayer.gameBoard.receiveAttack(cellPlacePair);
    evaluatingAttack = false;
  }
});

gameEvents.add(gameEvents.HIT, () => {
  // Continue with the current player, but rerender the opponent's board
  game.renderPlayerUI(game.currentPlayerIndex === 0 ? 1 : 0);
  playIfComputerTurn();
});

gameEvents.add(gameEvents.MISS, () => {
  game.switchCurrentPlayer();
  game.renderAllPlayersUI();
  playIfComputerTurn();
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

// Start the game
playIfComputerTurn();
