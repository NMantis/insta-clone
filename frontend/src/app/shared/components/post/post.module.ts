import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ActionsAlertModule } from '../actions-alert/actions-alert.module';
import { CommentModalComponent } from './comment-modal/comment-modal.component';
import { PostComponent } from './post.component';

@NgModule({
  imports: [
    SharedModule,
    ActionsAlertModule
  ],
  declarations: [
    PostComponent,
    CommentModalComponent
  ],
  exports: [PostComponent]
})
export class PostModule { }
