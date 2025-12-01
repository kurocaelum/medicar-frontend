import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AuthService } from 'src/app/services/auth.service';

export class FormErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class ValidParentStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.parent && control.parent.invalid && (control.dirty || control.touched || isSubmitted))
  }
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hidePassword: boolean = true
  hidePasswordConfirm: boolean = true
  
  formMatcher = new FormErrorStateMatcher()
  parentMatcher = new ValidParentStateMatcher()
  
  signupForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    passwordGroup: this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      passwordConfirm: ['', Validators.required]
    }, { validator: this.passwordMatchValidator })
  },)

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ){}

  passwordMatchValidator(group: AbstractControl) {
    const password = group.get('password')?.value
    const passwordConfirm = group.get('passwordConfirm')?.value

    return password === passwordConfirm ? null : { mismatch: true }
  }

  public onSubmit(){
    if(this.signupForm.valid)
      this.authService.register({
        username: this.signupForm.value.username,
        password: this.signupForm.value.passwordGroup.password,
        email: this.signupForm.value.email
      }).subscribe({
        next: res => {
          this.openSnackBar('Cadastrado com sucesso!')
          return res
        },
        error: err => {
          console.log(err)
          this.openSnackBar('Erro no cadastro.')
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
    this.authService.openSnackBar(message)
  }

}
