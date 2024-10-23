import { Component, Input } from '@angular/core';
import { book } from '../../../types';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss',
})
export class BookComponent {
  @Input() book: book = {
    author: 'Author',
    title: 'Title',
    desc: 'desc',
    date: new Date(),
    ISBN: 'ABCDEF',
  };
}
