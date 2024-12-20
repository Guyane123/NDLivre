import { Component, inject, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterLink,
} from '@angular/router';
import { article, book, googleApiBook } from '../../../types';
import { findArticle } from '../../../utils/mockedVariables';
import { BookService } from '../../services/book.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatBottomSheet,
  MatBottomSheetModule,
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import { NavComponent } from '../../components/nav/nav.component';
import { GoBackComponent } from '../../components/go-back/go-back.component';
import { snackBarComponent } from '../../components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-article',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatIconModule,
    RouterLink,
    RouterModule,
    NavComponent,
    GoBackComponent,
    snackBarComponent,
  ],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss',
})
export class BookDetailsComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  private _bottomSheet = inject(MatBottomSheet);

  id: string | undefined;
  article: article | undefined;
  book: googleApiBook | undefined;
  bookService = new BookService();

  openSnackBar() {
    this._snackBar.openFromComponent(snackBarComponent, {
      duration: 1000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      data: 'Vous avez likez cet article.',
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetOverviewExampleSheet);
  }

  handleLike() {
    this.openSnackBar();
  }

  handleBack() {
    this._location.back();
  }

  handleShare() {
    this.openBottomSheet();
  }

  toDate(date: Date | string) {
    return new Date(date).toString();
  }

  constructor(private route: ActivatedRoute, private _location: Location) {}
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.id = id;
    findArticle(id).then((v) => {
      if (!v) return;
      this.article = v;
      this.bookService.getBook(v.bookId).then((b) => {
        console.log(b);
        this.book = b;
      });
    });
  }
}


@Component({
  selector: 'bottom-sheet',
  templateUrl: 'bottom-sheet.html',
  standalone: true,
  styleUrl: './article.component.scss',
  imports: [MatListModule, MatIconModule],
})
export class BottomSheetOverviewExampleSheet implements OnInit {
  private _bottomSheetRef =
    inject<MatBottomSheetRef<BottomSheetOverviewExampleSheet>>(
      MatBottomSheetRef
    );

  public href: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.href = this.router.url;
  }
  copyToClipboard() {
    navigator.clipboard.writeText(location.href);
    this._bottomSheetRef.dismiss();
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
