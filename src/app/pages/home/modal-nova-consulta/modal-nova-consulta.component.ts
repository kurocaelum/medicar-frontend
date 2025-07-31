import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Consulta } from '../home.component';

@Component({
  selector: 'app-modal-nova-consulta',
  templateUrl: './modal-nova-consulta.component.html',
  styleUrls: ['./modal-nova-consulta.component.css']
})
export class ModalNovaConsultaComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalNovaConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Consulta
  ) {}

}
