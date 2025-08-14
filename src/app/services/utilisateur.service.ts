import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utilisateur } from '../models/utilisateur.model';
import { environment } from '../../environments/environment';

/* @Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private apiURL : string = environment.apiUrl+ '/api/utilisateurs'

  constructor(private http: HttpClient) { }

  getUtilisateurs() {
    return this.http.get<Utilisateur>(this.apiURL);
  }
}*/



@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private apiURL = environment.apiUrl + '/api/utilisateur-list';

  constructor(private http: HttpClient) { }

  // Get ALL
  getAllUsers() {
    return this.http.get<Utilisateur[]>(this.apiURL);
  }

  // Get one
  getUser(id: number) {
    return this.http.get<Utilisateur>(this.apiURL + '/' + id);
  }

  // Create
  addUser(item: Utilisateur) {
    return this.http.post<Utilisateur>(this.apiURL, item);
  }

  // Update
  updateUser(item: Utilisateur) {
    return this.http.put<Utilisateur>(this.apiURL + '/' + item.id, item);
  }

  // Delete
  deleteUser(id: number) {
    return this.http.delete(this.apiURL + '/' + id);
  }

}
