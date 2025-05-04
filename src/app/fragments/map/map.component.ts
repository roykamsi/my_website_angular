import { PLATFORM_ID, inject, Component, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit, OnDestroy {
  private map: any;
  private L: any;
  private platformId = inject(PLATFORM_ID);
  private readonly API_KEY = environment.mapTiler.apiKey;

  constructor() {}

  private async initializeMap(): Promise<void> {
    // Dynamically import Leaflet only in browser
    const leaflet = await import('leaflet');
    this.L = leaflet;

    // Initialize map at Padua coordinates
    const position = [45.39847139398537, 11.86240960834596]; // Using your preferred starting position

    this.map = this.L.map('map', {
      center: position,
      zoom: 14, // Using your preferred zoom level
      zoomControl: false
    });

    // Use regular tile layer for MapTiler dark style with adjusted options
    this.L.tileLayer(`https://api.maptiler.com/maps/dataviz-dark/{z}/{x}/{y}@2x.png?key=${this.API_KEY}`, {
      tileSize: 512,
      zoomOffset: -1,
      minZoom: 1,
      // attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
      crossOrigin: true
    }).addTo(this.map);

    // Create a custom orange marker icon
    const orangeIcon = this.L.divIcon({
      className: 'custom-pin',
      html: `<div class="pin-container">
              <svg width="30" height="42" viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C6.716 0 0 6.716 0 15C0 25.5 15 42 15 42S30 25.5 30 15C30 6.716 23.284 0 15 0Z" fill="#F0A030"/>
                <circle cx="15" cy="15" r="6" fill="white"/>
              </svg>
            </div>`,
      iconSize: [30, 42],
      iconAnchor: [15, 42],
      popupAnchor: [0, -42]
    });

    // Add marker to map at the specified position
    this.L.marker(position, { icon: orangeIcon }).addTo(this.map);

    // Add zoom control to a specific position
    this.L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);
  }

  ngAfterViewInit(): void {
    // Check if we're in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.initializeMap();
    }
  }

  ngOnDestroy(): void {
    if (this.map && isPlatformBrowser(this.platformId)) {
      this.map.remove();
    }
  }
}
