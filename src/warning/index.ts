/**
 * Issues a warning to the console with the given `message` if the specified
 * `value` is [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).
 * The warning is issued only in development. In production, this function
 * doesn't do anything. It should be used whenever we want to issue a
 * development-only warning if some value is falsy, which should help guide
 * developers to fix the non-critical issues being reported in the warning
 * message.
 * @param value is the value that we want to check. If it is falsy, a warning
 *   is issued to the console.
 * @param message is the warning message that will be written to the console.
 */
export function warning(value: unknown, message: string) {
  if (__DEV__) {
    if (value) {
      return;
    }

    console.warn(`Warning. ${message}`);
  }
}
