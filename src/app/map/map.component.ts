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
    // center of the map
    var center = [-33.865, 151.2094];

    // Create the map
    this.map = L.map('map').setView(center, 8);

    // Set up the OSM layer
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution:
    //     'Data © <a href="http://osm.org/copyright">OpenStreetMap</a>',
    //   maxZoom: 18,
    // }).addTo(this.map);

    // add a marker in the given location
    // L.marker(center).addTo(this.map);
    // L.marker([-35.865, 154.2094]).addTo(this.map);
   
    var imageUrl ='../../assets/office-layout.png',
              imageBounds = [center, [-35.865, 154.2094]];

    L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
  }
}
