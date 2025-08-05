import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Projet } from '../models/projet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  private apiURL : string = 'http://localhost:8080/api/projet'

  constructor(private http: HttpClient) { }

getAll() {
  return this.http.get<Projet[]>(this.apiURL);
}
}
