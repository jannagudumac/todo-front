import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../services/utilisateur.service';
import { Utilisateur } from '../../models/utilisateur.model';
@Component({
  selector: 'app-utilisateur-list',
  standalone: false,
  templateUrl: './utilisateur-list.component.html',
  styleUrl: './utilisateur-list.component.css'
})
export class UtilisateurListComponent implements OnInit{

  utilisateur: Utilisateur[] = [];
  displayedColumns: string[] = ['id', 'username', 'role', 'actions'];
  accessDenied: boolean = false;

  constructor(private utilisateurService: UtilisateurService){}

  ngOnInit(): void {
    this.utilisateurService.getAllUsers().subscribe((data)=>{
      this.utilisateur = data;
    })
  }

  deleteUser(id: number) {
  this.utilisateurService.deleteUser(id).subscribe({
    next: () => {
      // Remove user from local array to update table instantly
      this.utilisateur = this.utilisateur.filter(u => u.id !== id);
    },
    error: (err) => {
      if (err.status === 403) {
          this.accessDenied = true;
      }
    }
  });
}

}
