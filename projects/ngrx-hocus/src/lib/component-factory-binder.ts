import { Injectable, ComponentRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { getDecoratorMetadata, SelectMetadata, DispatchMetadata } from './metadata';

@Injectable()
export class HocusComponentFactoryBinder {
  constructor(private readonly store: Store<any>) {}

  bind(component: ComponentRef<any>) {
    const metadatas = getDecoratorMetadata(component.instance);
    const subscriptions = new Subscription();

    metadatas.forEach(metadata => {
      if (metadata instanceof SelectMetadata) {
        subscriptions.add(
          this.store.select(...metadata.selector).subscribe(value => component.instance[metadata.propertyName] = value)
        );
      } else if (metadata instanceof DispatchMetadata) {
        component.instance[metadata.propertyName] =
          (...args) => { this.store.dispatch(new metadata.action(...args)); };
      }
    });

    component.onDestroy(() => { subscriptions.unsubscribe(); });
  }
}
