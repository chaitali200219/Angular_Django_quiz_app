import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../environments/environment';


const apiUrl = environment.apiUrl;


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule, RouterLink],
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
    const loginUrl = `${environment.apiUrl}/user/api/login/`;

    this.http.post(loginUrl, loginData).subscribe(
      (response: any) => {
        console.log('Full response:', response);

        // Check for access token in response
        if (response.access) {
          localStorage.setItem('access_token', response.access);
          localStorage.setItem('refresh_token', response.refresh);
          
          // Update to ensure username is stored correctly
          localStorage.setItem('username', this.username); // Store from form input
          localStorage.setItem('teacher_id', response.teacher_id);
          console.log('Username stored:', this.username);
    
          // Navigate based on userType
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
