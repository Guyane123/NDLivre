import {Component, Input} from '@angular/core';
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  @Input() imageLink : string | undefined
}
