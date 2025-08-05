/*import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

//'@' signifie decorateur
//qui decore la classe component
// il vient juste avant la classe

//standalone: false
//composant accessible via un module seulement
//oblgiatoire de le mettre dans 'declarations' du app.module.ts (Module)
@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
//'implements' pour implementer une interface
//une classe peut implementer plusieurs interfaces
export class LoginComponent implements OnInit {
  //'!' pour pouvoir initialiser la variable ultérieurement
  loginForm! : FormGroup;
  errorMessage = '';
  
  //j'utilise l'injection automatique de angular pour recuperer
  //un objet form builder qui va construire le formulaire
  //pour faire cela j'ajoute ce que j'ai besoin dans les parametres

  //'private' avant formBuilder pour pouvoir acceder a la variable 
  //en dehors du constructeur
  constructor(private formBuilder : FormBuilder, private router : Router, private authService : AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      //1er parametre: valeur initiale du champ
      //2eme parametre: liste de validators
      username: ['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    });
  }

  onSubmit() {
    console.log('Form submitted', this.loginForm.value);
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/']); // Redirect to dashboard
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Check credentials.';
        console.error(err);
      }
  });

}
}*/

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // Ajout d'une variable pour gérer les messages d'erreur
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, // <-- Injection du service d'authentification
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // J'ai renommé 'username' en 'email' pour correspondre à ce que le backend attend généralement
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value;
      this.authService.login(credentials).subscribe({
        next: (res) => {
          sessionStorage.setItem('authToken', res.token);
          this.router.navigateByUrl('');
        },
        error: (err) => console.error('Erreur de connexion', err),
      });
    }
  }
}