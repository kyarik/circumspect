import { assert, IsExact } from 'conditional-type-checks';
import { nonNull } from '..';

type NonNullValue =
  | true
  | 42
  | '0'
  | { name: string }
  | number[]
  | false
  | 0
  | -0
  | '';
type NullValue = null | undefined;
type Value = NonNullValue | NullValue;

declare const value: Value;

if (nonNull(value)) {
  assert<IsExact<typeof value, NonNullValue>>(true);
} else {
  assert<IsExact<typeof value, NullValue>>(true);
}
