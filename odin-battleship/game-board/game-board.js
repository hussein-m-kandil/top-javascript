import { gameEvents } from '../game-events';
import { Ship } from '../ship';

export default function GameBoard() {
  const BOARD_SIDE_LENGTH = 10;

  // Create the board & Fill it with cell objects
  const board = [];
  for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
    board[i] = [];
    for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
      board[i][j] = {
        ship: null,
        attacked: false,
        missed: false,
      };
    }
  }

  // Define a private helper that takes 'n' to generate random number 'r': 0 < r < n
  const getRandomUpToButNotIncluding = (n) => Math.floor(Math.random() * n);

  // Define a private helper to check whether a cell on board is empty
  const isEmptyCell = ([i, j]) => board[i][j].ship === null;

  // Define a private helper to create a list of empty cells that constitutes a valid ship area
  const getValidShipArea = (ship, firstCellPlace, direction) => {
    const result = [];
    const currentCellPlace = firstCellPlace;
    for (let i = 0; i < ship.length; i++) {
      if (!isEmptyCell(currentCellPlace)) {
        return [];
      }
      // Push a copy of it on the 'result' array (ship area)
      result.push([...currentCellPlace]);
      // Move forward the current cell's place in the given direction
      currentCellPlace[direction]++;
      /* NOTE: I am PUSHING a COPY of the 'currentCellPlace', because I am MUTATING its values when I MOVE it */
    }
    return result;
  };

  // Create a flag indicates to a randomization fail (IN CASE OF LONG/INFINITE LOOP)
  let randomizationFailed = false;

  // Define a private helper to insert a given ship into a random place in the board
  const insertShipInRandomBoardPlace = (ship) => {
    let shipArea = []; // Placeholder for cells' places of the ship
    let loopsCount = 0;
    while (shipArea.length === 0 && loopsCount < 100) {
      loopsCount++;
      // Choose a random direction
      const movingAxis = getRandomUpToButNotIncluding(2);
      const fixedAxis = movingAxis === 0 ? 1 : 0;
      // Choose random cell place for the first cell
      const randomCellPlace = Array(2);
      // Get random number 'r' for moving axis, r: 0 > r > (board-side's length - ship's length)
      randomCellPlace[movingAxis] = getRandomUpToButNotIncluding(
        BOARD_SIDE_LENGTH - ship.length,
      );
      // Get random number 'r' for fixed axis, r: 0 > r > (board-side's length)
      randomCellPlace[fixedAxis] =
        getRandomUpToButNotIncluding(BOARD_SIDE_LENGTH);
      shipArea = getValidShipArea(ship, randomCellPlace, movingAxis);
    }
    randomizationFailed = loopsCount >= 100;
    shipArea.forEach(([i, j]) => {
      board[i][j].ship = ship;
    });
  };

  // Insert the ships in random places
  const ships = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];
  do {
    ships.forEach(insertShipInRandomBoardPlace);
  } while (randomizationFailed);

  // Define receiveAttack function
  const receiveAttack = ([i, j]) => {
    const lastI = BOARD_SIDE_LENGTH - 1;
    const lastJ = BOARD_SIDE_LENGTH - 1;
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
