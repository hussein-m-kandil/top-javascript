import './index.css';

import { createElement } from './helpers/create-element';
import { createGame } from './helpers/create-game';

// Header
const head = createElement('h1', 'head', 'Odin Battleship');

// Game container
const gameContainer = createElement('div', 'game-container');

// Append the components to the DOM
document.body.append(head, gameContainer);

// Initiate the logic of the game
const game = createGame(gameContainer);

game.startNewGame();
