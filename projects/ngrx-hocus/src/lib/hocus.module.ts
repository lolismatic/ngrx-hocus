import { NgModule, ModuleWithProviders, Type, Injector, ComponentFactoryResolver } from '@angular/core';
import { HocusComponentFactoryInterceptor } from './component-factory-interceptor';

@NgModule({})
export class HocusModule {
  constructor(interceptor: HocusComponentFactoryInterceptor) {
    interceptor.intercept();
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HocusModule,
      providers: [HocusComponentFactoryInterceptor]
    };
  }
}
