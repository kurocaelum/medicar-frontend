import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar} from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword: boolean = true
  loginForm: FormGroup = this.formBuilder.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ){}

  public onSubmit(){
    if(this.loginForm.valid) 
      this.authService.login({
        username: this.loginForm.value.login,
        password: this.loginForm.value.password
      }).subscribe({
        next: res => {
          this.openSnackBar('Login bem sucedido!')
          return res
        },
        error: err => {
          this.openSnackBar('Falha no login.')
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

  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['login-snackbar']
    })
  }

}
