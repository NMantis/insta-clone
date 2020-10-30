import { RegisterPage } from './register/register.page';
import { LoginPage } from 'src/app/pages/auth/login/login.page';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  declarations: [
    LoginPage,
    RegisterPage
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  exports: [ ]
})
export class AuthModule { }
