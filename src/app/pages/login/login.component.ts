import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ){}

  public onSubmit(){
    if(this.loginForm.valid)
      this.authService.login({
        username: this.loginForm.value.login,
        password: this.loginForm.value.password
      }).subscribe({
        next: res => res,
        error: err => err
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

}
