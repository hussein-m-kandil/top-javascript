import { gameEvents } from '../game-events';
import { GameBoard } from '../game-board';

/**
 * A factory creates player object. A call without argument creates player of type 'computer'.
 * @param {string?} type - The type of the returned player ['computer' | 'human']
 * @returns {Player}
 */
export default function Player(playerType) {
  // Assert that the given type is valid type or it is 'undefined', Otherwise, throw error
  if (
    playerType !== undefined &&
    playerType !== Player.TYPES.COMPUTER &&
    playerType !== Player.TYPES.HUMAN
  ) {
    throw TypeError(
      `Invalid type! Only '${Player.TYPES.COMPUTER}' & '${Player.TYPES.HUMAN}' are the valid types. Given: '${playerType}'`,
    );
  }

  const type = playerType === undefined ? Player.TYPES.COMPUTER : playerType;
  const gameBoard = GameBoard(type === Player.TYPES.COMPUTER);

  const player = {
    type,
    gameBoard,
  };

  // Add play method to player type 'computer'
  if (player.type === Player.TYPES.COMPUTER) {
    const maxHeight = player.gameBoard.board.length;
    const maxWidth = player.gameBoard.board[0]?.length ?? 0;
    // Create empty board to illustrate the opponent's board on top of it
    const opponentBoard = [];
    for (let i = 0; i < maxHeight; i++) {
      opponentBoard[i] = [];
      for (let j = 0; j < maxWidth; j++) {
        opponentBoard[i][j] = {
          attacked: false,
          missed: false,
        };
      }
    }
    // Create an array to hold the opponent's sunk ships' areas
    const opponentSunkShipsAreas = [];
    // Create an array to hold high priority places to be targeted, if don't have smart target
    const highPriorityTargetsQ = [];
    // Create an array to hold medium priority places to be targeted, if don't have high priority targets
    const mediumPriorityTargetsQ = [];
    // Save the targeted cell
    let target = null;
    // Save all valid targets
    // const validTargetsPairs = [];
    // for (let i = 0; i < maxHeight; i++) {
    //   for (let j = 0; j < maxWidth; j++) {
    //     validTargetsPairs.push([i, j]);
    //   }
    // }
    // Create a variable to hold our direction
    // If it was a successful direction, then we keep moving in that direction
    // Otherwise, reset the direction to null again
    let previousDirection = null;
    // Create a variable to hold a smart target instead of a random one
    // The smart target is any adjacent cell and could be in a successful direction
    let smartTarget = null;
    // Create a helper checks whether a given cell is valid target
    const isValidTarget = ([i, j]) => {
      const opponentCell = opponentBoard[i]?.[j];
      return opponentCell && !opponentCell.attacked && !opponentCell.missed;
    };
    // Create helper that remove a given target form high/medium priority if exist.
    const removeFromPrioritizedAndValidTargets = ([i, j]) => {
      const isEqualToGivenTarget = ([savedI, savedJ]) =>
        savedI === i && savedJ === j;
      const highPriorityIndex =
        highPriorityTargetsQ.findIndex(isEqualToGivenTarget);
      if (highPriorityIndex > -1) {
        highPriorityTargetsQ.splice(highPriorityIndex, 1);
      }
      const mediumPriorityIndex =
        mediumPriorityTargetsQ.findIndex(isEqualToGivenTarget);
      if (mediumPriorityIndex > -1) {
        mediumPriorityTargetsQ.splice(mediumPriorityIndex, 1);
      }
      // const validTargetIndex =
      //   validTargetsPairs.findIndex(isEqualToGivenTarget);
      // if (validTargetIndex > -1) {
      //   validTargetsPairs.splice(validTargetIndex, 1);
      // }
    };
    // Create a helper that gets all possible cells to attack (based on the last attacked cell)
    const setSmartTarget = () => {
      const DIRECTIONS = [
        [-1, 0],
        [0, 1],
        [1, 0],
        [0, -1],
      ];
      // Separate the direction index from the cell, because we need to keep track the direction itself to follow again
      const validAdjacentCellsOrNulls = [];
      // Save the indexes of the valid directions
      const validAdjacentCellsIndexes = [];
      DIRECTIONS.forEach((dirMod, i) => {
        const adjacentCellPair = [target[0] + dirMod[0], target[1] + dirMod[1]];
        if (isValidTarget(adjacentCellPair)) {
          validAdjacentCellsOrNulls.push(adjacentCellPair);
          validAdjacentCellsIndexes.push(i);
        } else {
          validAdjacentCellsOrNulls.push(null);
        }
      });
      if (validAdjacentCellsIndexes.length > 0) {
        // If the previous direction is null or lead to valid adjacent cell,
        // then set it to lead to a valid adjacent cell
        if (
          previousDirection === null ||
          !validAdjacentCellsIndexes.includes(previousDirection)
        ) {
          previousDirection =
            validAdjacentCellsIndexes[
              Math.floor(Math.random() * validAdjacentCellsIndexes.length)
            ];
        }
        // Follow the previous direction
        smartTarget = validAdjacentCellsOrNulls[previousDirection];
      } else {
        // There is not valid adjacent cells
        previousDirection = null;
        smartTarget = null;
      }
    };
    // Handle SHIP_IS_SUNK to save all opponent's sunk ships' areas in an array
    gameEvents.add(gameEvents.SHIP_IS_SUNK, (shipArea) => {
      const sunkShipArea = [];
      shipArea.forEach((shipCellPair) => sunkShipArea.push([...shipCellPair]));
      opponentSunkShipsAreas.push(sunkShipArea);
    });
    // Create a flag to distinguish our attacks
    let attacked = false;
    /*
     * Handle MISS event doing the following:
     * - Reset previousDirection to null.
     * - Look for EVERY cell that: not attacked, not missed,
     *   and has on both sides attacked cells not included in opponent's sunk ships array.
     * - Save these cells in an array of cells that has the highest shooting priority.
     */
    gameEvents.add(gameEvents.MISS, () => {
      if (attacked) {
        if (target) {
          const [i, j] = target;
          opponentBoard[i][j].missed = true;
        }
        previousDirection = null;
        attacked = false;
      }
      const DIR_MOD = {
        TOP: [-1, 0],
        LEFT: [0, -1],
        RIGHT: [0, 1],
        BOTTOM: [1, 0],
      };
      const DIRS_KEYS_CLOCKWISE = ['TOP', 'RIGHT', 'BOTTOM', 'LEFT'];
      const axisModifiers = [
        [DIR_MOD.TOP, DIR_MOD.BOTTOM],
        [DIR_MOD.LEFT, DIR_MOD.RIGHT],
      ];
      opponentBoard.forEach((row, i) => {
        row.forEach((cell, j) => {
          // Search for high priority targets
          if (!cell.attacked && !cell.missed) {
            for (let k = 0; k < axisModifiers.length; k++) {
              const firstI = i + axisModifiers[k][0][0];
              const firstJ = j + axisModifiers[k][0][1];
              const secondI = i + axisModifiers[k][1][0];
              const secondJ = j + axisModifiers[k][1][1];
              const firstC = opponentBoard[firstI]?.[firstJ];
              const secondC = opponentBoard[secondI]?.[secondJ];
              if (firstC && secondC && firstC.attacked && secondC.attacked) {
                const firstCellIsSunk = opponentSunkShipsAreas.some(
                  (oppSunkShipArea) => {
                    return oppSunkShipArea.some(
                      (sunkC) => `${sunkC}` === `${firstC}`,
                    );
                  },
                );
                const secondCellIsSunk = opponentSunkShipsAreas.some(
                  (oppSunkShipArea) => {
                    return oppSunkShipArea.some(
                      (sunkC) => `${sunkC}` === `${secondC}`,
                    );
                  },
                );
                if (!firstCellIsSunk && !secondCellIsSunk) {
                  highPriorityTargetsQ.push([i, j]);
                }
              }
            }
          }
          // Or, Search for medium priority targets
          else if (cell.attacked) {
            for (let k = 0; k < DIRS_KEYS_CLOCKWISE.length; k++) {
              const modifier = DIR_MOD[DIRS_KEYS_CLOCKWISE[k]];
              const newI = i + modifier[0];
              const newJ = j + modifier[1];
              const adjacentC = opponentBoard[newI]?.[newJ];
              if (adjacentC && !adjacentC.missed && !adjacentC.attacked) {
                const isEqualToAdjacentC = ([oldI, oldJ]) =>
                  oldI === newI && oldJ === newJ;
                const highPriorityIndex =
                  highPriorityTargetsQ.findIndex(isEqualToAdjacentC);
                const mediumPriorityIndex =
                  mediumPriorityTargetsQ.findIndex(isEqualToAdjacentC);
                if (highPriorityIndex < 0 && mediumPriorityIndex < 0) {
                  // TODO: TO BE DELETED
                  mediumPriorityTargetsQ.splice(0);
                  mediumPriorityTargetsQ.push([newI, newJ]);
                  break; // TODO: TO BE DELETED
                }
              }
            }
          }
        });
      });
      if (highPriorityTargetsQ.length > 0) {
        smartTarget = highPriorityTargetsQ.shift();
      } else if (mediumPriorityTargetsQ.length > 0) {
        smartTarget = mediumPriorityTargetsQ.shift();
      }
    });
    // Handle HIT events
    gameEvents.add(gameEvents.HIT, () => {
      if (attacked) {
        if (target) {
          const [i, j] = target;
          opponentBoard[i][j].attacked = true;
        }
        setSmartTarget();
        attacked = false;
      }
    });
    player.play = () => {
      const validTargets = [];
      opponentBoard.forEach((row, i) => {
        row.forEach((cell, j) => {
          if (!cell.attacked && !cell.missed) validTargets.push([i, j]);
        });
      });
      if (validTargets.length > 0) {
        if (!smartTarget) {
          const randomTargetIndex = Math.floor(
            Math.random() * validTargets.length,
          );
          target = validTargets[randomTargetIndex];
        } else {
          target = smartTarget;
          smartTarget = null;
        }
        removeFromPrioritizedAndValidTargets(target);
        attacked = true;
        gameEvents.emit(gameEvents.ATTACK, target);
      } else {
        attacked = false;
        gameEvents.emit(gameEvents.GAME_OVER);
      }
    };
  }

  // Make the player object an instance of 'Player'
  Object.setPrototypeOf(player, Player.prototype);
  // Set 'Player' as the constructor for the player object
  Object.defineProperty(player, 'constructor', {
    value: Player,
    writable: false,
    enumerable: false,
    configurable: false,
  });
  Object.freeze(player);

  return player;
}

// Add TYPES as a static property on 'Player'
Player.TYPES = { COMPUTER: 'C', HUMAN: 'H' };

// Freeze Player & its prototype
Object.freeze(Player);
Object.freeze(Player.prototype);

export { Player };
