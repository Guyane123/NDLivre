import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [MatIcon, MatButtonModule],
  templateUrl: './go-back.component.html',
  styleUrl: './go-back.component.scss',
})
export class GoBackComponent {
  handleBack() {
    this._location.back();
  }

  constructor(private _location: Location) {}
}
