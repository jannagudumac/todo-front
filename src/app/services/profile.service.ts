import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private apiUrl = environment.apiUrl + '/api/utilisateur-list';

  constructor(private http: HttpClient) {}

  changePassword(currentPassword: string, newPassword: string) {
    return this.http.put(this.apiUrl + '/me/password', { currentPassword, newPassword }, { responseType: 'text' });
  }

  changeEmail(newEmail: string) {
    return this.http.put(this.apiUrl + '/me/email', { newEmail }, { responseType: 'text' });
  }
}
