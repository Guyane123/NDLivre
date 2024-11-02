import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  input,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss',
})
export class MapComponent implements AfterViewInit, OnChanges {
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Input() lat: number | undefined;
  @Input() lng: number | undefined;

  private map: L.Map | undefined;
  private marker: L.Marker | undefined;
  private defaultLat = -3.2794998697707545;
  private defaultLng = 47.80651738328047;

  @ViewChild('container') container: ElementRef<HTMLDivElement> | undefined;

  onMapClick(e: any) {
    console.log(e);
    const { lat, lng } = e.latlng;
    this.change.emit(e.latlng);
    this.updateMarkerPosition(lat, lng);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lat'] || changes['lng']) {
      const latCV = changes['lat'].currentValue;
      const lngCV = changes['lng'].currentValue;
      const lat = this.lat ?? this.defaultLat;
      const lng = this.lng ?? this.defaultLng;
      console.log({ latCV, lat }, { lngCV, lng });
      this.updateMarkerPosition(lat, lng);
    }
  }

  private updateMarkerPosition(lat: number, lng: number): void {
    if (this.marker) {
      this.marker.setLatLng([lat, lng]);
    } else {
      // Add marker if it doesn’t exist
      this.marker = L.marker([lat, lng]).addTo(this.map!);
    }
  }
  private initMap(): void {
    const lat = this.lat ?? this.defaultLat;
    const lng = this.lng ?? this.defaultLng;

    this.map = L.map(this.container?.nativeElement!, {
      center: [lat, lng],
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

    this.marker = L.marker([lat, lng]).addTo(this.map);

    this.map.on('click', (e) => {
      this.onMapClick(e);
    });

    this.marker?.addTo(this.map);
  }

  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
