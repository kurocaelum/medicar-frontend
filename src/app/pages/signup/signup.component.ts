import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hidePassword: boolean = true
  hidePasswordConfirm: boolean = true
  signupForm: FormGroup = this.formBuilder.group({
    nome: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    passwordConfirm: ['', Validators.required]
  })

  constructor(private router: Router, private formBuilder: FormBuilder){}

  public onSubmit(){
    if(this.signupForm.valid)
      this.router.navigate(['/home'])
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

}
