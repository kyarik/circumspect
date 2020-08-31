/**
 * Checks whether the specified value is non-null, i.e., neither `null` nor
 * `undefined`. After calling the function, the type of `value` is properly
 * narrowed based on whether `true` or `false` was returned. `nonNull` should
 * be used whenever we have a value that could potentially be `null`,
 * `undefined`, or both and we want to check for that and have its type
 * properly narrowed. The name of this function stems from the `NonNullable`
 * utility type, which excludes `null` and `undefined` from a type.
 * @param value is the value that we want to check for not being `null` or
 *   `undefined`.
 * @returns a boolean indicating whether the passed value is neither `null` nor
 *   `undefined`. This narrows the type of `value` to `T` (i.e., excludes `null`
 *   and `undefined`) when `true` is returned.
 */
export function nonNull<T>(value: T | null | undefined): value is T {
  return value != null;
}
