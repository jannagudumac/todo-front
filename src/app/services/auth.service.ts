/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiURL = environment.apiUrl + '/auth/login';


  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.apiURL}/auth/login`, {
      username,
      password
    });
  }

  saveToken(token: string) {
    sessionStorage.setItem('jwt', token);
  }

  getToken() {
    return sessionStorage.getItem('jwt');
  }

  logout() {
    sessionStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
} */



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl+'/api/login'; // URL de votre backend Spring

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        // À la réception de la réponse, on stocke le token
        localStorage.setItem('authToken', response.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    // ... rediriger vers la page de login
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
}
