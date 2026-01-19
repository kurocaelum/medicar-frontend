import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalNovaConsultaComponent } from './modal-nova-consulta/modal-nova-consulta.component';
import { AuthService } from 'src/app/services/auth.service';
import { Consulta } from 'src/app/shared/interfaces/entities';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';

export interface ConsultaTemp {
  especialidade: string,
  profissional: string,
  data: string,
  hora: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  userId!: string
  username: string = ""
  consultas: Consulta[] = []

  /* Tabela */  
  displayedColumns: string[] = ['especialidade', 'profissional', 'data', 'hora', 'action'];
  dataSource = new ConsultaDataSource([])

  constructor(
    public dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getUserIdFromToken()
    this.authService.getUserByUserId(this.userId)?.subscribe(
      res => this.username = res.username
    )
    this.authService.getConsultasByUserId(this.userId)?.subscribe(
      res => {
        this.consultas = res
        this.dataSource.setData(this.consultas)
      }
    )
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNovaConsultaComponent)
  }

  public logout(): void {
    this.authService.logout()
  }

  public desmarcarConsulta(consultaId: string) {
    this.authService.desmarcarConsulta(consultaId).subscribe(
      res => res
    )
  }

}

class ConsultaDataSource extends DataSource<Consulta> {
  private dataStream = new ReplaySubject<Consulta[]>()

  constructor(initialData: Consulta[]) {
    super()
    this.setData(initialData)
  }

  connect(): Observable<Consulta[]> {
    return this.dataStream;
  }

  disconnect() {}

  setData(data: Consulta[]) {
    this.dataStream.next(data)
  }

}