import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {article} from "../../../types"
import {BookComponent} from "../book/book.component";
import {MatMiniFabButton} from "@angular/material/button";
const BOOK_WIDTH = 300
const BOOK_MARGIN = 32
@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [
    MatIcon,
    BookComponent,
    MatMiniFabButton
  ],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss'
})
export class CarrouselComponent {
  @Input() articles!: Array<article>
  currentSlide: number = 0
  transformX = 0

  isBackDesactivate = true
  IsForwardDesactivate = false

  handleClick() {

  }


  slideGoForward() {
    this.moveSlide(1)
  }

  slideGoBack() {
    this.moveSlide(-1)
  }

  moveSlide(n: number) {

    const nextSlide = this.currentSlide += n
    const nextTransformX =  -(this.currentSlide * BOOK_WIDTH + BOOK_MARGIN)
    if(nextTransformX <= 0 && nextSlide >= 0) {
      this.currentSlide += nextSlide
      this.transformX = nextTransformX
    }
    this.isBackDesactivate = this.transformX == 0;
  }

}
