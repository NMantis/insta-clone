import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    // canActivate: [AuthGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then( m => m.AuthModule)
  },
  /* Redirections */
  {
    path: 'login',
    redirectTo: '/auth/login'
  },
  {
    path: 'register',
    redirectTo: '/auth/register'
  },  {
    path: 'user-posts',
    loadChildren: () => import('./pages/user-posts/user-posts.module').then( m => m.UserPostsPageModule)
  }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
