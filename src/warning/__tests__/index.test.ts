import { warning } from '..';

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

beforeEach(() => {
  global.__DEV__ = false;

  consoleErrorSpy.mockClear();
});

it('issues a warning in development when passed a falsy value', () => {
  global.__DEV__ = true;

  const message = 'Custom warning message.';

  warning(false, message);

  expect(consoleErrorSpy).toHaveBeenCalledTimes(1);
  expect(consoleErrorSpy).toHaveBeenCalledWith(
    expect.stringContaining(message),
  );
});

it('does not issue a warning in development when passed a truthy value', () => {
  global.__DEV__ = true;

  const message = 'Custom warning message.';

  warning(true, message);

  expect(consoleErrorSpy).not.toHaveBeenCalled();
});

it('does not issue a warning in production whether passed a truthy or falsy value', () => {
  const message = 'Custom warning message.';

  warning(true, message);
  warning(false, message);

  expect(consoleErrorSpy).not.toHaveBeenCalled();
});
