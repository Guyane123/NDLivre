import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  input,
  Input,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit {
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() lat: number | undefined;
  @Input() lng: number | undefined;

  private map: L.Map | undefined;
  @ViewChild('container') container: ElementRef<HTMLDivElement> | undefined;

  onMapClick(e: any) {
    console.log(e);
    this.change.emit(e.latlng);
  }

  private initMap(): void {
    this.map = L.map(this.container?.nativeElement!, {
      center: [47.80651738328047, -3.2794998697707545],
      zoom: 20,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);

    this.map.on('click', (e) => {
      this.onMapClick(e);
      this.map!.removeLayer(marker);
      marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(this.map!);
    });

    let marker = L.marker([
      this.lat ? this.lat : 47.80651738328047,
      this.lng ? this.lng : -3.2794998697707545,
    ]).addTo(this.map);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
