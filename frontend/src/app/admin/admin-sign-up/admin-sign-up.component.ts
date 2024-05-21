import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-admin-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin-sign-up.component.html',
  styleUrl: './admin-sign-up.component.css'
})
export class AdminSignUpComponent {
  username: string = '';
  password: string = '';


  onSubmit() {
  }
}
