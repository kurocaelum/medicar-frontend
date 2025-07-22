import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hidePassword: boolean = false

  public hide(): boolean {
    if(!this.hidePassword) {
      this.hidePassword = !this.hidePassword
      return false
    }

    this.hidePassword = !this.hidePassword
    return true
  }

}
