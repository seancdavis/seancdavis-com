// Modified from source:
// https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

/**
 * Produces a random number between the inclusive lower and upper bounds. If
 * only one argument is provided a number between 0 and the given number is
 * returned. If floating is true, or either lower or upper are floats, a
 * floating-point number is returned instead of an integer.
 *
 * @param {number} a
 * @param {number} b
 * @param {boolean} float Set to false if an integer should be returned
 * @returns number
 */
export function random(a = 1, b = 0, float = true) {
  if (!float) return exports.randomInt(a, b);
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  return lower + Math.random() * (upper - lower);
}

/**
 * Produces a random integer between the inclusive lower and upper bounds. If
 * only one argument is provided a number between 0 and the given number is
 * returned.
 *
 * @param {number} a
 * @param {number} b
 * @returns number
 */
export function randomInt(a = 1, b = 0) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
}
