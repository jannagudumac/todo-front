import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { TodoDetailComponent } from './todo-detail.component';
import { TodoService } from '../../services/todo.service';
import { ContactService } from '../../services/contact.service';
import { ProjetService } from '../../services/projet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('TodoDetailComponent', () => {
  let component: TodoDetailComponent;
  let fixture: ComponentFixture<TodoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [TodoDetailComponent],
      providers: [
        {
          provide: TodoService,
          useValue: {
            getTodo: () => of({
              id: 1,
              title: 'Test todo',
              completed: false,
              priority: '1',
              dueDate: '',
              description: '',
              memberIds: [],
              projetId: null
            }),
            updateTodo: () => of({})
          }
        },
        {
          provide: ContactService,
          useValue: {
            getAll: () => of([])
          }
        },
        {
          provide: ProjetService,
          useValue: {
            getAll: () => of([])
          }
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: jasmine.createSpy('open')
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
