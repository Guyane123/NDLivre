import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIcon } from '@angular/material/icon';
import { NavComponent } from '../nav/nav.component';
import { article, book, googleApiBook } from '../../../types';
import { BookService } from '../../services/book.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatToolbar,
    MatIcon,
    NavComponent,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    RouterLink,
  ],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  @Output() change: EventEmitter<string> = new EventEmitter();
  @Output() search: EventEmitter<string> = new EventEmitter();
  bookService = new BookService();

  @Input() articles: Array<article> | undefined;

  searchControl = new FormControl('');
  options: Array<googleApiBook> = [];
  filteredOptions: Observable<Array<googleApiBook>> | undefined;

  ngOnInit() {
    this.filteredOptions = this.searchControl.valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(200),
      map(async () => {
        const books = await this._filter();
        console.log(books);
        return books;
      }),
      switchMap((v) => v!)
    );
  }

  displayBookTitle(book: googleApiBook) {
    return book.volumeInfo.title;
  }
  async handleChange(e: Event) {
    this.change.emit(this.searchControl.value!);
  }

  private async _filter(): Promise<Array<googleApiBook>> {
    this.change.emit(this.searchControl.value!);
    const searchedBooks = await this.bookService.searchBooks(
      this.searchControl.value!,
      3
    );
    return searchedBooks;
  }
}
