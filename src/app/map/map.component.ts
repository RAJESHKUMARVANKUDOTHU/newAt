import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../services/map-services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() type: string;
  map;
  constructor(private mapService: MapService) {
    console.log('mapService===', this.mapService);
  }

  ngOnInit(): void {
    console.log('type==', this.type);

    this.map = L.map('map', {
      center: [0, 0],
      zoom: 0,
    });
    var bounds = this.map.getBounds();

    L.imageOverlay('../../assets/office-layout.png', bounds).addTo(this.map);
    this.map.setMaxBounds(bounds);
    this.map.dragging.disable();
    
    this.map.on('click', (data) => {
      if (this.type == 'edit') {
        this.mapService.mapEdit.next({ data: data });
      } else {
      }
    });
  }

}
