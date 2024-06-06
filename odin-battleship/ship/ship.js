export default function Ship(length) {
  if (!Number.isInteger(length) || length < 2 || length > 5) {
    throw TypeError(
      `Expect 1 argument (length) of type 'number'; 1 < length < 6! given '${length}'`,
    );
  }

  // Ship's state & logic
  let hits = 0,
    sunk = false;
  const hit = () => {
    if (!sunk) {
      hits++;
      sunk = hits >= length;
    }
  };
  const isSunk = () => sunk;

  // Create Ship object with its members to be recorded (just for autocompletion) before making them non-writable
  const ship = {
    length,
    hits,
    hit,
    isSunk,
  };

  // Set the prototype of ship object to Ship.prototype
  Object.setPrototypeOf(ship, Ship.prototype);

  // Reconfigure all Ship's members and make them non-writable
  const config = { configurable: false, enumerable: true };
  const configExt = { ...config, writable: false };
  Object.defineProperties(ship, {
    // Set the constructor of a ship object to Ship
    constructor: {
      ...configExt,
      enumerable: false,
      value: Ship,
    },
    length: {
      ...config,
      get() {
        return length;
      },
    },
    hits: {
      ...config,
      get() {
        return hits;
      },
    },
    hit: {
      ...configExt,
      value: hit,
    },
    isSunk: {
      ...configExt,
      value: isSunk,
    },
  });

  return ship;
}

export { Ship };
