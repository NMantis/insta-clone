import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  exports: [ ]
})
export class AuthModule { }
