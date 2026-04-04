import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { UtilisateurListComponent } from './utilisateur-list.component';
import { UtilisateurService } from '../../services/utilisateur.service';

describe('UtilisateurListComponent', () => {
  let component: UtilisateurListComponent;
  let fixture: ComponentFixture<UtilisateurListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UtilisateurListComponent],
      providers: [
        {
          provide: UtilisateurService,
          useValue: {
            getAllUsers: () => of([]),
            deleteUser: () => of({})
          }
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UtilisateurListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
