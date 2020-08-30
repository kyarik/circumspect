import { assert, IsExact } from 'conditional-type-checks';
import { invariant } from '..';

type TruthyValue = true | 42 | '0' | { name: string } | number[];
type FalsyValue = false | 0 | -0 | '' | null | undefined;
type Value = TruthyValue | FalsyValue;

declare const value: Value;

invariant(value);

assert<IsExact<typeof value, TruthyValue>>(true);
