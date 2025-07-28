import { Component } from '@angular/core';

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

  displayedColumns: string[] = ['especialidade', 'profissional', 'data', 'hora', 'action'];
  dataSource = ELEMENT_DATA;

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
