import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  map;
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });
    var bounds = this.map.getBounds();

    L.imageOverlay('../../assets/office-layout.png', bounds).addTo(this.map);
    this.map.setMaxBounds(bounds);
    this.map.dragging.disable();
  }
}
