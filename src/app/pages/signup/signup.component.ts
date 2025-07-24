import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  hidePassword: boolean = true
  hidePasswordConfirm: boolean = true

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
