# circumspect

`circumspect` is a set of functions to make your TypeScript/JavaScript code safer. These functions include `invariant`, `warning`, `assertNever`, and more.

## Why this library exists?

There are many helpful functions that can make your code safer, such as `invariant` and `assertNever`. Many of these functions are available as separate npm packages (for example, [`invariant`](https://www.npmjs.com/package/invariant)). But installing a new package (and most of the time the `@types` counterpart as well) for each function is not very convinient. Also, those packages generally export their functions as default exports, making VSCode auto-import not work well with them.

This library unifies the functions that make you code safer into a single place. `circumspect` is a single dependency that has them all. And VSCode auto-import works as expected because all function provided by `circumspect` are named exports.

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

- `invariant`
- `assertNever`
- `notNull`
- `warning`

### `invariant`

```ts
invariant(value: unknown, message?: string): asserts value
```

#### Parameters

- `value: unknown` is the value that we want to ensure to be [truthy](https://developer.mozilla.org/en-US/docs/Glossary/truthy).

- `message?: string` is an optional error message that will be part of the error that is thrown in case `value` is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy). This message is only displayed in development. In production, only a generic error is shown instead (`'Invariant violation'`) and the `message` parameter is ignored.

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

### `assertNever`

```ts
assertNever(value: never): never
```

### `notNull`

```ts
notNull<T>(value: T | null | undefined): value is T
```

### `warning`

```ts
warning(valueToCheck: unknown, message?: string): void
```

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
