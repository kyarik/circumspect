export function warning(value: unknown, message: string) {
  if (__DEV__) {
    if (value) {
      return;
    }

    console.error(`Warning. ${message}`);
  }
}
