import { Component } from '@angular/core';
import { TeacherNavbarComponent } from '../../navbar/teacher-navbar/teacher-navbar.component';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Needed for routerLink to work
import { TeacherFooterComponent } from '../../navbar/teacher-navbar/teacher-footer/teacher-footer.component';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [TeacherNavbarComponent, CommonModule, RouterModule,TeacherFooterComponent],  // Add CommonModule and RouterModule
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent {}
