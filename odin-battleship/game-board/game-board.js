import { gameEvents } from '../game-events';
import { Ship } from '../ship';

// Save the custom board setup in order to reach out its values between UI renders
const oldBoardSetup = [];
const oldShips = [];

/**
 * Creates the battleship's player's logical game board
 * @param {boolean} computerBoard - If true, always returns randomized board
 * @returns @type {Object}
 */
export default function GameBoard(computerBoard) {
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
    !computerBoard &&
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

  // Define helper function to check whether a cell is inside the board's boundaries
  const isCellOnBoard = ([i, j]) => {
    return i >= 0 && j >= 0 && i < BOARD_SIDE_LENGTH && j < BOARD_SIDE_LENGTH;
  };

  /**
   * Attacks a cell on the board and emits HIT, MISS, or LOSS depending on the state of this ship's part.
   * Nothing happens if the given cell is already attacked or already missed.
   * @param {[number, number]} cellPair - A pair of number represents a cell on the board
   */
  const receiveAttack = ([i, j]) => {
    const last = [BOARD_SIDE_LENGTH - 1, BOARD_SIDE_LENGTH - 1];
    if (!isCellOnBoard([i, j])) {
      throw TypeError(
        `Invalid coordinates! It should be in the range from [0,0] to ${last}, the given is ${[i, j]}.`,
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

  // Define a private helper to cache a user customized board
  const cacheCustomBoard = () => {
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
  };

  // Define a private helper to cache current ships state
  const cacheShips = () => oldShips.splice(0, oldShips.length, ...ships);

  // Define a private helper to reset the state of the board
  const resetBoard = () => {
    board.forEach((cell) => {
      cell.attacked = false;
      cell.missed = false;
    });
  };

  // Define a private helper to fill the ship's new area
  const moveShipAreaOnBoard = (shipAreaIndex, newAreaToOccupy) => {
    shipsAreas[shipAreaIndex] = newAreaToOccupy;
    shipsAreas[shipAreaIndex].forEach(([i, j]) => {
      const cell = board[i][j];
      cell.ship = ships[shipAreaIndex];
    });
  };

  // Define a private helper to empty the ship's old area
  const emptyShipAreaOnBoard = (shipAreaToEmpty) => {
    shipAreaToEmpty.forEach(([i, j]) => {
      const cell = board[i][j];
      cell.ship = null;
    });
  };

  // Define helper checks whether a cell is occupied by any shipArea other than the area on a given index
  const isValidMove = (shipAreaIndex, cellToOccupy) => {
    const otherShipsAreas = shipsAreas.filter((_, i) => i !== shipAreaIndex);
    return (
      isCellOnBoard(cellToOccupy) &&
      !otherShipsAreas.some((shipArea) =>
        shipArea.some((cell) => `${cell}` === `${cellToOccupy}`),
      )
    );
  };

  const moveShip = (shipAreaIndex, [deltaI, deltaJ]) => {
    if (shipAreaIndex >= shipsAreas.length) {
      throw TypeError(
        `Invalid ship index! Ships count = ${shipsAreas.length}. Given index = ${shipAreaIndex}.`,
      );
    }
    // Make sure that the new area is valid before moving to it
    const areaToOccupy = [];
    const usedShipArea = shipsAreas[shipAreaIndex];
    for (let i = 0; i < usedShipArea.length; i++) {
      const cellToOccupy = [
        usedShipArea[i][0] + deltaI,
        usedShipArea[i][1] + deltaJ,
      ];
      if (!isValidMove(shipAreaIndex, cellToOccupy)) {
        return false;
      }
      areaToOccupy.push(cellToOccupy);
    }
    emptyShipAreaOnBoard(usedShipArea);
    moveShipAreaOnBoard(shipAreaIndex, areaToOccupy);
    resetBoard();
    cacheCustomBoard();
    cacheShips();
    gameEvents.emit(gameEvents.SHIP_MOVED);
    return true;
  };

  // Create gameBoard object
  const gameBoard = {
    board,
    ships,
    shipsAreas,
    /**
     * Attacks a cell on the board and emits HIT, MISS, or LOSS depending on the state of this ship's part.
     * Nothing happens if the given cell is already attacked or already missed.
     * @param {[number, number]} cellPair - A pair of number represents a cell on the board
     */
    receiveAttack,
    /**
     * Returns true if the ship moved up (and emits SHIP_MOVED event), Otherwise, returns false.
     * @param {number} shipIndex - The index (on ships array or shipsAreas) of a ship to move
     * @returns {boolean}
     */
    moveShipUp(shipIndex) {
      return moveShip(shipIndex, [-1, 0]);
    },
    /**
     * Returns true if the ship moved down (and emits SHIP_MOVED event), Otherwise returns false.
     * @param {number} shipIndex - The index (on ships array or shipsAreas) of a ship to move
     * @returns {boolean}
     */
    moveShipDown(shipIndex) {
      return moveShip(shipIndex, [1, 0]);
    },
    /**
     * Returns true if the ship moved left (and emits SHIP_MOVED event), Otherwise returns false.
     * @param {number} shipIndex - The index (on ships array or shipsAreas) of a ship to move
     * @returns {boolean}
     */
    moveShipLeft(shipIndex) {
      return moveShip(shipIndex, [0, -1]);
    },
    /**
     * Returns true if the ship moved right (and emits SHIP_MOVED event), Otherwise returns false.
     * @param {number} shipIndex - The index (on ships array or shipsAreas) of a ship to move
     * @returns {boolean}
     */
    moveShipRight(shipIndex) {
      return moveShip(shipIndex, [0, 1]);
    },
    /**
     * Moves the ship from its area to any valid (empty) area on the board.
     * Returns true if the ship moved (and emit SHIP_MOVED event), Otherwise returns false.
     * @param {[number, number]} occupiedCellPair - Part of the ship that will move
     * @param {[number, number]} cellPairToOccupy - Part of the empty area to move the ship to it
     * @returns {boolean}
     */
    moveShip(occupiedCellPair, cellPairToOccupy) {
      // Assert that every given argument is a pair
      if (
        !Array.isArray(occupiedCellPair) ||
        !Array.isArray(cellPairToOccupy) ||
        occupiedCellPair.length !== 2 ||
        cellPairToOccupy.length !== 2
      ) {
        throw TypeError(
          `Invalid arguments! Expect 2 pairs, given: ${occupiedCellPair}, ${cellPairToOccupy}`,
        );
      }
      // Return false if both arguments are equal
      if (`${occupiedCellPair}` === `${cellPairToOccupy}`) return false;
      // Assert that every cell is on board
      if (
        !isCellOnBoard(occupiedCellPair) ||
        !isCellOnBoard(cellPairToOccupy)
      ) {
        throw TypeError(
          `Given an out of board's boundary cell! Board sides are from 0 to ${BOARD_SIDE_LENGTH - 1}`,
        );
      }
      const [occupiedI, occupiedJ] = occupiedCellPair;
      const [toOccupyI, toOccupyJ] = cellPairToOccupy;
      const cellToOccupy = board[toOccupyI][toOccupyJ];
      const occupiedCell = board[occupiedI][occupiedJ];
      // If the given cell to drop onto has other ship return false
      if (cellToOccupy.ship && cellToOccupy.ship !== occupiedCell.ship) {
        return false;
      }
      // Try to move and if all new Area are valid & empty commit the move
      const shipAreaIndex = shipsAreas.findIndex((shipArea) => {
        return shipArea.some(
          (cellPair) => `${cellPair}` === `${occupiedCellPair}`,
        );
      });
      if (shipAreaIndex < 0) return false;
      const deltaIAndDeltaJ = [toOccupyI - occupiedI, toOccupyJ - occupiedJ];
      return moveShip(shipAreaIndex, deltaIAndDeltaJ);
    },
    /**
     * Returns true if the ship is rotated (and emits SHIP_ROTATED event), Otherwise returns false
     * @param {number} shipIndex - The index (on ships array or shipsAreas) of a ship to rotate
     * @returns {boolean}
     */
    rotateShip(shipIndex) {
      if (
        !Number.isInteger(shipIndex) ||
        shipIndex < 0 ||
        shipIndex >= shipsAreas.length
      ) {
        throw TypeError(
          `Invalid ship index! Should be a number from 0 to ${shipsAreas.length}, given: ${shipIndex}`,
        );
      }
      const usedShipArea = shipsAreas[shipIndex];
      if (usedShipArea.length <= 1) return false;
      const midIndex = Math.floor(usedShipArea.length / 2);
      const verticalShip = usedShipArea[1][0] > usedShipArea[0][0];
      const rotatedShipArea = [];
      for (let i = 0; i < usedShipArea.length; i++) {
        if (midIndex === i) rotatedShipArea.push(usedShipArea[i]);
        else {
          const [midPairConstSide, midPairVarSide] = verticalShip
            ? [usedShipArea[midIndex][0], usedShipArea[midIndex][1]]
            : [usedShipArea[midIndex][1], usedShipArea[midIndex][0]];
          const occupiedCellPair = [midPairConstSide];
          const deltaCurrentIdex = midIndex - i;
          const beforeMidPair = i < midIndex;
          const otherSide = beforeMidPair
            ? midPairVarSide - deltaCurrentIdex
            : midPairVarSide + deltaCurrentIdex;
          if (verticalShip) {
            occupiedCellPair.push(otherSide);
          } else {
            occupiedCellPair.unshift(otherSide);
          }
          if (!isValidMove(shipIndex, occupiedCellPair)) return false;
          rotatedShipArea.push(occupiedCellPair);
        }
      }
      emptyShipAreaOnBoard(usedShipArea);
      moveShipAreaOnBoard(shipIndex, rotatedShipArea);
      resetBoard();
      cacheCustomBoard();
      cacheShips();
      gameEvents.emit(gameEvents.SHIP_MOVED);
      return true;
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
