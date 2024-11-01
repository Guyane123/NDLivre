import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { findArticle } from '../../../utils/mockedVariables';
import { article, book } from '../../../types';
import { map, Observable } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    CommonModule,
    AsyncPipe,
    MatAutocompleteModule,
  ],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss',
})
export class LoanComponent {
  bookService = new BookService();
  stepperOrientation: Observable<'horizontal' | 'vertical'>;

  places = [
    {
      name: 'Cour principale',
      coordinate: {
        longitude: '47.80651738328047',
        lattitude: '-3.2794998697707545',
      },
    },
    {
      name: 'Cour intérieur',
      coordinate: {
        longitude: '47.806617418084684',
        lattitude: '-3.2797449715784945',
      },
    },
    {
      name: 'Preau BVS',
      coordinate: {
        longitude: '47.806617418084684',
        lattitude: '-3.2797449715784945',
      },
    },
    {
      name: 'Préau principal',
      coordinate: {
        longitude: '47.8065901722891',
        lattitude: '-3.2797294296310255',
      },
    },
  ];

  constructor(private route: ActivatedRoute) {
    const breakpointObserver = inject(BreakpointObserver);

    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  @Input() articleId: string | undefined;
  article: article | undefined;
  book: book | undefined;
  state: any;

  ngOnInit() {
    this.book = history.state.book;
    console.log(this.book);

    if (this.book) return;

    console.log(this.state);

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;
    this.articleId = id;
    findArticle(id).then((v) => {
      if (!v) return;
      this.article = v;
      this.bookService.getBook(v.bookId).then((b: book) => {
        console.log(b);
        this.book = b;
      });
    });
  }

  private _formBuilder = inject(FormBuilder);
  myControl = new FormControl('');

  firstFormGroup: FormGroup = this._formBuilder.group({ firstCtrl: [''] });
  secondFormGroup: FormGroup = this._formBuilder.group({ secondCtrl: [''] });
}
