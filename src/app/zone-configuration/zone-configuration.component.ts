import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,

} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../services/map-services/map.service';
import { ApiService } from '../services/api.service';
import { GeneralService } from '../services/general.service';
import { MatOption } from '@angular/material/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-zone-configuration',
  templateUrl: './zone-configuration.component.html',
  styleUrls: ['./zone-configuration.component.css'],
})
export class ZoneConfigurationComponent implements OnInit {
  selectLayoutForm: FormGroup;
  selectZoneForm: FormGroup;
  gatewayList: any = [];
  zoneList: any = [ ];
  bound: any = []
  zoneBounds:  any = []
  layoutZone: any = []
  layoutData: any = []
  imageMarker: any = ''
  marker:any = []
  mapDisable:boolean = true
  map: any
  constructor(
    private fb: FormBuilder,
    public mapService: MapService,
    private api: ApiService,
    private general: GeneralService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.mapService.clear();
   console.log("this.layoutData",this.layoutData);
   
    this.getZoneDetails();
    this.getLayout();
    this.selectLayoutForm = this.fb.group({
      layout: ['', Validators.required],
    });
    this.selectZoneForm = this.fb.group({
      zone: ['', Validators.required],
    });

   }

  ngOnDestroy() {
    if (this.map !='') {
      this.map.remove();
    }
    this.layoutData=[]
    this.layoutZone = ''
  }
  ngAfterViewInit() {
    this.mapDisable = true;
    this.map = new L.map('map', {
      attributionControl: false,
      minZoom: 1,
      maxZoom: 5,
      center: [0, 0],
      zoom: 0,
      fullscreenControl: true,
      fullscreenControlOptions: {
        title: 'Show me the fullscreen !',
        titleCancel: 'Exit fullscreen mode',
        position: 'topleft'
      },
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1.0,
    });
    this.bound = this.map.getBounds();
    this.map.setMaxBounds(this.bound);
    this.map.dragging.disable();
    this.map.on('click', (data) => {
      console.log("click data==",data);
      
      let latlng = [data.latlng.lat, data.latlng.lng];
      this.zoneBounds.push(latlng);
      console.log("this.zoneBounds==",this.zoneBounds);
      L.polygon(this.zoneBounds).addTo(this.map); 
      this.cd.detectChanges();
    })
  }

  
  layoutSelect(data) {
    // this.mapService.selectedLayout.next(data._id);
    // this.mapService.selectedLayoutZone.layoutName = data.layoutName;
    // console.log(
    //   'data selectedLayoutCoin zone =',
    //   this.mapService.selectedLayoutZone
    // );
    this.mapDisable = false;
    this.clearMap()
    this.layoutData = []
    this.layoutZone={}
    this.layoutData = data
    console.log('data layout===', this.layoutData);
    this.api.getLayoutImage(data._id).then((res: any) => {
      
      if (this.map.hasLayer(this.imageMarker)) {
        this.map.removeLayer(this.imageMarker);
      }
      this.imageMarker = L.imageOverlay(res, this.bound);
      this.imageMarker.addTo(this.map);
      // for(let i = 0; i< this.zoneList.length; i++){
      //     L.polygon(this.zoneList[i].bounds).addTo(this.map); 
      // }
    
    });
   
  }

  zoneSelect(data) {
    this.clearMap()
    console.log("zone data on select===",data)
    this.layoutZone = {}
    this.layoutZone = {
      id: data._id,
      bounds : data.bounds.length ? data.bounds : []
    }
    console.log("this.layoutZone==",this.layoutZone)
    L.polygon(this.layoutZone.bounds).addTo(this.map); 
    this.cd.detectChanges();
    // this.mapService.selectedLayoutZone.id = data._id;
    // if (data.bounds.length) {
    //   this.mapService.selectedLayoutZone.bounds = data.bounds;
    // } else {
    //   this.mapService.selectedLayoutZone.bounds = [];
    // }
    // this.mapService.mapDetectChanges.next({ type: 'zone' });
    // console.log(
    //   'data selectedLayoutCoin zone =',
    //   this.mapService.selectedLayoutZone
    // );
    // this.zoneBounds = this.layoutZone.bounds
   
  }

  submitZone() {
    var data ={
      id : this.layoutZone.id,
      bounds : this.zoneBounds
    }
    console.log('zone submit===', data);
    this.api.updateZoneBound(data).then((res: any) => {
      console.log('update zone bounds res==', res);
      if (res.status) {
        this.general.openSnackBar(res.message, '');
        this.getZoneDetails();
      }
      else {
        this.general.openSnackBar(res.message, '');
      }
    }).catch(err => {
      console.log("err==", err);
    });
  }

  removeZone() {
    // console.log('zone remove===', data);
    let sendData = {
      id: this.layoutZone.id
    }
    this.api.deleteZoneBound(sendData).then((res: any) => {
      console.log('delete zone bounds res==', res);
      if (res.status) {
        this.general.openSnackBar(res.message, '');
        this.getZoneDetails();
      }
      else {
        this.general.openSnackBar(res.message, '');
      }
    }).catch(err => {
      console.log("err==", err);
    });
  }

  getLayout() {
    this.api
      .getLayouts()
      .then((res: any) => {
        console.log('get layout res===', res);
        if (res.status) {
          this.gatewayList = res.success;
        }
        else{
          this.gatewayList = [];
        }
      })
      .catch((err: any) => {
        console.log('error==', err);
      });
  }

  getZoneDetails() {
    this.api.getZone().then((res: any) => {

      console.log('zone details response==', res);
      this.zoneList = [];
      if (res.status) {
        this.zoneList = res.success;
       
      }
      else {
        this.zoneList = [];
      }
    });


  }

  clearMap() {
    if (this.marker.length != undefined) {
      for (let i in this.marker.length) {
        this.map.removeLayer(this.marker[i].marker);
      }
      for (let i in this.map._layers) {
        if (!this.map._layers[i].hasOwnProperty('_url')) {
          console.log("this.map._layers[i]===", this.map._layers[i]);

          try {
            this.map.removeLayer(this.map._layers[i]);
          } catch (e) {
            console.log('problem with ' + e + this.map._layers[i]);
          }
        }
      }
    }

  }

  
}



// {
//   id: 1,
//   name: 'Job card',
//   bounds: [
//     [8.667918002363134, -229.21875000000003],
//     [18.22935133838668, 275.62500000000006],
//     [-68.56038368664157, 215.15625000000003],
//   ],
// },
// {
//   id: 2,
//   name: 'Washing',
//   bounds: [
//     [-61.48075950007598, -600.4687500000001],
//     [7.27529233637217, -503.43750000000006],
//     [-67.50856836293859, -452.81250000000006],
//     [-79.63987399850707, -530.1562500000001],
//   ],
// },
// {
//   id: 3,
//   name: 'Shopfloor',
//   bounds: [],
// },