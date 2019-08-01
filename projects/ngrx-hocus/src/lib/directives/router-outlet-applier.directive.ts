import { Directive, OnDestroy, Host } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store, Action } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { map, filter } from 'rxjs/operators';

import { getDecoratorMetadata, SelectMetadata, DispatchMetadata, ListenMetadata } from '../metadata';
import { Subscription } from 'rxjs';

// tslint:disable-next-line:directive-selector
@Directive({ selector: 'router-outlet' })
export class RouterOutletApplierDirective implements OnDestroy {
  subscription = new Subscription();

  constructor(@Host() routerOutlet: RouterOutlet) {
    this.subscription.add(
      routerOutlet
        .activateEvents
        .subscribe(instance => {
          const metadatas = getDecoratorMetadata(instance);

          if (metadatas.length) {
            metadatas.forEach(metadata => {
              // tslint:disable-next-line:no-string-literal
              const { injector } = routerOutlet['activated'];
              const store = injector.get(Store) as Store<any>;
              const actions = injector.get(Actions) as Actions;

              if (metadata instanceof SelectMetadata) {
                const [mapFn, ...keys] = metadata.selector as [(state: any) => any, ...string[]];
                const rabbitHole =
                  keys.reduce(
                    (rh: (state: any) => any, cur) => state => rh(state)[cur],
                    (state: any) => state
                  );

                instance[metadata.propertyName] = keys.length === 0 ?
                  store.select(mapFn) :
                  store.select(mapFn).pipe(
                    map(rabbitHole)
                  );
              } else if (metadata instanceof DispatchMetadata) {
                instance[metadata.propertyName] = function() {
                  store.dispatch(new metadata.action(...Array.from(arguments)));
                };
              } else if (metadata instanceof ListenMetadata) {
                const { actions: listenActions } = metadata;

                actions.pipe(
                    filter((action: Action | { type: string }) => {
                      if (
                        listenActions.some(
                          listenAction =>
                            action instanceof listenAction ||
                            action.type === listenAction.prototype.type
                        )
                      ) {
                        return true;
                      }
                      return false;
                    })
                  )
                  .subscribe(action => {
                    instance[metadata.propertyName](action);
                  });
              }
            });
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
