import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { BookComponent } from '../../components/book/book.component';
import { BooksComponent } from '../../components/books/books.component';
import { mockedArticles } from '../../../utils/mockedVariables';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { article, book, googleApiBook } from '../../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BookComponent, BooksComponent, NavBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  authService = new AuthService();
  articles: Array<article> = mockedArticles;
  books: Array<googleApiBook> = [];

  handleSearchChange(e: string) {
    this.articles = mockedArticles.filter((a: article) => {
      const book = this.books.filter((b) => {
        return b.id.includes(a.bookId);
      })[0];
      return a.bookId.includes(book.id);
    });
    console.log(this.articles);
  }

  handleBookLoad(book: googleApiBook) {
    this.books.push(book);
  }

  user = JSON.stringify(this.authService.getAccount());
}
