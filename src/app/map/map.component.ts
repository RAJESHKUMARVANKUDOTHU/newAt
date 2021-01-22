import { Component, OnInit, AfterViewInit,OnDestroy } from '@angular/core';
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
      center: [0, 0],
      zoom: 0,
    });
    var bounds = this.map.getBounds();

    L.imageOverlay('../../assets/office-layout.png', bounds).addTo(this.map);
    this.map.setMaxBounds(bounds);
    this.map.dragging.disable();
  }

  ngOnDestroy(){
    // this.map.off();
    this.map.remove();
  }
}
