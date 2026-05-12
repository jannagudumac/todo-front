import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface Contact {
  id: number | null;
  name: string | null;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = environment.apiUrl + '/api/contact';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Contact[]>(this.apiUrl);
  }

  getById(id: number) {
    return this.http.get<Contact>(`${this.apiUrl}/${id}`);
  }

  create(item: Contact) {
    return this.http.post<Contact>(this.apiUrl, item);
  }

  update(item: Contact) {
    return this.http.patch<Contact>(`${this.apiUrl}/${item.id}`, item);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
