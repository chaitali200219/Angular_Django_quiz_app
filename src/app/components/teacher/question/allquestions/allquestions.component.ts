import { Component, OnInit } from '@angular/core';
import { TeacherNavbarComponent } from '../../../navbar/teacher-navbar/teacher-navbar.component';
import { TeacherFooterComponent } from '../../../navbar/teacher-navbar/teacher-footer/teacher-footer.component';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-allquestions',
  standalone: true,
  imports: [TeacherNavbarComponent, TeacherFooterComponent, CommonModule],
  templateUrl: './allquestions.component.html',
  styleUrls: ['./allquestions.component.css']
})
export class AllquestionsComponent implements OnInit {
  questions: any[] = []; // Store the questions
  teacherId: number;

  constructor(private http: HttpClient, private router: Router) {
    this.teacherId = parseInt(localStorage.getItem('teacher_id') || '1');
  }

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions() {
    const teacherId = localStorage.getItem('teacher_id'); // Retrieve teacher_id from local storage
    const token = localStorage.getItem('access_token'); // Retrieve the JWT token from localStorage (if stored)

    // Set the headers for the request
    const headers = {
      'Authorization': `Bearer ${token}` // Add the token to the Authorization header
    };

    // Use a dynamic URL for fetching questions
    const url = `${environment.apiUrl}/questions/teachers/${teacherId}/questions/`;

    // Make the HTTP GET request with the token in headers
    this.http.get(url, { headers }).subscribe(
      (data: any) => {
        this.questions = data;
      },
      error => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  editQuestion(questionId: number) {
    // Navigate to the edit question page in Angular route
    this.router.navigate([`/questions/${questionId}/update`]);
  }

  deleteQuestion(questionId: number) {
    const confirmDelete = confirm('Are you sure you want to delete this question?');
    if (confirmDelete) {
      const url = `${environment.apiUrl}/questions/questions/${questionId}/delete/`; // Using dynamic URL

      const token = localStorage.getItem('access_token'); // Retrieve the JWT token from localStorage (if stored)
      const headers = {
        'Authorization': `Bearer ${token}` // Add the token to the Authorization header
      };

      this.http.delete(url, { headers }).subscribe(() => {
        // Remove the deleted question from the questions array
        this.questions = this.questions.filter(question => question.id !== questionId);
      }, error => {
        console.error('Error deleting question:', error);
      });
    }
  }
}
