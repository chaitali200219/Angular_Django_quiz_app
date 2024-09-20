import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule,RouterLink],  // Add HttpClientModule here
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  userType: string = '';  // 'teacher' or 'student'

  constructor(private http: HttpClient, private router: Router) {}

  onLogin() {
    const loginData = {
      username: this.username,
      password: this.password,
      userType: this.userType
    };

    // Make HTTP POST request to backend API for login
    this.http.post('http://127.0.0.1:8000/user/api/login/', loginData).subscribe(
      (response: any) => {
        if (response.access) {
          // Store token and redirect
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
    
          if (this.userType === 'teacher') {
            this.router.navigate(['/teacher-dashboard']);
          } else {
            this.router.navigate(['/student-dashboard']);
          }
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
