import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FollowerModalComponent } from './follower-modal.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    FollowerModalComponent
  ],
  exports: [FollowerModalComponent]
})
export class FollowerModalModule { }
