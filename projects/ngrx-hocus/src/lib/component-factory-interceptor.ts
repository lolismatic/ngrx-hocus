import { Injectable, Injector, ComponentFactoryResolver, SkipSelf, Optional } from '@angular/core';

@Injectable()
export class HocusComponentFactoryInterceptor {
  constructor(
     @SkipSelf() @Optional() private readonly parentInjector: Injector,
     private readonly injector: Injector,
     private readonly componentFactoryResolver: ComponentFactoryResolver,
     @SkipSelf() @Optional() private readonly parentComponentFactoryResolver: ComponentFactoryResolver
  ) {}

  intercept() {
    console.log(this);
  }
}
