import { AsyncPipe, CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  inject,
  model,
  ViewChild,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { book, googleApiBook } from '../../../types';
import { NavComponent } from '../nav/nav.component';
import { GoBackComponent } from '../go-back/go-back.component';
import { MatIcon } from '@angular/material/icon';
import { BookService } from '../../services/book.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { snackBarComponent } from '../snack-bar/snack-bar.component';
import { getBookThumbnail } from '../../../utils/utils';
import { MediaMatcher } from '@angular/cdk/layout';
import {
  BarcodeScannerLivestreamComponent,
  BarcodeScannerLivestreamModule,
} from 'ngx-barcode-scanner';

@Component({
  selector: 'app-add-books-dialog',
  templateUrl: 'add-books-dialog.component.html',
  styleUrl: 'add-books-dialog.component.scss',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NavComponent,
    GoBackComponent,
    MatIcon,
    FormsModule,
    ReactiveFormsModule,
    AsyncPipe,
    snackBarComponent,
    BarcodeScannerLivestreamModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddBooksDialogComponent {
  controler = new FormControl('');
  bookService = new BookService();
  dialogRef = inject(MatDialogRef);
  books: Array<googleApiBook> = [];
  addedBooks: Array<googleApiBook> = [];
  isHidden: boolean = true;
  private _snackBar = inject(MatSnackBar);

  //barcodeValue = '';
  barcodeValues: Array<string> = []
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /*async handleValueChange(result: any) {
    this.barcodeValue = result.codeResult.code;
    this.barcodeValues.push(result.codeResult.code);
    const book = await this.bookService.getBook(this.barcodeValue);
    this.books.push(book);
    this.barcodeScanner?.stop();
    this.dialogRef.close(this.books);
    this.isHidden = true;
  }*/


  getBookThumbnail = getBookThumbnail;

  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner!: BarcodeScannerLivestreamComponent;

  barcodeValue = "";

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
  }


  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.dialogRef.disableClose = true;
    this.dialogRef
      .beforeClosed()
      .subscribe(() => this.dialogRef.close(this.addedBooks));
  }

  handleClose() {
    this.dialogRef.close();
  }


  async handleInput() {
    console.log(this.controler.value);
    const books = await this.bookService.searchBooks(this.controler.value!, 5);
    console.log(books);
    this.books = books;
  }
  handleAdd(book: googleApiBook) {
    this.addedBooks.push(book);

    const booksWithoutAddedBook: Array<googleApiBook> = [];
    this.books.map((b) => {
      if (book.id !== b.id) {
        booksWithoutAddedBook.push(b);
      }
    });
    this.books = booksWithoutAddedBook;
    this._snackBar.openFromComponent(snackBarComponent, {
      duration: 1000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      data: 'Vous avez ajouté un livre',
    });
  }
}
