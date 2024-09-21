import { Routes } from '@angular/router';
import { LoginComponent } from './components/user_management/login/login.component';
import { RegisterComponent } from './components/user_management/register/register.component';
import { TeacherDashboardComponent } from './components/teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentNavbarComponent } from './components/navbar/student-navbar/student-navbar.component';
import { TeacherNavbarComponent } from './components/navbar/teacher-navbar/teacher-navbar.component';
import { CreateQuestionsComponent } from './components/teacher/question/create-questions/create-questions.component';
import { CreateQuizComponent } from './components/teacher/quiz/create-quiz/create-quiz.component';
import { AllquestionsComponent } from './components/teacher/question/allquestions/allquestions.component';
import { EditQuestionComponent } from './components/teacher/question/edit-question/edit-question.component';
import { AllquizComponent } from './components/teacher/quiz/allquiz/allquiz.component';

export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path:'teacher-dashboard',
        component:TeacherDashboardComponent
    },
    {
        path:'student-dashboard',
        component:StudentNavbarComponent
    },
    {
        path:'teacher-navbar',
        component:TeacherNavbarComponent
    },
    {
        path:'create-questions',
        component:CreateQuestionsComponent
    },
    {
        path:'allquestions',
        component:AllquestionsComponent
    },
    {
        path:'questions/:id/update',
        component:EditQuestionComponent
    },
    {
        path:'create-quiz',
        component:CreateQuizComponent
    },
    {
        path:'allquiz',
        component:AllquizComponent
    }
    
    

];
