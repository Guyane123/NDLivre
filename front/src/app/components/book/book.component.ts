import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { article, book, EDUser, googleApiBook, user } from '../../../types';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { BookService } from '../../services/book.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { mockedArticle } from '../../../utils/mockedVariables';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit {
  @Input() article: article = mockedArticle;
  @Input() display: 'col' | 'card' = 'col';
  @Output() load: EventEmitter<googleApiBook> = new EventEmitter();

  user = this.article?.user;

  book: googleApiBook | undefined;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    if (!this.article) return;
    this.bookService
      .getBook(this.article.bookId)
      .then((v: googleApiBook) => {
        console.log(v);
        this.book = v;
        this.load.emit(v);
      })
      .catch((err) => console.log(err));
  }
}
