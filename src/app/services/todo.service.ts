import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo.model';
import { environment } from '../../environments/environment';

//commande pour creer le fichier:
//ng g service todo

//Le service fait le lien entre le front et le back

//Il fait les operations CRUD: Create, Read, Update, Delete
@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiURL = environment.apiUrl+ '/api/action';

  //HttpClient pour communiquer avec le API/Backend
  constructor(private http: HttpClient) { }

  //C R U D 

  //C : Create
  addTodo(item : Todo) {
    //<Todo> : type de retour de l'appel HTTP
    return this.http.post<Todo>(this.apiURL, item);
  }

  //R : Read
  //Fetch all (toute lia liste)
  getTodos() {
    //HTTP GET sans 2eme parametre parce que il y a pas de body
    return this.http.get<Todo[]>(this.apiURL);
  }

  //R : Read
  //Fetch one item de todo par son Id
  getTodo(id : number) {
    return this.http.get<Todo>(this.apiURL +'/'+ id);
  }

  //U : Update
  updateTodo(item : Todo) {
    console.log(item);
    return this.http.put<Todo>(this.apiURL +'/'+ item.id, item);
  }

  //D : Delete
  deleteTodo(id : number) {
    return this.http.delete(this.apiURL +'/'+ id);
  }

}
