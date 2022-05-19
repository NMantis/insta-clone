import { NgModule } from '@angular/core';
import { ProfileLayoutModule } from 'src/app/shared/components/profile-layout/profile-layout.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MyProfilePageRoutingModule } from './my-profile-routing.module';
import { MyProfilePage } from './my-profile.page';

@NgModule({
  imports: [
    SharedModule,
    ProfileLayoutModule,
    MyProfilePageRoutingModule
  ],
  declarations: [MyProfilePage]
})
export class MyProfilePageModule {}
