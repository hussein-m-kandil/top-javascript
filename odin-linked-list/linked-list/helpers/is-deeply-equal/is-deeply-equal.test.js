import { test, expect } from '@jest/globals';
import { isDeeplyEqual } from './is-deeply-equal.js';

test('should exist', () => {
  expect(isDeeplyEqual).toBeDefined();
});

test('should be a function', () => {
  expect(typeof isDeeplyEqual).toBe('function');
});

test('should throw Error on call with more/less than 2 inputs', () => {
  expect(() => isDeeplyEqual()).toThrowError();
  expect(() => isDeeplyEqual(3)).toThrowError();
  expect(() => isDeeplyEqual('')).toThrowError();
  expect(() => isDeeplyEqual(true)).toThrowError();
  expect(() => isDeeplyEqual(7, 7, 7)).toThrowError();
  expect(() => isDeeplyEqual('x', 'x', 'x')).toThrowError();
  expect(() => isDeeplyEqual(true, true, true)).toThrowError();
  expect(() => isDeeplyEqual(true, 'blah blah')).not.toThrowError();
});

test('should return correct answer with given values of basic type', () => {
  expect(isDeeplyEqual('', '')).toBe(true);
  expect(isDeeplyEqual('hello', 'hello')).toBe(true);
  expect(isDeeplyEqual(false, false)).toBe(true);
  expect(isDeeplyEqual(null, null)).toBe(true);
  expect(isDeeplyEqual(NaN, NaN)).toBe(true);
  expect(isDeeplyEqual(+0, -0)).toBe(true);
  expect(isDeeplyEqual(7, 7)).toBe(true);
  expect(isDeeplyEqual(null, '')).toBe(false);
  expect(isDeeplyEqual(null, false)).toBe(false);
  expect(isDeeplyEqual('blah', 'foo')).toBe(false);
  expect(isDeeplyEqual(null, NaN)).toBe(false);
  expect(isDeeplyEqual(3, 7)).toBe(false);
  expect(isDeeplyEqual('', false)).toBe(false);
});

test('should return correct answer with objects & arrays', () => {
  const normalObject = { foo: 'normal', bar: [7, { tar: 'object' }] };
  const circularObj1 = {};
  circularObj1.cyclic = circularObj1;
  const circularObj2 = {};
  circularObj2.cyclic = circularObj2;
  const circularArr1 = [7];
  circularArr1[1] = circularArr1;
  const circularArr2 = [7];
  circularArr2[1] = circularArr2;
  expect(isDeeplyEqual({}, {})).toBe(true);
  expect(isDeeplyEqual([], [])).toBe(true);
  expect(isDeeplyEqual({ foo: 2, bar: 7 }, { foo: 2, bar: 7 })).toBe(true);
  expect(
    isDeeplyEqual([1, 'foo', true, null, NaN], [1, 'foo', true, null, NaN]),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      { foo: { zap: 7 }, bar: { baz: { tar: null } } },
      { foo: { zap: 7 }, bar: { baz: { tar: null } } },
    ),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      [1, 'foo', true, null, NaN, [7, [0, 1]]],
      [1, 'foo', true, null, NaN, [7, [0, 1]]],
    ),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      { foo: { zap: [3, 4, { rap: 'hello' }] }, bar: { baz: { tar: null } } },
      { foo: { zap: [3, 4, { rap: 'hello' }] }, bar: { baz: { tar: null } } },
    ),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      [
        1,
        'foo',
        true,
        null,
        { foo: [{ tar: 7 }, 3] },
        NaN,
        [7, [0, 1, { zap: [3, { bar: 7 }] }]],
      ],
      [
        1,
        'foo',
        true,
        null,
        { foo: [{ tar: 7 }, 3] },
        NaN,
        [7, [0, 1, { zap: [3, { bar: 7 }] }]],
      ],
    ),
  ).toBe(true);
  // Use a value of type BigInt which is not serializable, hence JSON.stringify would throw Error
  expect(
    isDeeplyEqual(
      { foo: [null, 7, { bar: [3, NaN, 7n] }] },
      { foo: [null, 7, { bar: [3, NaN, 7n] }] },
    ),
  ).toBe(true);
  // Use a value of object that has a circular reference, so JSON.stringify throw an Error
  expect(
    isDeeplyEqual(
      { foo: [null, 7, { bar: [3, NaN, circularObj1] }] },
      { foo: [null, 7, { bar: [3, NaN, circularObj1] }] },
    ),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      { foo: [null, 7, { bar: [3, NaN, circularObj1] }] },
      { foo: [null, 7, { bar: [3, NaN, circularObj2] }] },
    ),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      { foo: [null, 7, { bar: [3, NaN, { tar: 'blah' }, { tar: 'blah' }] }] },
      { foo: [null, 7, { bar: [3, NaN, { tar: 'blah' }, { tar: 'blah' }] }] },
    ),
  ).toBe(true);

  expect(
    isDeeplyEqual(
      { foo: [null, 7, { bar: [normalObject, 3, NaN, normalObject] }] },
      { foo: [null, 7, { bar: [normalObject, 3, NaN, normalObject] }] },
    ),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      { foo: [null, 7, { bar: [3, NaN, circularArr1] }] },
      { foo: [null, 7, { bar: [3, NaN, circularArr1] }] },
    ),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      { foo: [null, 7, { bar: [3, NaN, circularArr1] }] },
      { foo: [null, 7, { bar: [3, NaN, circularArr2] }] },
    ),
  ).toBe(true);
  expect(
    isDeeplyEqual(
      { foo: [null, 7, { bar: [3, NaN, { tar: 'blah' }, circularObj1] }] },
      { foo: [null, 7, { bar: [3, NaN, circularObj1, { tar: 'blah' }] }] },
    ),
  ).toBe(false);
  expect(
    isDeeplyEqual(
      [7, 3, { circularArr1 }, [1, { bar: 7 }], [[{ foo: [] }]], circularArr1],
      [7, 3, { circularArr2 }, [1, { bar: 7 }], [[{ foo: [1] }]], circularArr2],
    ),
  ).toBe(false);
});
