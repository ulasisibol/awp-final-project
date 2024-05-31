import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/auth.service';


@Component({
  selector: 'app-admin-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './admin-sign-up.component.html',
  styleUrl: './admin-sign-up.component.css'
})
export class AdminSignUpComponent {
  username: string = "";
  password: string = "";

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Burada giriş başarılı ise yapılacak işlemler
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
