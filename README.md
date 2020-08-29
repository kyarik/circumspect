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

- `assertNever`
- `invariant`
- `notNull`
- `warning`

### `assertNever`

```ts
assertNever(value: never): never
```

### `invariant`

```ts
invariant(valueToCheck: unknown, message?: string): asserts valueToCheck
```

### `notNull`

```ts
notNull<T>(value: T | null | undefined): value is T
```

### `warning`

```ts
warning(valueToCheck: unknown, message?: string): void
```

## Contributing

Pull requests are very welcome. If you intend to introduce a major change, please open a related issue first in which we can discuss what you would like to change.

Please make sure to update the tests and the README as appropriate.

## License

[MIT](https://github.com/kyarik/circumspect/blob/master/LICENSE)
