import { assertNever } from '..';

it('throws when called', () => {
  expect(() => assertNever(10 as never)).toThrow();
});
