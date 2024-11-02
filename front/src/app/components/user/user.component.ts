import { Component } from '@angular/core';
import { GoBackComponent } from '../go-back/go-back.component';
import { NavComponent } from '../nav/nav.component';
import { mockedUser } from '../../../utils/mockedVariables';
import { MatTabsModule } from '@angular/material/tabs';
import { BooksComponent } from '../books/books.component';
import { BookComponent } from '../book/book.component';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    GoBackComponent,
    NavComponent,
    MatTabsModule,
    BooksComponent,
    BookComponent,
    MatPaginatorModule,
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {
  user = mockedUser;
}
