import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Consulta, User } from '../shared/interfaces/entities';

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

  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 4000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['login-snackbar']
    })
  }
  
}
