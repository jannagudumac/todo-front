import { Component, OnInit } from '@angular/core';
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
      //1er psarametre: valeur initiale du champ
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
        /*this.authService.isAdmin = res.role == 'ROLE_ADMIN';*/
        this.router.navigate(['/']); // Redirect to dashboard
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Check credentials.';
        console.error(err);
      }
  });
  }
}

/*

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // fixed typo: styleUrls instead of styleUrl
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      // Keep 'username' if that's what backend expects; if it's 'email', rename consistently everywhere
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const credentials = this.loginForm.value; // { username: '...', password: '...' }

      this.authService.login(credentials).subscribe({
        next: (res) => {
          sessionStorage.setItem('jwt', res.token);
          this.router.navigateByUrl('');
        },
        error: (err) => {
          console.error('Erreur de connexion', err);
          this.errorMessage = 'Identifiants invalides. Veuillez réessayer.';
        },
      });
    }
  }
}
*/