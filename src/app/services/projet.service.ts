import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../models/projet.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjetService {
  private apiURL = environment.apiUrl + '/api/projet';

  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Projet[]>(this.apiURL);
  }

  getById(id: number) {
    return this.http.get<Projet>(`${this.apiURL}/${id}`);
  }

  create(item: Projet) {
    return this.http.post<Projet>(this.apiURL, item);
  }

  update(item: Projet) {
    return this.http.put<Projet>(`${this.apiURL}/${item.id}`, item);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiURL}/${id}`);
  }
}
