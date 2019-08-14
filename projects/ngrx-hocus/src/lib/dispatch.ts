import { Type } from '@angular/core';
import { Action } from '@ngrx/store';

import { setMetadataEntries, DispatchMetadata } from './metadata';

export type DispatchFrom<ActionType extends Action> = (action: Type<ActionType>) => (target: any, propertyName: string | symbol) => void;

export function Dispatch(action: Type<Action>) {
  return (target: any, propertyName: string | symbol) => {
    const metadata = new DispatchMetadata(propertyName, action);

    setMetadataEntries(target, [metadata]);
  };
}

