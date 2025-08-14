import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupService } from '../../services/signup.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: false,
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private signupService: SignupService, private router: Router) {

  }

  ngOnInit(): void {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    );
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      const formValue = this.signUpForm.value;
      this.signupService.register(formValue).subscribe({
        next: () => {console.log('User registered!')
         this.router.navigate(['/login'])},
         
        error: (err) => console.error('Signup failed:', err)
      });
    }
  }

}