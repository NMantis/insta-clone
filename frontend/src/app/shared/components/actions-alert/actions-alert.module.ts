import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsAlertComponent } from './actions-alert.component';

@NgModule({
  imports: [ SharedModule ],
  declarations: [ActionsAlertComponent],
  exports: [ActionsAlertComponent]
})
export class ActionsAlertModule {}
