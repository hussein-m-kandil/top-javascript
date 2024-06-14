import './index.css';

import { createElement } from './helpers/create-element';
import { createGame } from './helpers/create-game';
import { gameEvents } from './game-events';

const [header, gameContainer] = [
  createElement('h1', 'head', 'Odin Battleship'),
  createElement('div', 'game-container'),
];

// Initiate a game logic object
const game = createGame(gameContainer);

gameEvents.add(gameEvents.GAME_OVER, () => {
  game.endCurrentGame();
  const endMessage = game.isComputerWon() ? 'Game Over!' : 'You Win!';
  const [dialog, message, question, cancelBtn, playAgainBtn] = [
    createElement('dialog', 'game-over'),
    createElement('h2', 'message', endMessage),
    createElement('p', 'question', 'Do want to play again?'),
    createElement('button', 'cancel-btn', 'Cancel', ['type', 'button']),
    createElement('button', 'play-again-btn', 'Play Again', ['type', 'button']),
  ];
  dialog.addEventListener('close', () => document.body.removeChild(dialog));
  cancelBtn.addEventListener('click', () => dialog.close());
  playAgainBtn.addEventListener('click', () => {
    game.startNewGame();
    dialog.close();
  });
  dialog.append(message, question, cancelBtn, playAgainBtn);
  document.body.append(dialog);
  dialog.showModal();
});

game.startNewGame();

document.body.append(header, gameContainer);
