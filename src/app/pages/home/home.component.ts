import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { ModalNovaConsultaComponent } from './modal-nova-consulta/modal-nova-consulta.component';
import { AuthService } from 'src/app/services/auth.service';

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

export class HomeComponent implements OnInit {

  /* Tabela */
  displayedColumns: string[] = ['especialidade', 'profissional', 'data', 'hora', 'action'];
  dataSource = ELEMENT_DATA;

  /* Dialog */
  novaConsulta: Consulta = <Consulta>{}

  username!: String

  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken()
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNovaConsultaComponent, {
      data: this.novaConsulta
    })
  }

  public logout(): void {
    this.authService.logout()
  }

}
