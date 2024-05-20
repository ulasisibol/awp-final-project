import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, Event, RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from "./shared/navbar/navbar.component";
import { FooterComponent } from "./shared/footer/footer.component";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, HttpClientModule]
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
        console.log(`Current URL: ${event.urlAfterRedirects}, showNavbar: ${this.showNavbar}`);
      });
  }
}