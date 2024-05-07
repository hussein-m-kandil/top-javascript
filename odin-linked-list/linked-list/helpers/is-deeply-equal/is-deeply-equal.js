// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
function getCircularReplacer() {
  const ancestors = [];
  return function (key, value) {
    if (typeof value !== 'object' || value === null) {
      // The ORIGINAL CODE was just:> return value;
      // BigInt is not serializable, hence JSON.stringify would throw an Error
      // Here i only convert BigInt to string because of the nature of this use case (just equality)
      // If i also need to deserialize BigInt, at any point later,
      // i would put its string version in an object with a special key e.g. {$bigint: String(value)}
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#use_within_json
      return typeof value === 'bigint' ? String(value) : value;
    }
    // `this` is the object that value is contained in,
    // i.e., its direct parent.
    while (ancestors.length > 0 && ancestors.at(-1) !== this) {
      ancestors.pop();
    }
    if (ancestors.includes(value)) {
      return '[Circular]';
    }
    ancestors.push(value);
    return value;
  };
}

export default function isDeeplyEqual(...args) {
  if (args.length !== 2) {
    throw TypeError('Expect exactly 2 arguments!');
  }

  const first = args[0];
  const second = args[1];

  if (typeof first !== typeof second) return false; // Deferent types

  if (
    (typeof first !== 'object' || first === null) &&
    (typeof second !== 'object' || second === null)
  ) {
    // So, 'first' and 'second' not an Array nor an Object
    return first === second || Object.is(first, second);
  }

  const firstStringified = JSON.stringify(first, getCircularReplacer());
  const secondStringified = JSON.stringify(second, getCircularReplacer());

  return firstStringified === secondStringified;
}

export { isDeeplyEqual };
