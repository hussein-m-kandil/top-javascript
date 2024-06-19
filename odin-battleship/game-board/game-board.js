import { gameEvents } from '../game-events';
import { Ship } from '../ship';

// Save the custom board setup in order to reach out its values between UI renders
const oldBoardSetup = [];
const oldShips = [];

/**
 * Creates the battleship's player's logical game board
 * @returns @type {Object}
 */
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

  const shipsAreas = [];

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
    // Save ship's area
    shipsAreas.push([...shipArea]);
  };

  // Insert the ships in random places
  const ships = [Ship(2), Ship(3), Ship(3), Ship(4), Ship(5)];
  // If there is an old board setup use it otherwise, setup the new board
  if (
    Array.isArray(oldBoardSetup) &&
    oldBoardSetup.length === BOARD_SIDE_LENGTH
  ) {
    // Setup the board as it was
    ships.splice(0, ships.length, ...oldShips);
    board.forEach((row, i) => {
      row.forEach((cell, j) => {
        cell.ship = oldBoardSetup[i][j].ship;
        if (cell.ship) {
          const shipIndex = ships.findIndex((ship) => ship === cell.ship);
          if (!Array.isArray(shipsAreas[shipIndex])) {
            shipsAreas[shipIndex] = [];
          }
          shipsAreas[shipIndex].push([i, j]);
        }
      });
    });
    // Reset the ships' state
    shipsAreas.forEach((shipArea, shipIndex) => {
      const oldShip = board[shipArea[0][0]][shipArea[0][1]].ship;
      const newShip = Ship(oldShip.length);
      ships[shipIndex] = newShip;
      shipArea.forEach(([i, j]) => {
        board[i][j].ship = ships[shipIndex];
      });
    });
  } else {
    do {
      ships.forEach(insertShipInRandomBoardPlace);
    } while (randomizationFailed);
  }

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

  const moveShip = (shipIndex, modifier) => {
    if (shipIndex >= shipsAreas.length) {
      throw TypeError(
        `Invalid ship index! Ships count = ${shipsAreas.length}. Given index = ${shipIndex}.`,
      );
    }
    // Make sure that the new area is valid before moving to it
    const areaToOccupy = [];
    const usedShipArea = shipsAreas[shipIndex];
    const otherShipsAreas = shipsAreas.filter((_, i) => i !== shipIndex);
    for (let i = 0; i < usedShipArea.length; i++) {
      const oldOccupiedCell = usedShipArea[i];
      const cellToOccupy = [
        oldOccupiedCell[0] + modifier[0],
        oldOccupiedCell[1] + modifier[1],
      ];
      if (
        cellToOccupy.some((x) => x < 0) ||
        cellToOccupy.some((x) => x >= BOARD_SIDE_LENGTH) ||
        otherShipsAreas.some((shipArea) =>
          shipArea.some((cell) => `${cell}` === `${cellToOccupy}`),
        )
      )
        return false;
      areaToOccupy.push(cellToOccupy);
    }
    // Empty the ship's old area
    usedShipArea.forEach(([i, j]) => {
      const cell = board[i][j];
      cell.ship = null;
    });
    // Fill the ship's new area
    shipsAreas[shipIndex] = areaToOccupy;
    shipsAreas[shipIndex].forEach(([i, j]) => {
      const cell = board[i][j];
      cell.ship = ships[shipIndex];
    });
    // Reset the state of the board
    board.forEach((cell) => {
      cell.attacked = false;
      cell.missed = false;
    });
    gameEvents.emit(gameEvents.SHIP_MOVED);
    // Save current customized board
    for (let i = 0; i < BOARD_SIDE_LENGTH; i++) {
      oldBoardSetup[i] = [];
      for (let j = 0; j < BOARD_SIDE_LENGTH; j++) {
        oldBoardSetup[i][j] = {
          ship: board[i][j].ship,
          attacked: board[i][j].attacked,
          missed: board[i][j].missed,
        };
      }
    }
    // Save the currently used set of ships
    oldShips.splice(0, oldShips.length, ...ships);
    return true;
  };

  // Create gameBoard object
  const gameBoard = {
    board,
    ships,
    shipsAreas,
    receiveAttack,
    moveShipUp(shipIndex) {
      return moveShip(shipIndex, [-1, 0]);
    },
    moveShipDown(shipIndex) {
      return moveShip(shipIndex, [1, 0]);
    },
    moveShipLeft(shipIndex) {
      return moveShip(shipIndex, [0, -1]);
    },
    moveShipRight(shipIndex) {
      return moveShip(shipIndex, [0, 1]);
    },
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
