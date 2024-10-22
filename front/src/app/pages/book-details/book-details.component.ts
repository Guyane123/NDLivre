import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.scss'
})
export class BookDetailsComponent {

  id: string | undefined
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
      this.id = this.route.snapshot.params['id']
  }
}


