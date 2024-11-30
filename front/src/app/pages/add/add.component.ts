import {Component, inject} from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {googleApiBook} from "../../../types"
import {AddBooksDialogComponent} from "../../components/add-books-dialog/add-books-dialog.component";

@Component({
  selector: 'app-add',
  standalone: true,
    imports: [MatButtonModule, MatButton, MatIcon, CdkDrag, CdkDropList],
  templateUrl: './add.component.html',
  styleUrl: './add.component.scss',
})
export class AddComponent {
  public href: string = '';

  googleLink = `https://accounts.google.com/o/oauth2/auth?client_id=${'920323441665-igts9i5p5s2bek0p9a7uhm4metoj1m4b.apps.googleusercontent.com'}&redirect_uri=${
    this.href ? this.href : 'http:/localhost:4200'
  }&response_type=token&scope=https://www.googleapis.com/auth/books`;
  isDisabled = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.href = this.router.url;
    console.log(this.router.url);
  }

  readonly dialog = inject(MatDialog);
  books : Array<googleApiBook> = []

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.books, event.previousIndex, event.currentIndex);
  }

  removeBook(book: googleApiBook) {
    const booksWithoutRemovedBooks: Array<googleApiBook> = [];
    this.books.map((b) => {
      if (b.id !== book.id) booksWithoutRemovedBooks.push(b);
    });
    this.books = booksWithoutRemovedBooks;
  }

  sendBooks() {
    
  }

  openSecondDialog() {
    const secondDialogRef = this.dialog.open(AddBooksDialogComponent, {
      width: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      maxWidth: '100vw',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '200ms',
      panelClass: 'full-screen-dialog',
    });
    secondDialogRef.afterClosed().subscribe((result) => {
      this.books = [...result];
    });
  }

}
