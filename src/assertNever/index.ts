/**
 * This function should be used to ensure that all variants of a union type have
 * been exhausted. If all union variants of `value` have been exhausted, there
 * is no compiler error when calling `assertNever` with `value`, since `value`
 * is considered to be of type `never` at that point, and at run time, we never
 * reach the point of calling `assertNever`, meaning that no error will be
 * thrown. However, if not all union variants have been exhaused, then we are
 * calling `assertNever` with something other than `never` and so there will be
 * a compiler error saying something like "Argument of type 'x' is not
 * assignable to parameter of type 'never'", which we can fix by handling the
 * missing variants. You can read more about
 * [union exhaustiveness checking and `assertNever`
 * ](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-exhaustiveness-checking)
 * in the TypeScript docs.
 * @param value is the value after all possible union type variants have been
 *   exhausted.
 * @returns never returns; it just throws an error if ever actually called.
 */
export function assertNever(value: never): never {
  throw new Error(`Unexpected ${value}`);
}
