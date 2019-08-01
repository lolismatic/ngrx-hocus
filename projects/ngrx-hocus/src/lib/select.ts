// tslint:disable:max-line-length
import { SelectMetadata, setMetadataEntries } from './metadata';

function Select<T, Props, K>(mapFn: (state: T, props: Props) => K): (target: any, propertyName: string | symbol) => void;
function Select<T, Props, K, a extends keyof K>(mapFn: (state: T, props: Props) => K, key: a): (target: any, propertyName: string | symbol) => void;
function Select<T, Props, K, a extends keyof K, b extends keyof K[a]>(mapFn: (state: T, props: Props) => K, key1: a, key2: b): (target: any, propertyName: string | symbol) => void;
function Select<T, Props, K, a extends keyof K, b extends keyof K[a], c extends keyof K[a][b]>(mapFn: (state: T, props: Props) => K, key1: a, key2: b, key3: c): (target: any, propertyName: string | symbol) => void;
function Select<T, Props, K, a extends keyof K, b extends keyof K[a], c extends keyof K[a][b], d extends keyof K[a][b][c]>(mapFn: (state: T, props: Props) => K, key1: a, key2: b, key3: c, key4: d): (target: any, propertyName: string | symbol) => void;
function Select<T, Props, K, a extends keyof K, b extends keyof K[a], c extends keyof K[a][b], d extends keyof K[a][b][c], e extends keyof K[a][b][c][d]>(mapFn: (state: T, props: Props) => K, key1: a, key2: b, key3: c, key4: d, key5: e): (target: any, propertyName: string | symbol) => void;
function Select<T, Props, K, a extends keyof K, b extends keyof K[a], c extends keyof K[a][b], d extends keyof K[a][b][c], e extends keyof K[a][b][c][d], f extends keyof K[a][b][c][d][e]>(mapFn: (state: T, props: Props) => K, key1: a, key2: b, key3: c, key4: d, key5: e, key6: f): (target: any, propertyName: string | symbol) => void;
function Select(...args) {
  return (target: any, propertyName: string | symbol) => {
    const metadata = new SelectMetadata(propertyName, args);

    setMetadataEntries(target, [metadata]);
  };
}

export { Select };
