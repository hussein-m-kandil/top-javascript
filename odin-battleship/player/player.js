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
    const maxPair = [
      player.gameBoard.board.length,
      player.gameBoard.board[0]?.length ?? 0,
    ];
    // Save the old plays as an array of strings (to be easier for equality)
    const oldTargets = [];
    player.play = () => {
      if (oldTargets.length < maxPair[0] * maxPair[1]) {
        const randomTarget = [0, 0];
        do {
          randomTarget[0] = Math.floor(Math.random() * maxPair[0]);
          randomTarget[1] = Math.floor(Math.random() * maxPair[1]);
        } while (oldTargets.includes(randomTarget.toString()));
        oldTargets.push(randomTarget.toString());
        gameEvents.emit(gameEvents.ATTACK, randomTarget);
      } else {
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
