import { nonNull } from '..';

it('returns false when passed null or undefined', () => {
  expect(nonNull(null)).toBe(false);
  expect(nonNull(undefined)).toBe(false);
});

it('returns true when passed anything other than null or undefined', () => {
  expect(nonNull(false)).toBe(true);
  expect(nonNull(0)).toBe(true);
  expect(nonNull(-0)).toBe(true);
  expect(nonNull('')).toBe(true);
  expect(nonNull(NaN)).toBe(true);
  expect(nonNull(true)).toBe(true);
  expect(nonNull(42)).toBe(true);
  expect(nonNull('0')).toBe(true);
  expect(nonNull(Symbol('0'))).toBe(true);
  expect(nonNull({})).toBe(true);
  expect(nonNull([])).toBe(true);
});
