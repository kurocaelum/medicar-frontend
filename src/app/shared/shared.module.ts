import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonSecondaryComponent } from './button-secondary/button-secondary.component';
import { ButtonPrimaryComponent } from './button-primary/button-primary.component';



@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonPrimaryComponent,
    ButtonSecondaryComponent
  ],
  exports: [
    ButtonPrimaryComponent,
    ButtonSecondaryComponent
  ]
})
export class SharedModule { }
