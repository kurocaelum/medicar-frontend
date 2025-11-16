import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hidePassword: boolean = true
  hidePasswordConfirm: boolean = true
  signupForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ){}

  public onSubmit(){
    if(this.signupForm.valid)
      this.authService.register({
        username: this.signupForm.value.username,
        password: this.signupForm.value.password,
        email: this.signupForm.value.email
      }).subscribe({
        next: res => {
          this.openSnackBar('Cadastrado com sucesso!')
          return res
        },
        error: err => {
          this.openSnackBar(err)
          return err
        }
      })
  }

  public hide(): boolean {
    if(this.hidePassword) {
      this.hidePassword = !this.hidePassword
      return true
    }

    this.hidePassword = !this.hidePassword
    return false
  }
  
  public hideConfirm(): boolean {
    if(this.hidePasswordConfirm) {
      this.hidePasswordConfirm = !this.hidePasswordConfirm
      return true
    }

    this.hidePasswordConfirm = !this.hidePasswordConfirm
    return false
  }

  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['login-snackbar']
    })
  }

}
