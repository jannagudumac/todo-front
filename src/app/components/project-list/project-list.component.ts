import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { ProjetService } from '../../services/projet.service';
import { TodoService } from '../../services/todo.service';
import { Projet } from '../../models/projet.model';
import { Todo } from '../../models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ProjetCard extends Projet {
  totalTasks: number;
  doneTasks: number;
  progress: number;
  isOverdue: boolean;
  isDueSoon: boolean;
}

@Component({
  selector: 'app-project-list',
  standalone: false,
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.css'
})
export class ProjectListComponent implements OnInit {
  projets: ProjetCard[] = [];
  addForm: FormGroup;
  loading = true;

  constructor(
    private projetService: ProjetService,
    private todoService: TodoService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.addForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      deadline: [null]
    });
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading = true;
    forkJoin({
      projets: this.projetService.getAll(),
      todos: this.todoService.getTodos()
    }).subscribe(({ projets, todos }) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const soon = new Date(today);
      soon.setDate(soon.getDate() + 7);

      this.projets = projets.map(p => {
        const tasks = todos.filter(t => t.projetId === p.id);
        const done = tasks.filter(t => t.status === 'DONE' || t.completed).length;
        const deadline = p.deadline ? new Date(p.deadline) : null;
        return {
          ...p,
          totalTasks: tasks.length,
          doneTasks: done,
          progress: tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0,
          isOverdue: deadline ? deadline < today : false,
          isDueSoon: deadline ? deadline >= today && deadline <= soon : false
        };
      });
      this.loading = false;
    });
  }

  addProjet(): void {
    if (this.addForm.invalid) return;
    const newProjet: Projet = {
      id: null,
      title: this.addForm.value.title,
      description: this.addForm.value.description || null,
      deadline: this.addForm.value.deadline || null  // empty string → null
    };
    this.projetService.create(newProjet).subscribe(() => {
      this.addForm.reset();
      this.load();
    });
  }

  openProjet(id: number | null): void {
    if (id != null) this.router.navigate(['/projets', id]);
  }

  deleteProjet(id: number | null, event: Event): void {
    event.stopPropagation();
    if (id == null) return;
    this.projetService.delete(id).subscribe(() => this.load());
  }
}
