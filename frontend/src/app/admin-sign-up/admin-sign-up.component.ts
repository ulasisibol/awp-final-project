import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { LoginGuard } from '../auth/login.control';

@Component({
  selector: 'app-admin-sign-up',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  providers: [AuthService, LoginGuard],
  templateUrl: './admin-sign-up.component.html',
  styleUrls: ['./admin-sign-up.component.css']
})
export class AdminSignUpComponent {
  username: string = "";
  password: string = "";
  errorMessage: string = "";
  successMessage: string = "";

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful';
        this.errorMessage = '';
        console.log('Login successful', response);
        this.router.navigate(['/admin']);
      },
      error: (error) => {
        this.errorMessage = 'Incorrect username or password';
        this.successMessage = '';
        console.error('Login failed', error);
      }
    });
  }
}
