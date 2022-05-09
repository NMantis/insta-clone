import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileResolver } from 'src/app/resolvers/profile.resolver';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: ':user_id',
    component: Tab3Page,
    resolve: { data: ProfileResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
