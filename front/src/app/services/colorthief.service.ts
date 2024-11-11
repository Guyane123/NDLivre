import { Injectable } from '@angular/core';
import ColorThief from 'colorthief';

@Injectable({
  providedIn: 'root',
})
export class ColorThiefService {
  colorThief;

  constructor() {
    this.colorThief = new ColorThief();
  }

  getDominantColor(image: HTMLImageElement): Promise<number[]> {
    return new Promise((resolve, reject) => {
      if (image.complete) {
        resolve(this.colorThief.getColor(image));
      } else {
        image.onload = () => resolve(this.colorThief.getColor(image));
        image.onerror = (err) => reject(err);
      }
    });
  }
}
