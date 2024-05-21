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
  homeTitle: string = "";
  newWork: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTitle();
    this.getCurrentlyWork();
  }

  getTitle() {
    this.http.get<{ title: string }>('http://localhost:3000/api/title').subscribe((res) => {
      this.homeTitle = res.title;
    });
  }

  getCurrentlyWork() {
    this.http.get<{ title: string }>('http://localhost:3000/api/newWork').subscribe((res) => {
      this.newWork = res.title;
    });
  }
}
