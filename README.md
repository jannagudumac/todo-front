### **Application de gestion de tâches**

Application complète de gestion de tâches avec **frontend (Angular)** et **backend (Java Spring Boot)**, connectée à **PostgreSQL** pour les données métier et à **MongoDB** pour la journalisation des connexions (*logins*).

### **Fonctionnalités côté frontend** :

* Pages **Login** et **Inscription**
* **Accès administrateur** : visualisation de tous les utilisateurs dans un tableau **Angular Material**
* **Vue personnalisée** : chaque utilisateur ne voit que ses propres tâches
* **Menu latéral** (*sidenav*) pour la navigation
* **Gestion des tâches** : ajout, suppression et modification
* **Page détaillée pour chaque tâche** : possibilité de modifier les informations
* **Attribution de membres** via des chips Angular Material 
* **Attribution d’un projet unique** à chaque tâche (relation *many-to-one*)
* **Angular Material** : formulaires, listes, tableaux, champs de formulaire
* **Tailwind CSS** : mise en page responsive avec *grid* et *flex*

### **Fonctionnalités côté backend** :

* Développé en **Java Spring Boot** avec **structure en couches** : *Controller*, *DTO*, *Entity*, *Service*, *Repository*
* **Sécurité** : `JwtUtil`, `JwtFilter`, `Cors`, `SecurityConfig`
* **Cryptage de mot de passe** à l'aide de **Bcrypt Generator**
* **Relation (*many-to-one*) et (*one-to-many*)** pour relier la tâche aux membres et aux projets
* **API REST** pour les opérations CRUD
* Génération automatique de diagrammes avec **Talsma UMLDoclet**
* Enregistrement des connexions dans **MongoDB**
* Base métier stockée dans **PostgreSQL**

### **Hébergement** :

* Backend : **Render**
* Frontend : **Netlify**

### **Technologies utilisées** :

* **Frontend** : Angular, Angular Material, Tailwind CSS
* **Backend** : Java Spring Boot, Spring Security, PostgreSQL, MongoDB, Talsma UMLDoclet, Bcrypt Generator

[🌐 Démo live](https://todo-front25.netlify.app) &nbsp;&nbsp; [💻 Code source front](https://github.com/jannagudumac/todo-front) &nbsp;&nbsp; [💻 Code source back](https://github.com/jannagudumac/todo-back)

----------------------------------------------------------------------------------------------------------------------------------------------


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.13.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
