import { jest, describe, test, expect, afterEach } from '@jest/globals';
import { gameEvents } from './game-events';

describe("Test 'gameEvents' object", () => {
  test("should be of type 'object'", () => {
    expect(typeof gameEvents).toBe('object');
    expect(gameEvents).not.toBeNull();
    expect(Array.isArray(gameEvents)).not.toBe(true);
  });

  test("should have the functions: 'add', 'remove', and 'emit'", () => {
    expect(gameEvents.add).toBeInstanceOf(Function);
    expect(gameEvents.emit).toBeInstanceOf(Function);
    expect(gameEvents.remove).toBeInstanceOf(Function);
  });

  test("should 'gameEvents' and its all members be immutable", () => {
    expect(() => {
      gameEvents.foo = 'x';
    }).toThrowError();
    expect(() => {
      gameEvents.add = 'x';
    }).toThrowError();
    expect(() => {
      gameEvents.emit = 'x';
    }).toThrowError();
    expect(() => {
      gameEvents.remove = 'x';
    }).toThrowError();
    expect(() => {
      gameEvents.add.prototype = {};
    }).toThrowError();
    expect(() => {
      gameEvents.emit.prototype = {};
    }).toThrowError();
    expect(() => {
      gameEvents.remove.prototype = {};
    }).toThrowError();
    expect(() => {
      gameEvents.add.prototype.foo = {};
    }).toThrowError();
    expect(() => {
      gameEvents.emit.prototype.foo = {};
    }).toThrowError();
    expect(() => {
      gameEvents.remove.prototype.foo = {};
    }).toThrowError();
    expect(() => {
      Object.setPrototypeOf(gameEvents.add, {});
    }).toThrowError();
    expect(() => {
      Object.setPrototypeOf(gameEvents.emit, {});
    }).toThrowError();
    expect(() => {
      Object.setPrototypeOf(gameEvents.remove, {});
    }).toThrowError();
  });
});

describe("Test the behavior of the functions inside the 'gameEvents' object", () => {
  const eventName = 'event';
  const firstInfo = 'Hi!';
  const secondInfo = 'Bye!';
  const firstArgument = { info: firstInfo };
  const secondArgument = { info: secondInfo };
  const callback = jest.fn((firstArg, secondArg) => {
    [firstArg.info, secondArg.info] = [secondArg.info, firstArg.info];
  });

  afterEach(() => {
    // Reset the state before resetting the mock
    if (callback.mock.calls.length % 2 !== 0) {
      [firstArgument.info, secondArgument.info] = [firstInfo, secondInfo];
    }
    callback.mockClear();
  });

  test("should 'add' accept (eventName: string) and at least 1 (callback: function)", () => {
    expect(() => gameEvents.add()).toThrowError();
    expect(() => gameEvents.add(7, callback)).toThrowError();
    expect(() => gameEvents.add(true, callback)).toThrowError();
    expect(() => gameEvents.add(eventName, 7)).toThrowError();
    expect(() => gameEvents.add(eventName, 'fake function')).toThrowError();
    expect(() => gameEvents.add(eventName, callback)).not.toThrowError();
    expect(() => {
      gameEvents.add(
        eventName,
        () => '1st',
        () => '2nd',
      );
    }).not.toThrowError();
  });

  test("should 'emit' accept (eventName: string) as its 1st argument and, Optionally, variable number of arguments", () => {
    expect(() => {
      gameEvents.emit();
    }).toThrowError();
    expect(() => {
      gameEvents.emit(7, firstArgument, secondArgument);
    }).toThrowError();
    expect(() => {
      gameEvents.emit(true, firstArgument, secondArgument);
    }).toThrowError();
    expect(() => {
      gameEvents.emit(eventName, firstArgument, secondArgument);
    }).not.toThrowError();
  });

  test("should a 'callback' get called on emitting a specific event", () => {
    expect(() => {
      gameEvents.emit(eventName, firstArgument, secondArgument);
    }).not.toThrowError();
    expect(callback).toBeCalled();
    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0].length).toBe(2);
    expect(callback.mock.calls[0][0]).toBe(firstArgument);
    expect(callback.mock.calls[0][1]).toBe(secondArgument);
    expect(firstArgument.info).toBe(secondInfo);
    expect(secondArgument.info).toBe(firstInfo);
  });

  test("should 'remove' accept exactly 2 arguments: (eventName: string) & (callback: function)", () => {
    expect(() => gameEvents.remove()).toThrowError();
    expect(() => gameEvents.remove(7, callback)).toThrowError();
    expect(() => gameEvents.remove(true, callback)).toThrowError();
    expect(() => gameEvents.remove(eventName, 7)).toThrowError();
    expect(() => gameEvents.remove(eventName, 'callback')).toThrowError();
    expect(() => gameEvents.remove(eventName, callback)).not.toThrowError();
  });

  test('should any removed callback not get called', () => {
    expect(() => {
      gameEvents.emit(eventName, firstArgument, secondArgument);
    }).not.toThrowError();
    expect(callback.mock.calls.length).toBe(0);
  });
});
