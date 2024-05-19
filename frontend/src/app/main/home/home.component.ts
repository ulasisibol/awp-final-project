import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  homeTitle: string = 'I\'m a <span class="primary">web designer</span> and <span class="primary">full-stack web developer</span>';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTitle();
  }

  getTitle() {
    this.http.get<{ title: string }>('http://localhost:3000/api/title').subscribe((res) => {
      this.homeTitle = res.title;
      console.log('Current title:', this.homeTitle); // Log the current title
    });
  }
}
