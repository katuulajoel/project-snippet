/**
 * This get called before an async function is executed
 * @param {string} type
 * @returns
 */
export function start(type) {
  return { type };
}

/**
 * This dispatches successful Promises
 * @param {string} type
 * @param {*} data
 * @returns
 */
export function success(type, data) {
  return { type, data };
}

/**
 * For dispatching failed Promises
 * @param {string} type
 * @param {object} param1
 * @returns
 */
export function failed(type, { message }) {
  const error = message;
  return { type, error };
}
