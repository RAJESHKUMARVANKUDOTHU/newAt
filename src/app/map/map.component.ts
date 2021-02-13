import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import * as L from 'leaflet';
import { MapService } from '../services/map-services/map.service';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  @Input() type: string;
  host: string = environment.apiHost;
  map;
  imageMarker :any = '';
  marker: any = [];
  mapDisable : boolean = true;
  constructor(
    private mapService: MapService,
    private cd: ChangeDetectorRef,
    private api: ApiService
  ) {
    console.log('mapService===', this.mapService);
  }

  ngOnInit(): void {
    console.log('type==', this.type);
  }

  ngOnDestroy() {
    if(this.map){
      this.map.remove();
    }
  }

  ngAfterViewInit() {
    this.mapDisable = true;
    this.map = L.map('map', {
      // center: [0, 0],
      // zoom: 3,
      attributionControl: false,
      minZoom: 1,
      maxZoom: 5,
      center: [0, 0],
      zoom: 0,
      fullscreenControl: true,
      fullscreenControlOptions: {
        title: 'Show me the fullscreen !',
        titleCancel: 'Exit fullscreen mode',
      },
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1.0,
    });
    var bounds = this.map.getBounds();
    this.map.setMaxBounds(bounds);
    this.map.dragging.disable();

    this.mapService.selectedLayout.subscribe((data) => {
      this.mapDisable = false;
      this.clearMap();
      // this.clearImage();
      this.api.getLayoutImage(data).then((res: any) => {
        if (this.map.hasLayer(this.imageMarker)) {
          this.map.removeLayer(this.imageMarker);
        }
        this.imageMarker = L.imageOverlay(res, bounds);
        this.imageMarker.addTo(this.map);
      });
    });

   

    this.map.on('click', (data) => {
      console.log('data click == ', data);
      if (this.type == 'edit') {
        let latlng = [data.latlng.lat, data.latlng.lng];
        this.mapService.selectedCoinBound.coinBounds = latlng;
        this.mapService.mapDetectChanges.next({ type: this.type });
      } else if (this.type == 'zone') {
        this.mapService.mapZone.next({ data: data });
        let latlng = [data.latlng.lat, data.latlng.lng];
        this.mapService.selectedLayoutZone.bounds.push(latlng);
        this.mapService.mapDetectChanges.next({ type: this.type });
      }
    });

    this.mapService.mapDetectChanges.subscribe((data) => {
      this.clearMap();
      console.log('this.map ====', this.map);

      if (data.type == 'edit') {
        console.log('coin slected bound===', this.mapService.selectedCoinBound);

        if (this.mapService.selectedCoinBound.coinBounds.length) {
          let icon = L.icon({
            iconUrl: '../../assets/marker.png',
            iconSize: [25, 25],
          });
          let marker = L.marker(this.mapService.selectedCoinBound.coinBounds, {
            icon: icon,
            draggable: 'true',
            riseOnHover: true,
          })
            .addTo(this.map)
            .on('click', (data) => {
              console.log('data====', data);
            });
          marker.coinId = this.mapService.selectedCoinBound.coinId;
          marker.on('dragend', (event) => {
            let markerDrag = event.target;
            let position = markerDrag.getLatLng();
            let latlng = [position.lat, position.lng];
            this.mapService.selectedCoinBound.coinBounds = latlng;
          });
          this.marker.push({
            marker: marker,
            coinId: this.mapService.selectedCoinBound.coinId,
          });
        } else if (this.mapService.selectedCoinBound.coinId != 0) {
          console.log('else if');
        } else {
          for (let i = 0; i < this.mapService.GatewayCoinBound.length; i++) {
            if (this.mapService.GatewayCoinBound[i].coinBounds.length) {
              let icon = L.icon({
                iconUrl: '../../assets/marker.png',
                iconSize: [25, 25],
              });
              let marker = L.marker(
                this.mapService.GatewayCoinBound[i].coinBounds,
                { icon: icon }
              );
              marker.coinId = this.mapService.GatewayCoinBound[i].coinId;
              marker.coinName = this.mapService.GatewayCoinBound[i].coinName;
              marker.coinBounds = this.mapService.GatewayCoinBound[
                i
              ].coinBounds;

              marker.addTo(this.map).on('click', (data) => {
                this.mapService.mapCoinSelected.next(data.target.coinId);
                this.mapService.selectedCoinBound.coinId = data.target.coinId;
                this.mapService.selectedCoinBound.coinName =
                  data.target.coinName;
                this.mapService.selectedCoinBound.coinBounds =
                  data.target.coinBounds;
                this.mapService.mapDetectChanges.next({ type: this.type });

                // marker.dragging.enable();
                marker.on('dragend', (event) => {
                  let markerDrag = event.target;
                  let position = markerDrag.getLatLng();
                  let latlng = [position.lat, position.lng];
                  this.mapService.selectedCoinBound.coinBounds = latlng;
                });
                console.log('data====', data);
                let selectedMarker = this.mapService.coinData.filter((obj) => {
                  return obj.coinId == data.target.coinId;
                });
                console.log('selectedMarker===', selectedMarker);
              });
              this.marker.push({
                marker: marker,
                coinId: this.mapService.GatewayCoinBound[i].coinId,
              });
            }
          }
        }
      } else if (data.type == 'zone') {
        L.polygon(this.mapService.selectedLayoutZone.bounds).addTo(this.map);
      }
      this.cd.detectChanges();
    });
  }

  clearMap() {
    // this.map._panes.markerPane.remove();
    for (let i in this.marker.length) {
      this.map.removeLayer(this.marker[i].marker);
    }
    for (let i in this.map._layers) {
      if (!this.map._layers[i].hasOwnProperty('_url')) {
        console.log("this.map._layers[i]===",this.map._layers[i]);
        
        try {
          this.map.removeLayer(this.map._layers[i]);
        } catch (e) {
          console.log('problem with ' + e + this.map._layers[i]);
        }
      }
    }
  }

  clearImage(){
    for (let i in this.map._layers) {
      if (this.map._layers[i].hasOwnProperty('_url')) {
        try {
          this.map.removeLayer(this.map._layers[i]);
        } catch (e) {
          console.log('problem with ' + e + this.map._layers[i]);
        }
      }
    }
  }

}
