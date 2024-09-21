import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TeacherNavbarComponent } from '../../../navbar/teacher-navbar/teacher-navbar.component';
import { TeacherFooterComponent } from '../../../navbar/teacher-navbar/teacher-footer/teacher-footer.component';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-create-quiz',
  standalone: true,
  imports: [TeacherNavbarComponent, TeacherFooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  quizForm: FormGroup;
  questions: any[] = [];
  teacherId!: number;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      duration: ['', Validators.required],
      status: ['Active', Validators.required], // Default to 'Active'
      questions: [[], Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchTeacherId();
  }

  fetchTeacherId() {
    this.teacherId = parseInt(localStorage.getItem('teacher_id') || '1', 10);
    this.fetchQuestions();
  }

  fetchQuestions() {
    const token = localStorage.getItem('access_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    const questionsUrl = `${environment.apiUrl}/questions/teachers/${this.teacherId}/questions/`;

    this.http.get(questionsUrl, { headers })
      .subscribe((data: any) => {
        this.questions = data;
      }, error => {
        console.error('Error fetching questions:', error);
      });
  }

  onSubmit() {
    if (this.quizForm.valid) {
      const token = localStorage.getItem('access_token');
      const headers = {
        'Authorization': `Bearer ${token}`
      };

      // Convert 'Active'/'Inactive' to true/false
      const formValue = {
        ...this.quizForm.value,
        status: this.quizForm.value.status === 'Active' // true for Active, false for Inactive
      };

      const createQuizUrl = `${environment.apiUrl}/quiz/quizzes/create/`;

      this.http.post(createQuizUrl, formValue, { headers })
        .subscribe(response => {
          console.log('Quiz created successfully!', response);
          this.router.navigate(['/allquiz']);
        }, error => {
          console.error('Error creating quiz:', error);
        });
    }
  }
}
