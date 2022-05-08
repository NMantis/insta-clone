import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { RegisterPage } from './register/register.page';
import { LoginPage } from './login/login.page';

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
