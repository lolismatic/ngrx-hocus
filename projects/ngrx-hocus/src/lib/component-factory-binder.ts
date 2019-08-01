import { Injectable, ComponentRef, Type } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { map, filter } from 'rxjs/operators';
import { Actions } from '@ngrx/effects';

import { getDecoratorMetadata, SelectMetadata, DispatchMetadata, ListenMetadata } from './metadata';

@Injectable()
export class HocusComponentFactoryBinder {
  constructor(private readonly store: Store<any>, private readonly actions: Actions) {}

  bind(component: ComponentRef<any>) {
    const metadatas = getDecoratorMetadata(component.instance);

    metadatas.forEach(metadata => {
      this.apply(metadata, component.instance);
    });
  }

  private apply(metadata: any, instance: any) {
    if (metadata instanceof SelectMetadata) {
      const [mapFn, ...keys] = metadata.selector as [(state: any) => any, ...string[]];
      const rabbitHole =
        keys.reduce(
          (rh: (state: any) => any, cur) => state => rh(state)[cur],
          (state: any) => state
        );

      const selected = keys.length === 0 ?
        this.store.select(mapFn) :
        this.store.select(mapFn).pipe(
          map(rabbitHole)
        );

      selected.subscribe(value => {
        setTimeout(() => instance[metadata.propertyName] = value);
      });
    } else if (metadata instanceof DispatchMetadata) {
      instance[metadata.propertyName] = (...args) => {
        setTimeout(() => this.store.dispatch(new metadata.action(...args)));
      };
    } else if (metadata instanceof ListenMetadata) {
      const { actionTypes } = metadata;

      this.actions
        .pipe(filter((action: { type: string }) => action.type && actionTypes.includes(action.type)))
        .subscribe(action => {
          setTimeout(() => instance[metadata.propertyName](action));
        });
    }
  }
}
