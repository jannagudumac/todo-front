import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../models/utilisateur.model';

@Component({
  selector: 'app-utilisateur-list',
  standalone: false,
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css'
})
export class UtilisateurListComponent implements OnInit {
  utilisateur: Utilisateur[] = [];
  displayedColumns = ['id', 'username', 'role', 'actions'];
  accessDenied = false;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.utilisateurService.getAllUsers().subscribe({
      next: data => this.utilisateur = data,
      error: err => { if (err.status === 403) this.accessDenied = true; }
    });
  }

  deleteUser(id: number): void {
    this.utilisateurService.deleteUser(id).subscribe({
      next: () => this.utilisateur = this.utilisateur.filter(u => u.id !== id),
      error: err => { if (err.status === 403) this.accessDenied = true; }
    });
  }

  promote(id: number): void {
    this.utilisateurService.promoteToAdmin(id).subscribe(() => this.load());
  }

  demote(id: number): void {
    this.utilisateurService.demoteToUser(id).subscribe(() => this.load());
  }
}
