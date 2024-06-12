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

  const player = {
    type: playerType === undefined ? Player.TYPES.COMPUTER : playerType,
    gameBoard: GameBoard(),
  };

  // Add play method to player type 'computer'
  if (player.type === Player.TYPES.COMPUTER) {
    const maxHeight = player.gameBoard.board.length;
    const maxWidth = player.gameBoard.board[0]?.length ?? 0;
    // Save the targeted cell
    let target = null;
    // Save all valid targets
    const validTargetsPairs = [];
    for (let i = 0; i < maxHeight; i++) {
      for (let j = 0; j < maxWidth; j++) {
        validTargetsPairs.push([i, j]);
      }
    }
    // Create a variable to hold our direction
    // If it was a successful direction, then we keep moving in that direction
    // Otherwise, reset the direction to null again
    let previousDirection = null;
    // Create a variable to hold a smart target instead of a random one
    // The smart target is any adjacent cell and could be in a successful direction
    let smartTarget = null;
    // Create a helper checks whether a given cell is valid target
    const isValidTarget = (cellPair) => {
      return (
        cellPair[0] >= 0 &&
        cellPair[1] >= 0 &&
        cellPair[0] < maxHeight &&
        cellPair[1] < maxWidth &&
        validTargetsPairs.some(
          ([i, j]) => i === cellPair[0] && j === cellPair[1],
        )
      );
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
    // Create a flag to distinguish our attacks
    let attacked = false;
    // Reset previousDirection to null on every MISS event
    gameEvents.add(gameEvents.MISS, () => {
      if (attacked) {
        previousDirection = null;
        attacked = false;
      }
    });
    // Handle HIT events
    gameEvents.add(gameEvents.HIT, () => {
      if (attacked) {
        setSmartTarget();
        attacked = false;
      }
    });
    player.play = () => {
      if (validTargetsPairs.length > 0) {
        if (smartTarget === null) {
          const randomTargetIndex = Math.floor(
            Math.random() * validTargetsPairs.length,
          );
          target = validTargetsPairs[randomTargetIndex];
          validTargetsPairs.splice(randomTargetIndex, 1);
        } else {
          target = smartTarget;
          smartTarget = null;
          validTargetsPairs.splice(
            validTargetsPairs.findIndex(
              ([i, j]) => target[0] === i && target[1] === j,
            ),
            1,
          );
        }
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
