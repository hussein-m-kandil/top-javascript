const REGISTRY = {};

/**
 * Adds the given callback/s to registered callbacks on the given event (eventName).
 * @param {string} eventName
 * @param  {...function} callbacks
 */
function add(eventName, ...callbacks) {
  if (
    typeof eventName !== 'string' ||
    !callbacks.every((c) => typeof c === 'function')
  ) {
    const strArgs = `${eventName}${callbacks.length > 0 ? ', ' + callbacks.toString().replace(/(?:\[|\])/, '') : ''}`;
    throw TypeError(
      `Expect event name of type 'string' and at least 1 callback! Given: '${strArgs}'`,
    );
  }

  if (REGISTRY[eventName]) {
    REGISTRY[eventName].push(...callbacks);
  } else {
    REGISTRY[eventName] = callbacks;
  }
}
Object.freeze(add);
Object.freeze(add.prototype);

/**
 * Removes the given callback from the registered callbacks on the given event (eventName).
 *
 * NOTE: The given callback MUST be the same reference that you had gavin to 'add' in order to be removed.
 * @param {string} eventName
 * @param {function} callback
 */
function remove(eventName, callback) {
  if (typeof eventName !== 'string' || typeof callback !== 'function') {
    throw TypeError(
      `Expect (eventName: string) & (callback: function)! Given: '${eventName}, ${callback}'`,
    );
  }

  if (REGISTRY[eventName]) {
    REGISTRY[eventName] = REGISTRY[eventName].filter(
      (registeredCallback) => registeredCallback !== callback,
    );
  }
}
Object.freeze(remove);
Object.freeze(remove.prototype);

/**
 * Emits the given event (eventName); All registered callbacks on that event gets called.
 * @param {string} eventName
 * @param  {...any} args
 */
function emit(eventName, ...args) {
  if (typeof eventName !== 'string') {
    throw TypeError(
      `Expect at least 1 argument of type 'string'! Given: '${eventName}'`,
    );
  }

  if (REGISTRY[eventName]) {
    REGISTRY[eventName].forEach((callback) => {
      callback(...args);
    });
  }
}
Object.freeze(emit);
Object.freeze(emit.prototype);

const gameEvents = {
  ATTACK: 'Fire',
  HIT: 'Boom',
  MISS: 'Oops',
  LOSS: 'Meh',
  GAME_OVER: 'Bye',
  SHIP_MOVED: 'Voo',
  SHIP_ROTATED: 'Woo',
  SHIP_SELECTED: 'Tick',
  SHIP_IS_SUNK: 'whoa',
  add,
  remove,
  emit,
};
Object.freeze(gameEvents);

export default gameEvents;
export { gameEvents };
