// Source: https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_sample

/**
 * Extract a random element from array.
 *
 * @param {array} arr The array from which to sample
 */
export function sample(arr) {
  const len = arr == null ? 0 : arr.length;
  return len ? arr[Math.floor(Math.random() * len)] : undefined;
}
