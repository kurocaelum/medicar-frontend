import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Agenda, Consulta, Especialidade, Medico, User } from '../shared/interfaces/entities';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:8080";

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public login(payload: {username: string, password: string}): Observable<any> {
    localStorage.removeItem('access_token')
    
    return this.http.post<{ token: string }>(`${this.url}/auth/login`, payload).pipe(
      map(res => {
        localStorage.setItem('access_token', res.token)

        return this.router.navigate(['/home'])
      }),
      catchError((e: HttpErrorResponse) => {
        if(e.status === 403)
          return throwError(() => "Usuário ou senha incorretos")

        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha ao conectar com servidor")
      })
    )
  }

  public logout() {
    localStorage.removeItem('access_token')
    return this.router.navigate([''])
  }

  public register(payload: {username: string, password: string, email: string}): Observable<any> {
    return this.http.post(`${this.url}/auth/register`, payload).pipe(
      map(res => {
        return this.router.navigate([''])
      }),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha ao conectar com servidor")
      })
    )
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')
    if(!token)
      return false
    const jwtHelper = new JwtHelperService()
    return !jwtHelper.isTokenExpired(token)
  }

  public getUserIdFromToken() {
    if(this.isAuthenticated()) {
      const token = localStorage.getItem('access_token')
      const jwtHelper = new JwtHelperService()
      return jwtHelper.decodeToken(token!).sub
    }
    return ""
  }

  public getUserByUserId(userId: string): Observable<User> | null {
    if(this.isAuthenticated()) {
      return this.http.get<User>(`${this.url}/users/${userId}`).pipe(
        map(res => res),
        catchError(e => {
          if(e.error.message)
            return throwError(() => e.error.message)

          return throwError(() => "Falha ao obter ID de usuário.")
        })
      )
    }

    return null
  }

  public getConsultasByUserId(userId: string): Observable<Consulta[]> | null {
    if(this.isAuthenticated()) {
      return this.http.get<Consulta[]>(`${this.url}/consultas?user=${userId}`).pipe(
        map(res => res),
        catchError(e => {
          if(e.error.message)
            return throwError(() => e.error.message)

          return throwError(() => "Falha ao obter lista de consultas.")
        })
      )
    }

    return null
  }

  public desmarcarConsulta(consultaId: string): Observable<any> {
    return this.http.delete(`${this.url}/consultas/${consultaId}`).pipe(
      map(res => window.location.reload()),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha ao desmarcar consulta.")
      })
    )
  }

  public marcarConsulta(agenda_id: number, horario: string): Observable<any> {    
    const user_id = this.getUserIdFromToken()
    const payload = { agenda_id, horario, user_id }

    return this.http.put(`${this.url}/consultas`, payload).pipe(
      map(res => window.location.reload()),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha ao marcar consulta.")
      })
    )

  }
  
  public getEspecialidades(): Observable<Especialidade[]> {
    return this.http.get<Especialidade[]>(`${this.url}/especialidades`).pipe(
      map(res => res),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha na busca de especialidades.")
      }) 
    )
  }

  public getMedicosByEspecialidade(especialidadeId: number | undefined): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.url}/medicos?especialidade=${especialidadeId}`).pipe(
      map(res => res),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha na busca de medicos.")
      }) 
    )
  }
  
  public getAgendasByMedico(medicoId: number | undefined): Observable<Agenda[]> {
    return this.http.get<Agenda[]>(`${this.url}/agendas?medico=${medicoId}`).pipe(
      map(res => res),
      catchError(e => {
        if(e.error.message)
          return throwError(() => e.error.message)

        return throwError(() => "Falha na busca de agendas.")
      }) 
    )
  }

  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['login-snackbar']
    })
  }
  
}
