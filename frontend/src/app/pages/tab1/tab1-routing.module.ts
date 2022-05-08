import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageResolver } from 'src/app/resolvers/home.resolver';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    resolve: { posts: HomePageResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
