import './index.css';

import { createElement } from './helpers/create-element';
import { createGame } from './helpers/create-game';
import { gameEvents } from './game-events';

const [headContainer, header, startGameBtn, resetGameBtn, gameContainer] = [
  createElement('div', 'head-container'),
  createElement('h1', 'head', 'Odin Battleship'),
  createElement('button', 'start-btn control-btn', 'Start', ['type', 'button']),
  createElement('button', 'reset-btn control-btn', 'Reset', ['type', 'button']),
  createElement('div', 'game-container'),
];

// Initiate a game logic object
const game = createGame(gameContainer);

let gameOver = false;

startGameBtn.addEventListener('click', () => {
  game.startGame();
  headContainer.removeChild(startGameBtn);
  headContainer.appendChild(resetGameBtn);
});

resetGameBtn.addEventListener('click', () => {
  game.initiateNewGame();
  headContainer.removeChild(resetGameBtn);
  headContainer.appendChild(startGameBtn);
  gameOver = false;
});

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
      resetGameBtn.click();
    });
    dialog.append(message, question, cancelBtn, playAgainBtn);
    document.body.append(dialog);
    dialog.showModal();
  }
});

game.initiateNewGame();

headContainer.append(header, startGameBtn);
document.body.append(headContainer, gameContainer);
