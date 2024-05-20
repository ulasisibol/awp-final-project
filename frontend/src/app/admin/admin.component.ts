import { Component, OnInit, model } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
  imports: [FormsModule, CommonModule] // FormsModule'u buraya ekleyin
})

export class AdminComponent implements OnInit {
  homeTitle1: string = '';
  originalTitle: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTitle();
  }

  onSubmit1() {
    console.log('Submitting update:', this.homeTitle1); // Log the title being submitted
    this.http.post<any>('http://localhost:3000/api/updateTitle1', { title: this.homeTitle1 }).subscribe(
      (res) => {
        console.log('Update response:', res); // Log the response
        this.getTitle(); // Refresh the title after update
      },
      (error) => {
        console.error('Update error:', error); // Log any error
      }
    );
  }

  getTitle() {
    this.http.get<{ title: string }>('http://localhost:3000/api/title').subscribe((res) => {
      this.homeTitle1 = res.title;
      this.originalTitle = res.title;
      console.log('Current title:', this.homeTitle1); // Log the current title
    });
  }
}