import { importProvidersFrom, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import {MatSelectModule} from '@angular/material/select';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {MatCardModule} from '@angular/material/card';
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api'
import { InMemoryDataService } from './services/in-memory-data.service';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { UtilisateurListComponent } from './components/utilisateur-list/utilisateur-list.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { TodoDetailComponent } from './components/todo-detail/todo-detail.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';
import { TodoTableComponent } from './components/todo-table/todo-table.component';
import {MatTableModule} from '@angular/material/table';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalculatriceComponent } from './components/calculatrice/calculatrice.component';
import { MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule } from '@angular/material/autocomplete';
import { authInterceptor } from './interceptors/auth.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    TodoListComponent,
    UtilisateurListComponent,
    TodoDetailComponent,
    TodoTableComponent,
    DashboardComponent,
    CalculatriceComponent
  ],
  imports: [
    //Importer les modules pour pouvoir utiliser 
    //les composants correspondants material et autre
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatTableModule,
    MatChipsModule,
    MatAutocompleteModule,
    FormsModule,


  ],
  providers: [
    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    
    //injecter in-memory-data.service.ts
    //comme il est @Injectable
    //importProvidersFrom([
    //  HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,{delay:200})
    //]),
    provideNativeDateAdapter(),
    //localisation pour affichage en format francais (devise, date...)
    { provide: LOCALE_ID, useValue: 'fr'},
    
  ],
  bootstrap: [AppComponent],

    
})
export class AppModule { }



/* import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor'; // adjust path

@NgModule({
  // ...
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppModule {}
 */