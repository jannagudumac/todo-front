import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  username = '';
  role = '';
  avatarUrl: string | null = null;
  initials = '';

  passwordForm: FormGroup;
  emailForm: FormGroup;

  passwordError = '';
  passwordSuccess = false;
  emailError = '';
  emailSuccess = false;
  savingPassword = false;
  savingEmail = false;

  constructor(
    public authService: AuthService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) {
    this.passwordForm = this.fb.group({
      current: ['', Validators.required],
      next:    ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', Validators.required]
    });
    this.emailForm = this.fb.group({
      newEmail: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        this.username = payload.sub || '';
        this.initials = this.username.charAt(0).toUpperCase();
      } catch {}
    }
    this.role = sessionStorage.getItem('role') || '';
    this.avatarUrl = localStorage.getItem('planit_avatar_' + this.username);
  }

  onFileChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarUrl = reader.result as string;
      localStorage.setItem('planit_avatar_' + this.username, this.avatarUrl!);
    };
    reader.readAsDataURL(file);
  }

  removeAvatar(): void {
    this.avatarUrl = null;
    localStorage.removeItem('planit_avatar_' + this.username);
  }

  get passwordsMatch(): boolean {
    const v = this.passwordForm.value;
    return v.next === v.confirm;
  }

  savePassword(): void {
    if (this.passwordForm.invalid || !this.passwordsMatch) return;
    this.savingPassword = true;
    this.passwordError = '';
    const { current, next } = this.passwordForm.value;
    this.profileService.changePassword(current, next).subscribe({
      next: () => {
        this.passwordSuccess = true;
        this.savingPassword = false;
        this.passwordForm.reset();
        setTimeout(() => this.passwordSuccess = false, 3000);
      },
      error: (err) => {
        this.passwordError = err.error || 'Erreur lors du changement de mot de passe';
        this.savingPassword = false;
      }
    });
  }

  saveEmail(): void {
    if (this.emailForm.invalid) return;
    this.savingEmail = true;
    this.emailError = '';
    this.profileService.changeEmail(this.emailForm.value.newEmail).subscribe({
      next: () => {
        this.emailSuccess = true;
        this.savingEmail = false;
        // JWT now invalid — force logout so user re-authenticates with new email
        setTimeout(() => this.authService.logout(), 2000);
      },
      error: (err) => {
        this.emailError = err.error || 'Erreur lors du changement d\'email';
        this.savingEmail = false;
      }
    });
  }
}
