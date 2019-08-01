// tslint:disable:max-line-length
// tslint:disable:only-arrow-functions
import { SelectMetadata, setMetadataEntries } from './metadata';

export type SelectFrom<State> =
  (<a extends keyof State>(key: a) => (target: any, propertyName: string | symbol) => void) &
  (<a extends keyof State, b extends keyof State[a]>(key1: a, key2: b) => (target: any, propertyName: string | symbol) => void) &
  (<a extends keyof State, b extends keyof State[a], c extends keyof State[a][b]>(key1: a, key2: b, key3: c) => (target: any, propertyName: string | symbol) => void) &
  (<a extends keyof State, b extends keyof State[a], c extends keyof State[a][b], d extends keyof State[a][b][c]>(key1: a, key2: b, key3: c, key4: d) => (target: any, propertyName: string | symbol) => void) &
  (<a extends keyof State, b extends keyof State[a], c extends keyof State[a][b], d extends keyof State[a][b][c], e extends keyof State[a][b][c][d]>(key1: a, key2: b, key3: c, key4: d, key5: e) => (target: any, propertyName: string | symbol) => void) &
  (<a extends keyof State, b extends keyof State[a], c extends keyof State[a][b], d extends keyof State[a][b][c], e extends keyof State[a][b][c][d], f extends keyof State[a][b][c][d][e]>(key1: a, key2: b, key3: c, key4: d, key5: e, key6: f) => (target: any, propertyName: string | symbol) => void);

export function SelectDecorator(...args) {
  return (target: any, propertyName: string | symbol) => {
    const metadata = new SelectMetadata(propertyName, args);

    setMetadataEntries(target, [metadata]);
  };
}
