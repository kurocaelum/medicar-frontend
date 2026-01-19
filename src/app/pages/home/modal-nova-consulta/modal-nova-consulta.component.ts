import { Component, Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ConsultaTemp } from '../home.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Agenda, Especialidade, Medico } from 'src/app/shared/interfaces/entities';

@Component({
  selector: 'app-modal-nova-consulta',
  templateUrl: './modal-nova-consulta.component.html',
  styleUrls: ['./modal-nova-consulta.component.css']
})
export class ModalNovaConsultaComponent {

  novaConsultaForm: FormGroup

  especialidades: Especialidade[] = []
  medicos: Medico[] = []
  datas: Agenda[] = []
  horas: string[] | undefined = []

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<ModalNovaConsultaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConsultaTemp
  ) {
    this.novaConsultaForm = formBuilder.group({
      especialidade: [{value: undefined, disabled: false}, Validators.required],
      medico: [{value: undefined, disabled: true}, Validators.required],
      data: [{value: undefined, disabled: true}, Validators.required],
      hora: [{value: undefined, disabled: true}, Validators.required]
    })

    this.loadEspecialidades()
  }

  disableSelect(select: string) {
    this.novaConsultaForm.controls[select].reset('')
    this.novaConsultaForm.controls[select].markAsPristine()
    this.novaConsultaForm.controls[select].markAsUntouched()
    this.novaConsultaForm.controls[select].disable()
  }

  public changeEspecialidade() {
    console.log("especialidade " + this.novaConsultaForm.controls['especialidade'].value)
    
    this.disableSelect('medico')
    this.disableSelect('data')
    this.disableSelect('hora')
    
    if (this.novaConsultaForm.controls['especialidade'].value != undefined) {
      this.novaConsultaForm.controls['medico'].enable()
      this.loadMedicos()
    }    
  }

  public changeMedico() {
    console.log("medico " + this.novaConsultaForm.controls['medico'].value)
    
    this.disableSelect('data')
    this.disableSelect('hora')
    
    if (this.novaConsultaForm.controls['medico'].value != undefined) {
      this.novaConsultaForm.controls['data'].enable()
      this.loadDatas()
    }    
  }
  
  public changeData() {
    console.log("data " + this.novaConsultaForm.controls['data'].value)
    
    this.disableSelect('hora')
    
    if (this.novaConsultaForm.controls['data'].value != undefined) {
      this.novaConsultaForm.controls['hora'].enable()
      this.loadHorarios()
    }    
  }
  
  loadEspecialidades() {
    this.authService.getEspecialidades().subscribe(
      res => { this.especialidades = res }
    )
  }

  loadMedicos() {
    const especialidadeOption = this.especialidades.find(option => option.nome.includes(this.novaConsultaForm.controls['especialidade'].value))
    
    this.authService.getMedicosByEspecialidade(especialidadeOption?.id).subscribe(
      res => { this.medicos = res }
    )
  }
  
  loadDatas() {
    const medicoOption = this.medicos.find(option => option.nome.includes(this.novaConsultaForm.controls['medico'].value))
    
    this.authService.getAgendasByMedico(medicoOption?.id).subscribe(
      res => { this.datas = res }
    )
  }

  loadHorarios() {
    const dataOption = this.datas.find(option => option.dia.includes(this.novaConsultaForm.controls['data'].value))
    this.horas = dataOption?.horarios
  }

}
