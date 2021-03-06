# circumspect

`circumspect` is a set of functions to make your TypeScript/JavaScript code safer. These functions include `invariant`, `warning`, `assertNever`, and more.

## Why this library exists?

There are many helpful functions that can make your code safer, such as `invariant` and `assertNever`. Many of these functions are available as separate npm packages (for example, [`invariant`](https://www.npmjs.com/package/invariant)). But installing a new package (and most of the time the `@types` counterpart as well) for each function is not very convenient. Also, those packages generally export their functions as default exports, making VSCode auto-import not work well with them.

This library unifies the functions that make your code safer into a single place. `circumspect` is a single dependency that has them all. And VSCode auto-import works as expected because all functions provided by `circumspect` are named exports.

Moreover, `circumspect` is 100% written in TypeScript, so every function is properly typed by default. So, there's no need to install separate `@types` packages.

## Installation

Using yarn:

```
yarn add circumspect
```

Using npm:

```
npm install circumspect
```

## API

- [`invariant`](#invariant)
- [`warning`](#warning)
- [`assertNever`](#assertnever)
- [`nonNull`](#nonnull)

### `invariant`

```ts
invariant(value: unknown, message?: string): asserts value
```

#### Parameters

- `value: unknown` is the value that we want to ensure to be [truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy).

- `message?: string` is an optional error message that will be included in the error that is thrown when the passed `value` is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy). This custom error message is displayed only in development. In production, a generic error is shown instead (`'Invariant violation'`) and the `message` parameter is ignored.

#### Return value

- `asserts value` which means that the function simply narrows the type of `value` to be truthy and doesn't return anything.

#### Description

`invariant` ensures that the specified `value` is truthy. If that's not the case, it throws an error containing the specified `message` (in development only). This function properly narrows the type of `value` by excluding all falsy values (e.g., `null` and `undefined`).

`invariant` should be used whenever we have a value that could potentially be falsy, but we are confident that in a particular circumstance, the value must be truthy. That is, the fact that the value is truthy is an invariant, and if it ever happens that the value is falsy, the invariant has been violated, and thus an error must be thrown.

Since the `message` argument is completely ignored in production, you might want to strip it from your code completely in production builds. To see how to do that, see the [Optimizations](#optimizations) section.

#### Example

```ts
declare const user: User | null | undefined;

invariant(user, 'The user is missing!');

user; // If we get here, the type is narrowed to `User`
```

In this example, the `user` object can potentially be `null` or `undefined` (i.e., falsy). If that's the case, we have an invariant violation, and the `invariant` function will throw. Otherwise, it simply returns and we know that `user` actually points to a user object.

### `warning`

```ts
warning(value: unknown, message: string): void
```

#### Parameters

- `value: unknown` is the value that we want to check. If it is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy), a warning is issued to the console.

- `message: string` is the warning message that will be written to the console.

#### Return value

- `void` the function doesn't return anything.

#### Description

`warning` issues a warning to the console with the given `message` if the specified `value` is falsy. The warning is issued only in development. In production, this function doesn't do anything.

It should be used whenever we want to issue a development-only warning if some value is falsy, which should help guide developers to fix the non-critical issues being reported in the warning message.

Since `warning` doesn't do anything in production, you might want to remove calls to this function completely from your code in production builds. To see how to do that, see the [Optimizations](#optimizations) section.

#### Examples

```ts
declare const mode: 'auto' | 'default' | 'slow' | 'fast';

warning(
  mode !== 'auto',
  'Mode "auto" has been deprecated. Please use "default" instead.',
);
```

In this example, we want to issue a deprecation warning if the `mode` is `'auto'`. To do so, we need to pass a falsy value, that's why we pass `mode !== 'auto'`, which is falsy only when the `mode` is `'auto'`.

In some cases, it makes sense to pass `false` directly. For example:

```ts
declare const languages: Language[];
declare const defaultLanguage: Language;
declare const langName: string;

let lang = languages.find(({ name }) => name === langName);

if (!lang) {
  warning(
    false,
    `Language with name "${langName}" not found. Falling back to the default language.`,
  );

  lang = defaultLanguage;
}
```

### `assertNever`

```ts
assertNever(value: never): never
```

#### Parameters

- `value: never` is the value after all possible union type variants have been exhausted.

#### Return value

- `never` which means that the function never returns; it just throws an error if ever actually called.

#### Description

`assertNever` should be used to ensure that all variants of a union type have been exhausted.

If all union variants of `value` have been exhausted, there is no compiler error when calling `assertNever` with `value`, since `value` is considered to be of type `never` at that point, and at run time, we never reach the point of calling `assertNever`, meaning that no error will be thrown.

However, if not all union variants have been exhaused, then we are calling `assertNever` with something other than `never` and so there will be a compiler error saying something like

```
Argument of type 'x' is not assignable to parameter of type 'never'.
```

which we can fix by handling the missing variants. You can read more about [union exhaustiveness checking and `assertNever`](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html#union-exhaustiveness-checking) in the TypeScript docs.

#### Example

```tsx
declare const state: 'loading' | 'done' | 'error';

switch (state) {
  case 'loading':
    return <Loading />;
  case 'done':
    return <Done />;
  case 'error':
    return <Error />;
}
```

In this example, we handle all possible states inside the `switch` statement: `'loading'`, `'done'`, and `'error'`.

However, what if in the future we add another state, such as `'pending'`?

The fact that the `switch` statement is not handling `'pending'` would be undetected.

The solution is to have a `default` case in which we assert that all possible states have been handled.

```ts
switch (state) {
  ...
  default:
    return assertNever(state);
}
```

So, when all state variants are handled, we get no compile time error. However, when we add the new `'pending'` state, we will get a compiler error saying:

```
Argument of type 'string' is not assignable to parameter of type 'never'.
```

We can fix this error by handling the `'pending'` state inside the `switch`.

As you can see from this example, `assertNever` is especially useful in `switch` statements where we want to ensure to have handled all possible cases at all times.

### `nonNull`

```ts
nonNull<T>(value: T | null | undefined): value is T
```

#### Parameters

- `value: T | null | undefined` is the value that we want to check for not being `null` or `undefined`.

#### Return value

- `value is T` which means that the function returns a boolean indicating whether the passed value is neither `null` nor `undefined`. This narrows the type of `value` to `T` (i.e., excludes `null` and `undefined`) when `true` is returned.

#### Description

`nonNull` is a predicate function that checks whether the specified value is non-null, i.e., neither `null` nor `undefined`. After calling the function, the type of `value` is properly narrowed based on whether `true` or `false` was returned.

`nonNull` should be used whenever we have a value that could potentially be `null`, `undefined`, or both and we want to check for that and have its type properly narrowed.

The name of this function stems from the `NonNullable` utility type, which excludes `null` and `undefined` from a type.

#### Example

```ts
declare const names: (string | null)[];

const nonNullNames = names.filter(nonNull);

// nonNullNames has type 'string[]'
```

In this example, we have an array of names that can also include some `null` elements. We filter the array for all non-null elements and get back a `string[]`.

If we instead used `names.filter(x => x !== null)`, we would get back non-null elements, but the type would still be `(string | null)[]` since TypeScript sees the function that we pass to `filter` as just returning a `boolean` and so no type narrowing occurs.

## Optimizations

We recommend using [`babel-plugin-dev-expression`](https://www.npmjs.com/package/babel-plugin-dev-expression) to strip the `message` argument passed to `invariant` and to completely remove calls to `warning` in production.

Basically, in production, `babel-plugin-dev-expression` replaces

```ts
invariant(value, 'Value is falsy!');
```

with

```ts
if (!value) {
  invariant(false);
}
```

so the `message` argument is stripped. It also completely removes calls to `warning`. So, lines like this

```ts
warning(value, 'Value is falsy!');
```

are removed.

## Contributing

Pull requests are very welcome. If you intend to introduce a major change, please open a related issue first in which we can discuss what you would like to change.

Please make sure to update the tests and the README as appropriate.

## License

[MIT](https://github.com/kyarik/circumspect/blob/master/LICENSE)
