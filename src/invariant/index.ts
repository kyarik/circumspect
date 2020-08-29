export function invariant(
  valueToCheck: unknown,
  message?: string,
): asserts valueToCheck {
  if (valueToCheck) {
    return;
  }

  if (__DEV__) {
    throw new Error(
      `Invariant violation: ${message || 'No message specified.'}`,
    );
  }

  throw new Error('Invariant violation');
}
