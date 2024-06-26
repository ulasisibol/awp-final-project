import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, Event, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { filter } from 'rxjs/operators';
import { AdminSignUpComponent } from './admin-sign-up/admin-sign-up.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, HttpClientModule, AdminSignUpComponent]
})
export class AppComponent implements OnInit {
  showNavbar = true;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.showNavbar = !event.urlAfterRedirects.includes('/admin');
        if (event.urlAfterRedirects.includes('/admin') || event.urlAfterRedirects.includes('/login')) {
          this.showNavbar = false
        }
        else {
          this.showNavbar = true;
        }
      });
  }
}