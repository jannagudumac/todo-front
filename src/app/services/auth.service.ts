import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environment/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiURL = environment.apiUrl + '/auth/login';
  private baseUrl = 'http://localhost:8080'; 

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${this.baseUrl}/auth/login`, {
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
}
