import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ModalNovaConsultaComponent } from './home/modal-nova-consulta/modal-nova-consulta.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    RouterModule
  ],
  declarations: [
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ModalNovaConsultaComponent
  ],
  exports: [
    LoginComponent
  ]
})
export class PagesModule { }
