import { Component, Input, OnInit } from '@angular/core';
import { book, user } from '../../../types';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { bookService } from '../../services/book.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatProgressSpinnerModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent implements OnInit {
  @Input() identifier: string | undefined = 'd';
  @Input() user: user | undefined;
  book: book | undefined;

  constructor(private bookService: bookService) {}

  ngOnInit(): void {
    if (!this.identifier) return;
    this.bookService
      .getBook('fi3dDQAAQBAJ')
      .then((v: book) => {
        console.log(v);
        this.book = v;
      })
      .catch((err) => console.log(err));
  }
}
