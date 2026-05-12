import { Component, AfterViewInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState, Breakpoints } from '@angular/cdk/layout';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit, OnDestroy {
  title = 'PlanIt';
  isMobile: boolean;
  @ViewChild('sidenav') sidenav?: MatSidenav;
  private subs = new Subscription();

  constructor(
    public authService: AuthService,
    private bp: BreakpointObserver,
    private router: Router
  ) {
    this.isMobile = bp.isMatched([Breakpoints.Handset, Breakpoints.TabletPortrait]);
  }

  ngAfterViewInit() {
    this.subs.add(
      this.bp.observe([Breakpoints.Handset, Breakpoints.TabletPortrait])
        .subscribe((result: BreakpointState) => {
          this.isMobile = result.matches;
          if (!this.authService.isLoggedIn()) return;
          result.matches ? this.sidenav?.close() : this.sidenav?.open();
        })
    );
    this.subs.add(
      this.router.events.pipe(filter((e: Event): e is NavigationEnd => e instanceof NavigationEnd))
        .subscribe(() => { if (this.isMobile) this.sidenav?.close(); })
    );
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
