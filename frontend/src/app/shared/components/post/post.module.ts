import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsAlertModule } from '../actions-alert/actions-alert.module';
import { PostComponent } from './post.component';

@NgModule({
  imports: [
    SharedModule,
    ActionsAlertModule
  ],
  declarations: [PostComponent],
  exports: [PostComponent]
})
export class PostModule { }
