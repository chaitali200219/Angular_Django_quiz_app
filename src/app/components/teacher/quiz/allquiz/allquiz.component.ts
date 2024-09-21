import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TeacherNavbarComponent } from '../../../navbar/teacher-navbar/teacher-navbar.component';
import { TeacherFooterComponent } from '../../../navbar/teacher-navbar/teacher-footer/teacher-footer.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

interface Quiz {
  id: number;
  title: string;
  duration: number;
  status: boolean; // true for Active, false for Inactive
  marks: number; // Assume this field is available
}

@Component({
  selector: 'app-allquiz',
  standalone: true,
  imports: [TeacherNavbarComponent, TeacherFooterComponent, CommonModule],
  templateUrl: './allquiz.component.html',
  styleUrls: ['./allquiz.component.css']
})
export class AllquizComponent implements OnInit {
  quizzes: Quiz[] = [];
  filteredQuizzes: Quiz[] = [];
  view: 'all' | 'completed' = 'all'; // Track current view
  teacherId!: number; // Variable to hold the teacher ID

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.fetchTeacherId(); // Fetch the teacher ID on initialization
  }

  fetchTeacherId() {
    // Retrieve the teacher ID from local storage
    this.teacherId = parseInt(localStorage.getItem('teacher_id') || '1', 10);
    this.fetchQuizzes(); // Call fetchQuizzes after getting the teacher ID
  }

  fetchQuizzes() {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    // Use dynamic URL to fetch quizzes for the specific teacher
    const quizzesUrl = `${environment.apiUrl}/quiz/quizzes/${this.teacherId}/`;

    this.http.get<Quiz[]>(quizzesUrl, { headers })
      .subscribe(data => {
        this.quizzes = data;
        this.updateFilteredQuizzes();
      }, error => {
        console.error('Error fetching quizzes:', error);
      });
  }

  updateFilteredQuizzes() {
    // Adjust filtering logic based on the current view
    if (this.view === 'all') {
      this.filteredQuizzes = this.quizzes; // Show all quizzes
    } else {
      this.filteredQuizzes = this.quizzes.filter(quiz => !quiz.status); // Show only completed quizzes
    }
  }

  switchView(view: 'all' | 'completed') {
    this.view = view;
    this.updateFilteredQuizzes(); // Update filtered quizzes based on the selected view
  }

  attemptQuiz(quizId: number) {
    // Navigate to the quiz attempt page
    this.router.navigate([`/quizzes/attempt/${quizId}`]);
  }

  viewResult(quizId: number) {
    // Navigate to the quiz results page
    this.router.navigate([`/quizzes/results/${quizId}`]);
  }
}
