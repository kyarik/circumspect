/**
 * Ensures that the specified `value` is truthy. If that's not the case,
 * it throws an error containing the specified `message` (in development only).
 * This function properly narrows the type of `value` by excluding all falsy
 * values (e.g., `null` and `undefined`).
 * It should be used whenever we have a value that could potentially
 * be falsy, but we are confident that in a particular circumstance, the value
 * must be truthy. That is, the fact that the value is truthy is an invariant,
 * and if it ever happens that the value is falsy, the invariant has been violated,
 * and thus an error must be thrown.
 *
 * @param value is the value that we want to ensure to be
 *   [truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy).
 * @param message is an optional error message that will be part of the error that
 *   is thrown in case `value` is
 *   [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).
 *   This message is only displayed in development. In production, only a generic
 *   error is shown instead (`'Invariant violation'`) and the `message` parameter
 *   is ignored.
 * @returns this function simply narrows the type of `value` to be truthy and doesn't
 *   return anything.
 */
export function invariant(value: unknown, message?: string): asserts value {
  if (value) {
    return;
  }

  if (__DEV__) {
    throw new Error(`Invariant violation. ${message || ''}`);
  }

  throw new Error('Invariant violation');
}
