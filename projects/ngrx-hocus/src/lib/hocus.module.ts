import { NgModule, ModuleWithProviders } from '@angular/core';
import { HocusComponentFactoryInterceptor } from './component-factory-interceptor';
import { HocusComponentFactoryBinder } from './component-factory-binder';

@NgModule({})
export class HocusModule {
  constructor(interceptor: HocusComponentFactoryInterceptor) {
    interceptor.intercept();
  }

  public static forFeature(): ModuleWithProviders {
    return {
      ngModule: HocusModule,
      providers: [HocusComponentFactoryInterceptor]
    };
  }

  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: HocusModule,
      providers: [HocusComponentFactoryBinder, HocusComponentFactoryInterceptor]
    };
  }
}
