import {AfterViewInit, Component, inject, signal, ViewChild} from '@angular/core';
import {AddBooksDialogComponent} from "../../components/add-books-dialog/add-books-dialog.component";
import {DialogQCM} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {Book} from "../../components/books/books.component";
import {BarcodeScannerLivestreamComponent, BarcodeScannerLivestreamModule} from "ngx-barcode-scanner";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    BarcodeScannerLivestreamModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements AfterViewInit{
  @ViewChild("BarcodeScannerLivestreamComponent")
  barcodeScanner!: BarcodeScannerLivestreamComponent;

  barcodeValue: string = "dd";

  ngAfterViewInit() {
    this.barcodeScanner.start();
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
    this.barcodeValue= started;
  }
}
