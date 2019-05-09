import { Type } from '@angular/core';
import { Action } from '@ngrx/store';

export class ListenMetadata {
  constructor(
    public readonly propertyName,
    public readonly actions: Type<Action>[]
  ) { }
}
