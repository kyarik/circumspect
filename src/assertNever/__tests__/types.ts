import { assert, IsExact } from 'conditional-type-checks';
import { assertNever } from '..';

declare const value: never;

const result = assertNever(value);

assert<IsExact<typeof result, never>>(true);
