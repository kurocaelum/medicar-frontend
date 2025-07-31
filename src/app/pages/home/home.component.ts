import { Component } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ModalNovaConsultaComponent } from './modal-nova-consulta/modal-nova-consulta.component';

// TODO interfaces definidas no angular para data e hora?
export interface Consulta {
  especialidade: string,
  profissional: string,
  data: string,
  hora: string
}

const ELEMENT_DATA: Consulta[] = [
  {
    especialidade: 'Cardiologia',
    profissional: 'Dr. Caio Carlos Ferreira',
    data: '01/01/2020',
    hora: '13:00'
  },
  {
    especialidade: 'Cardiologia',
    profissional: 'Dr. Caio Carlos Ferreira',
    data: '01/01/2020',
    hora: '13:00'
  },
  {
    especialidade: 'Cardiologia',
    profissional: 'Dr. Caio Carlos Ferreira',
    data: '01/01/2020',
    hora: '13:00'
  },
  {
    especialidade: 'Cardiologia',
    profissional: 'Dr. Caio Carlos Ferreira',
    data: '01/01/2020',
    hora: '13:00'
  }
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {

  /* Tabela */
  displayedColumns: string[] = ['especialidade', 'profissional', 'data', 'hora', 'action'];
  dataSource = ELEMENT_DATA;

  /* Dialog */
  novaConsulta: Consulta = <Consulta>{}
  // especialidadeTemp: string = ""
  // profissionalTemp: string = ""
  // dataTemp: string = ""
  // horaTemp: string = ""
  

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNovaConsultaComponent, {
      data: this.novaConsulta
    })
  }

  // consultas: Consulta[] = []
  // public consultas: Consulta[] = [
  //   {
  //     especialidade: 'Cardiologia',
  //     profissional: 'Dr. Caio Carlos Ferreira',
  //     data: '01/01/2020',
  //     hora: '13:00'
  //   },
  //   {
  //     especialidade: 'Cardiologia',
  //     profissional: 'Dr. Caio Carlos Ferreira',
  //     data: '01/01/2020',
  //     hora: '13:00'
  //   },
  //   {
  //     especialidade: 'Cardiologia',
  //     profissional: 'Dr. Caio Carlos Ferreira',
  //     data: '01/01/2020',
  //     hora: '13:00'
  //   },
  //   {
  //     especialidade: 'Cardiologia',
  //     profissional: 'Dr. Caio Carlos Ferreira',
  //     data: '01/01/2020',
  //     hora: '13:00'
  //   }
  // ]

}
