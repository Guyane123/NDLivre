import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BookDetailsComponent } from './pages/article/article.component';
import { LoginComponent } from './pages/login/login.component';
import { LoanComponent } from './pages/loan/loan.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'article/:id', component: BookDetailsComponent },
  { path: 'loan/:id', component: LoanComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loan/:id', component: LoanComponent },
];