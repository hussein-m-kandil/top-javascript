import { GameBoard } from '../game-board';

/**
 * A factory creates player object. A call without argument creates player of type 'computer'.
 * @param {string?} type - The type of the returned player ['computer' | 'human']
 * @returns {Player}
 */
export default function Player(type) {
  const TYPES = ['computer', 'human'];

  // If not given a 'type', default to 'computer',
  if (type === undefined) {
    type = TYPES[0];
  } else {
    // Otherwise, check the given after converting it to lowercase string
    type = String(type.toLowerCase());
    if (!TYPES.includes(type)) {
      throw TypeError(
        `Invalid type! Only '${TYPES[0]}' & '${TYPES[1]}' are the valid types. Given: '${type}'`,
      );
    }
  }

  // Add TYPES as a static property on 'Player'
  Player.TYPES = TYPES;

  const player = { type, gameBoard: GameBoard() };

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

export { Player };
