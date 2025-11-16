import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "http://localhost:8080";

  constructor(
    private http: HttpClient,
    private router: Router
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


}
