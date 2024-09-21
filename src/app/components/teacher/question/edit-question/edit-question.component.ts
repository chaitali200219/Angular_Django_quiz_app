import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TeacherNavbarComponent } from '../../../navbar/teacher-navbar/teacher-navbar.component';
import { TeacherFooterComponent } from '../../../navbar/teacher-navbar/teacher-footer/teacher-footer.component';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../../../../../environments/environment'; // Import environment

@Component({
  selector: 'app-edit-question',
  standalone: true,
  imports: [TeacherNavbarComponent, TeacherFooterComponent, ReactiveFormsModule, HttpClientModule],
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  questionForm: FormGroup;
  questionId!: number; // Use definite assignment

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.questionForm = this.fb.group({
      content: ['', Validators.required],
      question_type: ['', Validators.required],
      marks: ['', Validators.required],
      option1: ['', Validators.required],
      option2: ['', Validators.required],
      option3: ['', Validators.required],
      option4: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.questionId = +this.route.snapshot.paramMap.get('id')!; // Retrieve question ID from route
    console.log('Question ID:', this.questionId); // Log for debugging
    this.loadQuestion();
  }

  loadQuestion() {
    const token = localStorage.getItem('access_token'); // Retrieve the JWT token from localStorage
    const headers = {
      'Authorization': `Bearer ${token}` // Add the token to the Authorization header
    };

    // Use a dynamic URL for fetching the question
    this.http.get(`${environment.apiUrl}/questions/questions/${this.questionId}/`, { headers }).subscribe((data: any) => {
      console.log('Fetched Question Data:', data);
      this.questionForm.patchValue({
        content: data.content,
        question_type: data.question_type,
        marks: data.marks,
        option1: data.option1,
        option2: data.option2,
        option3: data.option3,
        option4: data.option4
      });
    });
  }
  
  onSubmit() {
    if (this.questionForm.valid) {
      const token = localStorage.getItem('access_token'); // Retrieve the JWT token from localStorage
      const headers = {
        'Authorization': `Bearer ${token}` // Add the token to the Authorization header
      };

      // Use a dynamic URL for updating the question
      this.http.put(`${environment.apiUrl}/questions/questions/${this.questionId}/update/`, this.questionForm.value, { headers })
        .subscribe(response => {
          console.log('Question updated successfully!', response);
          this.router.navigate(['/allquestions']); // Redirect back to the questions list
        }, error => {
          console.error('Error updating question:', error);
        });
    }
  }
}
