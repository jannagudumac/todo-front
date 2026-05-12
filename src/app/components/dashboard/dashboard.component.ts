import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import { TodoService } from '../../services/todo.service';
import { ProjetService } from '../../services/projet.service';
import { Todo } from '../../models/todo.model';
import { Projet } from '../../models/projet.model';

interface ProjetCard extends Projet {
  totalTasks: number;
  doneTasks: number;
  progress: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  todos: Todo[] = [];
  projetCards: ProjetCard[] = [];

  kpis = [
    { id: 1, title: 'Projets actifs',      color: '!bg-indigo-500', value: 0, icon: 'folder_open' },
    { id: 2, title: 'À faire aujourd\'hui', color: '!bg-sky-500',    value: 0, icon: 'event' },
    { id: 3, title: 'En retard',            color: '!bg-red-500',    value: 0, icon: 'warning' },
    { id: 4, title: 'Urgentes',             color: '!bg-amber-500',  value: 0, icon: 'priority_high' },
    { id: 5, title: 'Terminées',            color: '!bg-emerald-500',value: 0, icon: 'check_circle' }
  ];

  constructor(
    private todoService: TodoService,
    private projetService: ProjetService
  ) {}

  ngOnInit(): void {
    forkJoin({
      todos: this.todoService.getTodos(),
      projets: this.projetService.getAll()
    }).subscribe(({ todos, projets }) => {
      this.todos = todos;

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // KPIs
      this.projetCards = projets.map(p => {
        const tasks = todos.filter(t => t.projetId === p.id);
        const done = tasks.filter(t => t.status === 'DONE' || t.completed).length;
        return {
          ...p,
          totalTasks: tasks.length,
          doneTasks: done,
          progress: tasks.length > 0 ? Math.round((done / tasks.length) * 100) : 0
        };
      });

      this.kpis[0].value = this.projetCards.filter(p => p.progress < 100).length;

      this.kpis[1].value = todos.filter(t =>
        t.dueDate && new Date(t.dueDate).toDateString() === today.toDateString()
      ).length;

      this.kpis[2].value = todos.filter(t =>
        t.dueDate && new Date(t.dueDate) < today &&
        t.status !== 'DONE' && !t.completed
      ).length;

      this.kpis[3].value = todos.filter(t => t.priority === '1').length;

      this.kpis[4].value = todos.filter(t => t.status === 'DONE' || t.completed).length;
    });
  }
}
