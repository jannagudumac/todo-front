// signup.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignupService {
  constructor(private http: HttpClient) {}

  register(data: { username: string; password: string }) {
    return this.http.post('http://localhost:8080/auth/signup', data);
  }
}
