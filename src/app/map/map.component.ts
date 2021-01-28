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
  marker : any = [];
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
      attributionControl: false
    });
    var bounds = this.map.getBounds();
    // this.map.attributionControl.setPrefix('SenseGiz')
    L.imageOverlay('../../assets/office-layout.png', bounds).addTo(this.map);
    this.map.setMaxBounds(bounds);
    this.map.dragging.disable();

    this.map.on('click', (data) => {
      console.log("data click == ",data);
      if (this.type == 'edit') {
        this.mapService.mapEdit.next({ data: data });
        let latlng = [data.latlng.lat,data.latlng.lng];
        this.mapService.selectedCoinBound.bounds = latlng;
        this.mapService.mapDetectChanges.next({type:this.type});
      } else if(this.type == 'zone'){
        this.mapService.mapZone.next({data:data});
        let latlng = [data.latlng.lat,data.latlng.lng]
        this.mapService.selectedLayoutZone.bounds.push(latlng);
        this.mapService.mapDetectChanges.next({type:this.type});
      }
    });

    this.mapService.mapDetectChanges.subscribe((data)=>{
      this.clearMap();
      console.log("this.map ====",this.map);
      
      if(data.type == 'edit'){
        if(this.mapService.selectedCoinBound.bounds.length){
          
          let icon = L.icon({
            iconUrl: '../../assets/download.jpg',
            iconSize: [20, 20]
          });
          let marker = L.marker(this.mapService.selectedCoinBound.bounds,{icon:icon}).addTo(this.map);
          this.marker.push(marker);
        }
        else if(this.mapService.selectedCoinBound.coinId!= 0){
          console.log("else if");
          
        }
        else{
          for(let i = 0 ;i < this.mapService.GatewayCoinBound.length ; i++){
            if(this.mapService.GatewayCoinBound[i].bound.length){
              let icon = L.icon({
                iconUrl: '../../assets/download.jpg',
                iconSize: [20, 20]
              });
              let marker = L.marker(this.mapService.GatewayCoinBound[i].bound,{icon:icon}).addTo(this.map);
              this.marker.push(marker);
            }
          }
        }
      }
      else if(data.type == 'zone'){
        L.polygon(this.mapService.selectedLayoutZone.bounds).addTo(this.map);
      }
      this.cd.detectChanges();
    })
  }

  clearMap() {
    // this.map._panes.markerPane.remove();
    for(let i in this.marker.length){
      this.map.removeLayer(this.marker[i]);
    }
    for(let i in this.map._layers) {
        if(!this.map._layers[i].hasOwnProperty('_url')) {
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
