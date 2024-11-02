import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBooksDialogComponent } from './add-books-dialog.component';

describe('AddBooksDialogComponent', () => {
  let component: AddBooksDialogComponent;
  let fixture: ComponentFixture<AddBooksDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddBooksDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddBooksDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
