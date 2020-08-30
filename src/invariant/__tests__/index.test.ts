import { invariant } from '..';

beforeEach(() => {
  global.__DEV__ = false;
});

it('throws an error when passed a falsy value', () => {
  expect(() => invariant(false)).toThrow();
  expect(() => invariant(0)).toThrow();
  expect(() => invariant(-0)).toThrow();
  expect(() => invariant('')).toThrow();
  expect(() => invariant(null)).toThrow();
  expect(() => invariant(undefined)).toThrow();
  expect(() => invariant(NaN)).toThrow();
});

it('throws an error containing the custom message in development', () => {
  global.__DEV__ = true;

  const message = 'Custom error message!';

  expect(() => invariant(false, message)).toThrow(message);
});

it('throws a generic error ignoring the custom message in production', () => {
  global.__DEV__ = false;

  expect(() => invariant(false, 'Custom error message!')).toThrow(
    new Error('Invariant violation.'),
  );
});

it('does not throw an error when passed a truthy value', () => {
  expect(() => invariant(true)).not.toThrow();
  expect(() => invariant(42)).not.toThrow();
  expect(() => invariant('0')).not.toThrow();
  expect(() => invariant(Symbol('0'))).not.toThrow();
  expect(() => invariant({})).not.toThrow();
  expect(() => invariant([])).not.toThrow();
});
