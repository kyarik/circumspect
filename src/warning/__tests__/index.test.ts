import { warning } from '..';

const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();

beforeEach(() => {
  global.__DEV__ = false;

  consoleWarnSpy.mockClear();
});

it('issues a warning in development when passed a falsy value', () => {
  global.__DEV__ = true;

  const message = 'Custom warning message.';

  warning(false, message);

  expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
  expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining(message));
});

it('does not issue a warning in development when passed a truthy value', () => {
  global.__DEV__ = true;

  const message = 'Custom warning message.';

  warning(true, message);

  expect(consoleWarnSpy).not.toHaveBeenCalled();
});

it('does not issue a warning in production whether passed a truthy or falsy value', () => {
  const message = 'Custom warning message.';

  warning(true, message);
  warning(false, message);

  expect(consoleWarnSpy).not.toHaveBeenCalled();
});
