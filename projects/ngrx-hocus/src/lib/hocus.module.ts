import { NgModule } from '@angular/core';

import { RouterOutletApplierDirective } from './directives/router-outlet-applier.directive';

@NgModule({
  declarations: [RouterOutletApplierDirective],
  exports: [RouterOutletApplierDirective]
})
export class HocusModule {

}
