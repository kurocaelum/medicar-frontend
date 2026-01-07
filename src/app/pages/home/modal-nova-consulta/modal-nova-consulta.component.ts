import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ConsultaTemp } from '../home.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal-nova-consulta',
  templateUrl: './modal-nova-consulta.component.html',
  styleUrls: ['./modal-nova-consulta.component.css']
})
export class ModalNovaConsultaComponent {
  
  novaConsultaForm: FormGroup

  // TODO receber dinamicamente do backend
  // TODO lazy load? (carrega do back apenas se o form de cima for selecionado)
  especialidades = ['Pediatria', 'Pediatria', 'Pediatria']
  medicos = ['Dr. Caio Carlos Ferreira', 'Dr. Caio Carlos Ferreira', 'Dr. Caio Carlos Ferreira']
  datas = ['01/01/2001', '01/01/2001', '01/01/2001']
  horas = ['13:00', '13:00', '13:00']

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalNovaConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConsultaTemp
  ) {
    this.novaConsultaForm = formBuilder.group({
      especialidade: [{value: '', disabled: false}, Validators.required],
      medico: [{value: '', disabled: true}, Validators.required],
      data: [{value: '', disabled: true}, Validators.required],
      hora: [{value: '', disabled: true}, Validators.required]
    })
  }

  public updateInputs(): void {
    if(this.novaConsultaForm.controls['especialidade'].pristine) 
      this.disableSelect('medico')
    else
      this.novaConsultaForm.controls['medico'].enable()
    
    if(this.novaConsultaForm.controls['medico'].pristine) 
      this.disableSelect('data')
    else
      this.novaConsultaForm.controls['data'].enable()

    if(this.novaConsultaForm.controls['data'].pristine) 
      this.disableSelect('hora')
    else
      this.novaConsultaForm.controls['hora'].enable()
  }

  public resetSelect(select: string) {
    this.novaConsultaForm.controls[select].reset('')
    this.novaConsultaForm.controls[select].markAsPristine()
    this.novaConsultaForm.controls[select].markAsUntouched()
    this.updateInputs()
  }

  disableSelect(select: string) {
    this.novaConsultaForm.controls[select].reset('')
    this.novaConsultaForm.controls[select].markAsPristine()
    this.novaConsultaForm.controls[select].markAsUntouched()
    this.novaConsultaForm.controls[select].disable()
  }
  

}
