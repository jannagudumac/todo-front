import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Todo-list';
  constructor(public authService: AuthService) {
  }
  logout() {
    localStorage.removeItem('token'); // or sessionStorage if you use that
    window.location.href = '/login'; // redirect to login page
  }
}
