import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileResolver } from 'src/app/resolvers/profile.resolver';
import { MyProfilePage } from './my-profile.page';

const routes: Routes = [
  {
    path: ':username',
    component: MyProfilePage,
    resolve: { data: ProfileResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfilePageRoutingModule {}
