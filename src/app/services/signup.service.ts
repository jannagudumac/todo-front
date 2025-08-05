// signup.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SignupService {
  constructor(private http: HttpClient) {}

  register(data: { username: string; password: string }) {
    return this.http.post(environment.apiUrl+'/auth/signup', data);
  }
}
