import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookDetailsComponent } from './pages/article/article.component';
import { LoginComponent } from './pages/login/login.component';
import { LoanComponent } from './pages/loan/loan.component';
import { UserComponent } from './components/user/user.component';
import { AddComponent } from './pages/add/add.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article/:id', component: BookDetailsComponent },
  { path: 'loan/:id', component: LoanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loan/:id', component: LoanComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'notification/:id', component: UserComponent },
  { path: 'notifications', component: UserComponent },
  { path: 'add', component: AddComponent },
];