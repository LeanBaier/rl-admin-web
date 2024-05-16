import {Routes} from '@angular/router';
import {DocumentsViewComponent} from './documents-view/documents-view.component';
import {ExercisesViewComponent} from './exercises-view/exercises-view.component';
import {HomeViewComponent} from './home-view/home-view.component';
import {LoginViewComponent} from './login-view/login-view.component';
import {StudentsViewComponent} from './students-view/students-view.component';
import {VideosViewComponent} from './videos-view/videos-view.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeViewComponent,
  },
  {
    path: 'students',
    component: StudentsViewComponent,
  },
  {
    path: 'study-documents',
    component: DocumentsViewComponent,
  },
  {
    path: 'exercises',
    component: ExercisesViewComponent,
  },
  {
    path: 'videos',
    component: VideosViewComponent,
  },
  {
    path: 'login',
    component: LoginViewComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
