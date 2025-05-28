import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) { }

  login(credentials: { pseudo: string; password: string }): Observable<void> {
    return this.http.post<{
      token: string;
      pseudo: string;
      firstName: string;
      lastName: string;
    }>(`${environment.apiUrl}/Auth/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('pseudo', res.pseudo);
        localStorage.setItem('firstName', res.firstName);
        localStorage.setItem('lastName', res.lastName);
      }),
      map(() => void 0)
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  register(data: {
    pseudo: string;
    firstName: string;
    lastName: string;
    password: string;
  }): Observable<void> {
    return this.http.post<{
      token: string;
      pseudo: string;
      firstName: string;
      lastName: string; }>(`${environment.apiUrl}/Auth/register`, data).pipe(
      tap(res => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('pseudo', res.pseudo);
        localStorage.setItem('firstName', res.firstName);
        localStorage.setItem('lastName', res.lastName);
      }),
      map(() => void 0)
    );
  }

}
