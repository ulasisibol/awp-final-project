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
  newTitle: string = '';

  newWork: string = "";
  oldWork: string = "";

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getTitle();
    this.getWork();


  }

  // title

  onSubmitTitle() {
    console.log('Submitting update:', this.newTitle); // Log the title being submitted
    this.http.post<any>('http://localhost:3000/api/updateTitle1', { title: this.newTitle }).subscribe(
      (res) => {
        this.getTitle(); // Refresh the title after update
      },
      (error) => {
        console.error('Update error:', error); // Log any error
      }
    );
  }

  getTitle() {
    this.http.get<{ title: string }>('http://localhost:3000/api/title').subscribe((res) => {
      this.newTitle = res.title;
    });
  }

  // currentlyWork

  onSubmitNewWork() {
    console.log('Submitting update:', this.newWork); // Log the title being submitted
    this.http.post<any>('http://localhost:3000/api/updateNewWork', { title: this.newWork }).subscribe(
      (res) => {
        this.getWork(); // Refresh the title after update
      },
      (error) => {
        console.error('Update error:', error); // Log any error
      }
    );
  }

  getWork() {
    this.http.get<{ title: string }>('http://localhost:3000/api/newWork').subscribe((res) => {
      this.newWork = res.title;
      this.oldWork = res.title;
    });
  }


}
