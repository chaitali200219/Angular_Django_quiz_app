import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../environments/environment';

const apiUrl = environment.apiUrl;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule], 
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  isTeacher = false;
  isStudent = false;

  // Teacher form fields
  teacherUsername: string = '';
  teacherPassword: string = '';
  experienceYears: number = 0;

  // Student form fields
  studentUsername: string = ''; 
  studentPassword: string = '';
  grade: string = ''; 

  constructor(private http: HttpClient, private router: Router) {}

  // Show Teacher Registration Form
  showTeacherForm() {
    this.isTeacher = true;
    this.isStudent = false;
  }

  // Show Student Registration Form
  showStudentForm() {
    this.isTeacher = false;
    this.isStudent = true;
  }

  // Register Teacher
  onRegisterTeacher() {
    const teacherData = {
      username: this.teacherUsername,
      password: this.teacherPassword,
      experience_years: this.experienceYears
    };

    const teacherRegisterUrl = `${apiUrl}/user/api/register/teacher/`;

    this.http.post(teacherRegisterUrl, teacherData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Teacher registration failed', error);
        if (error.error) {
          console.log('Error details:', error.error);
        }
      }
    );
  }

  // Register Student
  onRegisterStudent() {
    const studentData = {
      username: this.studentUsername, 
      password: this.studentPassword,
      grade: this.grade 
    };

    const studentRegisterUrl = `${apiUrl}/user/api/register/student/`;

    this.http.post(studentRegisterUrl, studentData).subscribe(
      (response) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Student registration failed', error);
        if (error.error) {
          console.log('Error details:', error.error);
        }
      }
    );
  }
}
