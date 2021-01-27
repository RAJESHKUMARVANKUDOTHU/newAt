import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  ChangeDetectorRef
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
  constructor(private mapService: MapService,
    private cd: ChangeDetectorRef
    ) {
    console.log('mapService===', this.mapService);
  }

  ngOnInit(): void {
    console.log('type==', this.type);
  }

  ngOnDestroy(){
    this.map.remove()
  }

  ngAfterViewInit(){
    this.map = L.map('map', {
      center: [0, 0],
      zoom: 0,
    });
    var bounds = this.map.getBounds();

    L.imageOverlay('../../assets/office-layout.png', bounds).addTo(this.map);
    this.map.setMaxBounds(bounds);
    this.map.dragging.disable();

    this.map.on('click', (data) => {
      console.log("data click == ",data);
      if (this.type == 'edit') {
        this.mapService.mapEdit.next({ data: data });
      } else if(this.type == 'zone'){
        this.mapService.mapZone.next({data:data});
        let latlng = [data.latlng.lat,data.latlng.lng]
        this.mapService.selectedLayoutZone.bounds.push(latlng);
        this.mapService.mapDetectChanges.next();
      }
    });

    this.mapService.mapDetectChanges.subscribe(()=>{
      this.clearMap();
      L.polygon(this.mapService.selectedLayoutZone.bounds).addTo(this.map);
      this.cd.detectChanges();
    })
  }

  clearMap() {
    for(let i in this.map._layers) {
        if(this.map._layers[i]._path != undefined) {
            try {
              this.map.removeLayer(this.map._layers[i]);
            }
            catch(e) {
                console.log("problem with " + e + this.map._layers[i]);
            }
        }
    }
}

}
