import './index.css';

import { createElement } from './helpers/create-element';
import { createGame } from './helpers/create-game';
import { gameEvents } from './game-events';

const game = createGame();

// Create a flag to be 'true' while evaluating an attack
let evaluatingAttack = false;

// Handle game events
gameEvents.add(gameEvents.ATTACK, (cellPlacePair) => {
  if (!evaluatingAttack) {
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
  game.playIfComputerTurn();
});

gameEvents.add(gameEvents.MISS, () => {
  game.switchCurrentPlayer();
  game.renderAllPlayersUI();
  game.playIfComputerTurn();
});

gameEvents.add(gameEvents.LOSS, () => {
  gameEvents.emit(gameEvents.GAME_OVER);
});

gameEvents.add(gameEvents.GAME_OVER, () => {
  game.allPlayersDisabled = true;
  game.renderAllPlayersUI();
  // TODO: Present a game over message & give the option to play again
});

// Header
const head = createElement('h1', 'head', 'Odin Battleship');

// Game container
const gameContainer = createElement('div', 'game-container');

// Initiate player's UI
game.renderAllPlayersUI(gameContainer);

// Append the components to the DOM
document.body.append(head, gameContainer);
