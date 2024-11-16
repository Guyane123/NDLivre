import {Component, ElementRef, HostListener, Input, ViewChild} from '@angular/core';
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
  startX = 0;
  velocityX = 0;
  lastTouchEndTime = 0;


  @ViewChild('articlesContainer', { static: true }) articlesContainer!: ElementRef;


  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    this.startX = event.touches[0].clientX;
    this.velocityX = 0; // reset velocity when a new touch starts
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    const currentX = event.touches[0].clientX;
    const distance = currentX - this.startX;
    const currentTime = new Date().getTime();
    if (this.lastTouchEndTime) {
      this.velocityX = distance / (currentTime- this.lastTouchEndTime); //This will be velocity in pixels per millisecond.
    }
    this.transformX += distance;
    this.startX = currentX;
    this.updateTransform();
    this.lastTouchEndTime = currentTime;
  }



  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent): void {
    this.decelerate();
  }


  private updateTransform(): void {
    const contentWidth = this.articlesContainer.nativeElement.offsetWidth; // Calculate total width of all articles

    const minX = 0;
    const maxX = contentWidth

    if(this.transformX < minX && this.transformX > -maxX) {
      this.articlesContainer.nativeElement.style.transform = `translateX(${this.transformX}px)`;
    }

  }

  private decelerate(): void {
    if (Math.abs(this.velocityX) < .2) { //If the velocity is small then consider it 0 to avoid infinite animation
      this.velocityX = 0;
    }
    if (this.velocityX === 0) {
      return; //If the velocity is 0 then do nothing
    }

    this.transformX += this.velocityX * 25; // Adjust the multiplier (50) to control the deceleration rate
    this.velocityX *= 0.8; // Reduce velocity over time
    this.updateTransform();


    requestAnimationFrame(() => this.decelerate());
  }

  isBackDesactivate = true
  IsForwardDesactivate = false





  slideForward() {
    this.isBackDesactivate = false;
    console.log(this.currentSlide)
    if(this.currentSlide > this.articles.length ) {
      this.IsForwardDesactivate = true;
      return
    }
    this.currentSlide+=1
    this.moveSlide(-1)
  }


  slideBackward() {
    this.IsForwardDesactivate = false;
    if(this.currentSlide <= 0) {
      this.isBackDesactivate = true;
      return
    }
    this.currentSlide-=1
    this.moveSlide(1)
  }

  moveSlide(t: number) {
    console.log((this.currentSlide))
    this.transformX +=  t *(BOOK_WIDTH + BOOK_MARGIN);
    console.log(this.currentSlide, this.transformX)
    this.articlesContainer.nativeElement.style.transform = `translateX(${this.transformX}px)`;
  }

}
