import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FollowerModalModule } from '../follower-modal/follower-modal.module';
import { ProfileLayoutComponent } from './profile-layout.component';

@NgModule({
  imports: [
    SharedModule,
    FollowerModalModule
  ],
  declarations: [
    ProfileLayoutComponent
  ],
  exports: [ProfileLayoutComponent]
})
export class ProfileLayoutModule { }
