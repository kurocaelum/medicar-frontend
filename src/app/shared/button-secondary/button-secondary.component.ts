import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-secondary',
  templateUrl: './button-secondary.component.html',
  styleUrls: ['./button-secondary.component.css']
})
export class ButtonSecondaryComponent {

  @Input()
  label: string = ""

}
