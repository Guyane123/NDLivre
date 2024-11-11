import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {
  @Input() icon: string = "circle";
  @Input() name: string = "Categorie";
  @Input() color: string = "whitesmoke";


}
