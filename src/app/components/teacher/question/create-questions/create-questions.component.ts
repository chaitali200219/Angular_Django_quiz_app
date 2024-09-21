import { Component, OnInit } from '@angular/core';
import { TeacherNavbarComponent } from '../../../navbar/teacher-navbar/teacher-navbar.component';
import { TeacherFooterComponent } from '../../../navbar/teacher-navbar/teacher-footer/teacher-footer.component';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment'; // Import environment

@Component({
  selector: 'app-create-questions',
  standalone: true,
  imports: [TeacherNavbarComponent, TeacherFooterComponent, ReactiveFormsModule, CommonModule],
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {
  questionForm: FormGroup;
  errorMessage: string | null = null; // For error handling

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.questionForm = this.fb.group({
      content: ['', Validators.required],
      question_type: ['MCQ', Validators.required],
      marks: ['', [Validators.required, Validators.min(1)]],
      created_by: [1, Validators.required], // Assuming created_by is fixed for now
      options: this.fb.array([]) // Initialize options as a FormArray
    });
  }

  ngOnInit(): void {
    this.onQuestionTypeChange();
  }

  get options(): FormArray {
    return this.questionForm.get('options') as FormArray;
  }

  onQuestionTypeChange() {
    const questionType = this.questionForm.get('question_type')?.value;
    this.options.clear(); // Clear existing options

    if (questionType === 'MCQ') {
      for (let i = 0; i < 4; i++) {
        this.addOption();
      }
    } else if (questionType === 'True' || questionType === 'False') {
      this.addOption(); // True/False options
      this.addOption();
    }
  }

  addOption() {
    const optionGroup = this.fb.group({
      content: ['', Validators.required],
      is_correct: [false] // Checkbox for correct answer
    });
    this.options.push(optionGroup);
  }

  onSubmit() {
    if (this.questionForm.valid) {
      const token = localStorage.getItem('access_token'); // Retrieve the token

      if (!token) {
        this.errorMessage = 'User not authenticated. Please log in.';
        return; // Exit if token is null
      }

      // Set up headers
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Use Bearer scheme for the token
      });

      const questionData = {
        ...this.questionForm.value, // Spread existing form values
        options: this.questionForm.value.options // Send options as part of the request
      };

      // Use a dynamic URL for creating questions
      const url = `${environment.apiUrl}/questions/questions/create/`;

      this.http.post(url, questionData, { headers }).subscribe({
        next: () => {
          this.router.navigate(['/allquestions']);  // Navigate to the questions list
        },
        error: (error) => {
          console.error('There was an error!', error);
          this.errorMessage = 'Failed to create question. Please try again.'; // Set error message
        }
      });
    }
  }
}
