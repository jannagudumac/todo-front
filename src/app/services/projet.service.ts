import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../models/projet.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiURL : string = environment.apiUrl+ '/api/projet'

  constructor(private http: HttpClient) { }

getAll() {
  return this.http.get<Projet[]>(this.apiURL);
}
}
