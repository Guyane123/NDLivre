import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookComponent } from '../../components/book/book.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = new AuthService();

  user = JSON.stringify(this.authService.getAccount());
}
