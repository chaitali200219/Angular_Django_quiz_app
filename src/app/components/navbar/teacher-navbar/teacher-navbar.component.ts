import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Import HttpClient

@Component({
  selector: 'app-teacher-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule], // Use HttpClientModule
  templateUrl: './teacher-navbar.component.html',
  styleUrls: ['./teacher-navbar.component.css']
})
export class TeacherNavbarComponent {
  username: string | null = '';

  constructor(private router: Router, private http: HttpClient) { // Inject HttpClient here
    this.username = localStorage.getItem('username');
    console.log('Stored Username:', this.username);
  }

  logout() {
    // Perform logout logic
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    // Navigate to login page or home
    this.router.navigate(['/login']);
  }
}
