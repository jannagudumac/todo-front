import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjetService } from '../../services/projet.service';
import { TodoService } from '../../services/todo.service';
import { Projet } from '../../models/projet.model';
import { Todo } from '../../models/todo.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-detail',
  standalone: false,
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit {
  projet: Projet | null = null;
  todos: Todo[] = [];
  addForm: FormGroup;
  projetId!: number;

  get todoTasks() { return this.todos.filter(t => t.status === 'TODO' || (!t.status && !t.completed)); }
  get inProgressTasks() { return this.todos.filter(t => t.status === 'IN_PROGRESS'); }
  get doneTasks() { return this.todos.filter(t => t.status === 'DONE' || (t.completed && t.status !== 'TODO' && t.status !== 'IN_PROGRESS')); }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projetService: ProjetService,
    private todoService: TodoService,
    private fb: FormBuilder,
    private snack: MatSnackBar
  ) {
    this.addForm = this.fb.group({ title: ['', Validators.required] });
  }

  ngOnInit(): void {
    this.projetId = Number(this.route.snapshot.paramMap.get('id'));
    this.projetService.getById(this.projetId).subscribe(p => this.projet = p);
    this.loadTasks();
  }

  loadTasks(): void {
    this.todoService.getTodosByProjet(this.projetId).subscribe(data => this.todos = data);
  }

  setStatus(todo: Todo, status: 'TODO' | 'IN_PROGRESS' | 'DONE'): void {
    const updated: Todo = { ...todo, status, completed: status === 'DONE' };
    this.todoService.updateTodo(updated).subscribe(() => this.loadTasks());
  }

  addTask(): void {
    if (this.addForm.invalid) return;
    const task: Todo = {
      id: null,
      title: this.addForm.value.title,
      completed: false,
      priority: null,
      dueDate: '',
      description: null,
      memberIds: [],
      projetId: this.projetId,
      status: 'TODO'
    };
    this.todoService.addTodo(task).subscribe(() => {
      this.addForm.reset();
      this.loadTasks();
    });
  }

  openDetail(id: number | null): void {
    if (id != null) this.router.navigate(['/todo-detail', id]);
  }

  deleteTask(id: number | null, event: Event): void {
    event.stopPropagation();
    if (id == null) return;
    this.todoService.deleteTodo(id).subscribe(() => this.loadTasks());
  }

  priorityLabel(p: string | null): string {
    if (p === '1') return 'Urgente';
    if (p === '2') return 'Normale';
    if (p === '3') return 'Basse';
    return '';
  }

  priorityColor(p: string | null): string {
    if (p === '1') return '#dc2626';
    if (p === '2') return '#d97706';
    return '#6b7280';
  }
}
