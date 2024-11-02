import { Component, inject, Input } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterModule,
} from '@angular/router';
import { findArticle } from '../../../utils/mockedVariables';
import { article, book, googleApiBook, place } from '../../../types';
import { map, Observable, startWith } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AsyncPipe, CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatIcon } from '@angular/material/icon';
import { NavComponent } from '../../components/nav/nav.component';
import { GoBackComponent } from '../../components/go-back/go-back.component';
import { MapComponent } from '../../components/map/map.component';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { getBookThumbnail } from '../../../utils/utils';

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
    MatDatepickerModule,
    NgxMatTimepickerModule,
    MatIcon,
    NavComponent,
    GoBackComponent,
    MapComponent,
    MatAutocompleteTrigger,
    RouterLink,
    RouterModule,
  ],
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss',
})
export class LoanComponent {
  bookService = new BookService();
  stepperOrientation: Observable<'horizontal' | 'vertical'>;
  filteredOptions: Observable<place[]> | undefined;
  lng: number | undefined = -3.2794998697707545;
  lat: number | undefined = 47.80651738328047;
  handleChange(e: any) {
    console.log(e);
  }
  places = [
    {
      name: 'Autre (préciser)',
      coordinate: {
        lat: 47.80651738328047,
        lng: -3.2794998697707545,
      },
    },
    {
      name: 'Cour principale',
      coordinate: {
        lat: 47.80651738328047,
        lng: -3.2794998697707545,
      },
    },
    {
      name: 'Cour intérieur',
      coordinate: {
        lat: 47.806617418084684,
        lng: -3.2797449715784945,
      },
    },
    {
      name: 'Preau BVS',
      coordinate: {
        lat: 47.806617418084684,
        lng: -3.2797449715784945,
      },
    },
    {
      name: 'Préau principal',
      coordinate: {
        lat: 47.8065901722891,
        lng: -3.2797294296310255,
      },
    },
  ];

  @Input() articleId: string | undefined;
  article: article | undefined;
  book: googleApiBook | undefined;
  state: any;

  getBookThumbnail = getBookThumbnail;
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    placeCtrl: [
      { name: '', coordinate: { lat: 0, lng: 0 } },
      Validators.required,
    ],
  });
  secondFormGroup = this._formBuilder.group({
    dateCtrl: ['', Validators.required],
    timeCtrl: ['', Validators.required],
  });

  displayPlaceName(place: any): string {
    return place ? place.name : '';
  }

  constructor(private route: ActivatedRoute, private _router: Router) {
    const breakpointObserver = inject(BreakpointObserver);
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  handleStepperClose() {
    const { dateCtrl, timeCtrl } = this.secondFormGroup.value;
    const { placeCtrl } = this.firstFormGroup.value;
    const data = { where: placeCtrl, when: { date: dateCtrl, time: timeCtrl } };
    console.log(data);
    this._router.navigate(['/article', '1']);
  }

  /**private _filter(value: string): Array<place> {
    const filterValue = value ? value.toLowerCase() : '';

    return this.places.filter((p) => {
      return p.name.toLowerCase().includes('c');
    });
  }**/

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
      this.bookService.getBook(v.bookId).then((b: googleApiBook) => {
        console.log(b);
        this.book = b;
      });
    });

    /**this.filteredOptions =
      this.firstFormGroup!.controls.placeCtrl.valueChanges.pipe(
        map((value) => {
          return this._filter('');
        })
      );**/
  }
  handleOptionChange(e: any) {
    console.log(e);
    this.lat = Number(this.firstFormGroup.value.placeCtrl!.coordinate.lat);
    this.lng = Number(this.firstFormGroup.value.placeCtrl!.coordinate.lng);

    console.log(this.lat, this.lng);
  }
}