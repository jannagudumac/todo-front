import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ContactService {
  private apiUrl : string = environment.apiUrl+ '/api/contact'

  /* private apiUrl : string = environment.apiUrl+'/api/action' */

  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(this.apiUrl);
  }
}