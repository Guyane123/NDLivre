import {
  ContentChildren,
  Directive,
  QueryList,
  ViewChild,
} from '@angular/core';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Directive({ selector: '[option]' })
export class Book {}

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [],
  templateUrl: './books.component.html',
  styleUrl: './books.component.scss',
})
export class BooksComponent {
  @ContentChildren(Option) books: QueryList<Book> | undefined;

  get childrensLength(): number {
    console.log(this.books!.length);
    return this.books ? this.books.length : 0;
  }
  items = Array.from({ length: 100000 }).map((_, i) => `Item #${i}`);
}
