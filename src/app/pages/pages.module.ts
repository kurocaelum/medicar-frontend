import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { SignupComponent } from './signup/signup.component';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class PagesModule { }
