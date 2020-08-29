export function warning(valueToCheck: unknown, message: string) {
  if (__DEV__) {
    if (valueToCheck) {
      return;
    }

    console.error(`Warning: ${message}`);
  }
}
