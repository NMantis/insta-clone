import { NgModule } from '@angular/core';
import { ActivityPageRoutingModule } from './activity-routing.module';
import { ActivityPage } from './activity.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ActivityPageRoutingModule
  ],
  declarations: [ActivityPage]
})
export class ActivityPageModule { }
