import { Injectable, ComponentFactoryResolver, Optional, ComponentFactory, ComponentRef } from '@angular/core';
import { HocusComponentFactoryBinder } from './component-factory-binder';


@Injectable()
export class HocusComponentFactoryInterceptor {
  constructor(
    private readonly componentFactoryBinder: HocusComponentFactoryBinder,
    @Optional() private readonly componentFactoryResolver: ComponentFactoryResolver) {}

  intercept() {
    const interceptedResolveComponentFactory = this.componentFactoryResolver.resolveComponentFactory.bind(this.componentFactoryResolver);

    this.componentFactoryResolver.resolveComponentFactory = (type) => {
      const componentFactory: ComponentFactory<any> = interceptedResolveComponentFactory(type);

      const create = componentFactory.create.bind(componentFactory);

      componentFactory.create = (injector, projectableNodes, rootSelectorOrNode, ngModule) => {
        const componentRef: ComponentRef<any> = create(injector, projectableNodes, rootSelectorOrNode, ngModule);

        this.componentFactoryBinder.bind(componentRef);

        return componentRef;
      };

      return componentFactory;
    };
  }
}
