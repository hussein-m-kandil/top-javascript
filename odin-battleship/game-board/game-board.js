import { createGameBoardMatrix } from '../helpers/createGameBoardMatrix.js';
import { gameEvents } from '../game-events';
import { Ship } from '../ship';

export default function GameBoard() {
  const board = createGameBoardMatrix();

  // Fill the board
  board.forEach((row) =>
    row.forEach((cell) => {
      cell.ship = null;
      cell.attacked = false;
      cell.missed = false;
    }),
  );

  // Define private helper that takes 'n' to generate random number 'r': 0 < r < n
  const getRandomUpToButNotIncluding = (n) => Math.floor(Math.random() * n);

  // Define private helper to check whether a cell on board is empty
  const isEmptyCell = ([i, j]) => board[i][j].ship === null;

  // Insert the ships in random places
  const ships = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];

  ships.forEach((ship) => {
    // Choose a random direction
    const varAxis = getRandomUpToButNotIncluding(2);
    const shipArea = []; // Placeholder for cell's coordinates of the ship
    while (shipArea.length === 0) {
      // Choose random coordinates for the first cell
      const coordinates = [
        getRandomUpToButNotIncluding(board[0].length - ship.length),
        getRandomUpToButNotIncluding(board.length - ship.length),
      ];
      for (let i = 0; i < ship.length; i++) {
        // If the current coordinates' cell is not empty, reset 'shipArea' so the while loop repeats from the start
        if (!isEmptyCell(coordinates)) {
          shipArea.splice(0);
          break;
        }
        // Otherwise, mutate (increment just the axis of our direction) the same reference ('coordinates'),
        // after passing a copy of its current values to 'shipArea'
        shipArea.push([...coordinates]);
        coordinates[varAxis]++;
        // If you pass 'coordinates' directly to 'shipArea',
        // you will end with 'shipArea' contains pointers points to the same value on memory (which you have mutate it)
      }
    }
    shipArea.forEach(([i, j]) => {
      board[i][j].ship = ship;
    });
  });

  // Define receiveAttack function
  const receiveAttack = ([i, j]) => {
    const lastI = board.length - 1;
    const lastJ = board[0].length - 1;
    if (i < 0 || j < 0 || i > lastI || j > lastJ) {
      throw TypeError(
        `Invalid coordinates! It should be in the range from '[0, 0]' to '[${lastI}, ${lastJ}]', the given is '[${j}, ${j}]'.`,
      );
    }
    const cell = board[i][j];
    if (cell.ship && !cell.attacked) {
      cell.ship.hit();
      cell.attacked = true;
      gameEvents.emit(gameEvents.HIT, [i, j]);
    } else if (!cell.ship && !cell.missed) {
      cell.missed = true;
      gameEvents.emit(gameEvents.MISS, [i, j]);
    }
    if (ships.every((ship) => ship.isSunk())) {
      gameEvents.emit(gameEvents.LOSS);
    }
  };

  // Create gameBoard object
  const gameBoard = {
    ships,
    board,
    receiveAttack,
  };

  // Make a gameBoard object an instance of GameBoard
  Object.setPrototypeOf(gameBoard, GameBoard.prototype);
  Object.defineProperty(gameBoard, 'constructor', {
    value: GameBoard,
    writable: false,
    configurable: false,
    enumerable: false,
  });

  // Make a gameBoard object immutable
  Object.freeze(gameBoard);

  return gameBoard;
}

export { GameBoard };
