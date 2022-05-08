import { NgModule } from '@angular/core';
import { Tab1Page } from './tab1.page';
import { Tab1PageRoutingModule } from './tab1-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsAlertModule } from 'src/app/shared/components/actions-alert/actions-alert.module';

@NgModule({
  imports: [
    SharedModule,
    Tab1PageRoutingModule,
    ActionsAlertModule
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
