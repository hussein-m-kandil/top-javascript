import './index.css';

import { createElement } from './helpers/create-element';
import { createGame } from './helpers/create-game';
import { gameEvents } from './game-events';

const [header, startGameBtn, resetGameBtn, gameContainer] = [
  createElement('h1', 'head', 'Odin Battleship'),
  createElement('button', 'start-game-btn', 'Start New Game', [
    'type',
    'button',
  ]),
  createElement('button', 'reset-game-btn', 'Reset Game', ['type', 'button']),
  createElement('div', 'game-container'),
];

// Initiate a game logic object
const game = createGame(gameContainer);

let gameOver = false;

gameEvents.add(gameEvents.GAME_OVER, () => {
  if (!gameOver) {
    gameOver = true;
    game.endCurrentGame();
    const endMessage = game.isComputerWon() ? 'Game Over!' : 'You Win!';
    const [dialog, message, question, cancelBtn, playAgainBtn] = [
      createElement('dialog', 'game-over'),
      createElement('h2', 'message', endMessage),
      createElement('p', 'question', 'Do want to play again?'),
      createElement('button', 'cancel-btn', 'Cancel', ['type', 'button']),
      createElement('button', 'play-again-btn', 'Play Again', [
        'type',
        'button',
      ]),
    ];
    dialog.addEventListener('close', () => document.body.removeChild(dialog));
    cancelBtn.addEventListener('click', () => dialog.close());
    playAgainBtn.addEventListener('click', () => {
      game.initiateNewGame();
      dialog.close();
      gameOver = false;
    });
    dialog.append(message, question, cancelBtn, playAgainBtn);
    document.body.append(dialog);
    dialog.showModal();
  }
});

game.initiateNewGame();

startGameBtn.addEventListener('click', () => {
  game.startGame();
  document.body.insertBefore(resetGameBtn, startGameBtn);
  document.body.removeChild(startGameBtn);
});

resetGameBtn.addEventListener('click', () => {
  game.initiateNewGame();
  document.body.insertBefore(startGameBtn, resetGameBtn);
  document.body.removeChild(resetGameBtn);
  gameOver = false;
});

document.body.append(header, startGameBtn, gameContainer);
