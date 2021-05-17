import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import * as L from 'leaflet';
// import 'leaflet.marker.slideto/Leaflet.Marker.SlideTo';
// import 'leaflet-rotatedmarker/leaflet.rotatedMarker';
import 'leaflet-moving-rotated-marker/leaflet.movingRotatedMarker';
@Component({
  selector: 'app-vehicle-track',
  templateUrl: './vehicle-track.component.html',
  styleUrls: ['./vehicle-track.component.css']
})
export class VehicleTrackComponent implements OnInit {
  vehicleHistory: FormGroup;
  vehicleData: any = [];
  deviceData: any = [];
  marker: any = [];
  bounds: any = [];
  map: any = null;
  timeInterval: any;
  refreshVehicleData: boolean = true;

  constructor(
    private fb: FormBuilder,
    private login: LoginAuthService,
    private api: ApiService,
    private general: GeneralService,
    private cd: ChangeDetectorRef
  ) { }



  ngOnInit(): void {
    this.vehicleHistory = this.fb.group({
      date: ['', Validators.required],
      deviceName: ['']
    });

    setTimeout(() => {
      this.initiateMap();
    }, 1);

    this.refreshVehicle();

    if (this.refreshVehicleData) {
      this.timeInterval = setInterval(() => {
        this.refreshVehicle();
      }, 1000 * 30);
    };

    this.cd.detectChanges();
    this.refreshDevice();
  }

  ngOnDestroy() {
    this.resetMap();
  }

  initiate() {
    this.timeInterval = setInterval(() => {
      if (this.refreshVehicleData) {
        this.refreshVehicle();
      };
    }, 1000 * 30);
  }

  destroy() {
    this.refreshVehicleData = true;
    this.resetMap();
    this.cd.detectChanges();
    this.initiateMap();
    this.initiate();
  }

  resetMap() {
    if (this.map != null) {
      this.clearMap();
      this.clearMapImage();
      this.map.remove();
    }
  }

  initiateMap() {
    this.map = L.map('map', {
      attributionControl: false,
      minZoom: 1,
      maxZoom: 5,
      center: [0, 0],
      zoom: 0,
      zoomControl: true,
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1.0,
      fullscreenControl: true,
      fullscreenControlOptions: {
        title: 'Show me the fullscreen !',
        titleCancel: 'Exit fullscreen mode',
        position: 'topleft',
      },
    })
    this.bounds = this.map.getBounds();
    this.map.setMaxBounds(this.bounds);
    this.map.dragging.disable();
    this.getLayout();
  }

  getLayout() {
    this.api.getLayouts().then((res: any) => {
      console.log("res==", res)
      if (res.status) {
        let layout = res.success
        for (let i = 0; i < layout.length; i++) {
          this.api.getLayoutImage(layout[i]._id).then((imgRes: any) => {
            this.clearMapImage();
            L.imageOverlay(imgRes, this.bounds).addTo(this.map);
          })
        }
      }
      else { }
    })
  }

  refreshDevice() {
    var data = '';
    this.api.getDeviceData(data).then((res: any) => {

      this.deviceData = [];
      console.log("find submit====", res);
      if (res.status) {
        this.deviceData = res.success;
      }
      else {
        this.deviceData = [];
      }

    }).catch((err: any) => {
      console.log("error===", err)
    })
  }

  refreshVehicle() {
    var date = moment(new Date()).format('YYYY-MM-DD');

    var data = {
      fromDate: date,
      toDate: date,
      timeZoneOffset: this.general.getZone()
    };
    console.log("data==", data);

    this.api.getdeviceLatLngPerDay(data).then((res: any) => {
      console.log('getdeviceLatLngPerDay response==', res);
      this.vehicleData = [];
      if (res.status) {
        this.vehicleData = res.success;
        for (let i = 0; i < this.vehicleData.length; i++) {
          this.addMarker(this.vehicleData[i], i);
          // for (let j = 0; j < this.vehicleData[i].latLong.length; j++) {
          // }
        }
      }
      else { }
    }).catch(err => {
      console.log("err===", err);
    });
  }

  submit(value) {
    console.log("valuee=", value);
    value.date = moment(value.date).format('YYYY-MM-DD');

    var data = {
      fromDate: value.date,
      toDate: value.date,
      deviceName: value.deviceName,
      timeZoneOffset: this.general.getZone()
    };
    console.log("data==", data);

    this.api.getdeviceLatLngPerDay(data).then(async (res: any) => {
      console.log('getdeviceLatLngPerDay response==', res);
      this.vehicleData = [];
      if (res.status) {
        this.refreshVehicleData = false;
        clearInterval(this.timeInterval);
        this.vehicleData = res.success;
        let vehicleDataPromise = this.vehicleData.map((obj,index)=>this.addMarker(obj,index));
        await Promise.all([vehicleDataPromise]);
        // for (let i = 0; i < this.vehicleData.length; i++) {
        //   this.addMarker(this.vehicleData[i], i);
        //   // for (let j = 0; j < this.vehicleData[i].latLong.length; j++) {
        //   // }
        // }
      }
      else { }
    }).catch(err => {
      console.log("err===", err);
    });
  }

  ClearMarkerTimer: any;
  

  async addMarker(data, i) {
      console.log("data==", data);
      let icon = L.icon({
        iconUrl: '../../assets/Car_Black.png',
        iconSize: [60, 60],
      });

      let latlng = [];
      for (let i = 0; i < data.latLong.length; i++) {
        latlng.push([data.latLong[i].latitude, data.latLong[i].longitude])
      }

      var m = new L.marker([data.latLong[0].latitude, data.latLong[0].longitude], {
        icon: icon,
        rotationAngle: 45 // default rotation
      }).addTo(this.map);

      let polyLine = new L.polyline(latlng, {
        color: 'blue',
        weight: 3,
        opacity: 0.5,
        smoothFactor: 1
      }).addTo(this.map);

      this.ClearMarkerTimer = setInterval(() => {
        console.log("time ");
        this.simulate(data, m, i);
      }, 1000);

      this.index = 0;
      this.simulate(data, m, i);

      this.cd.detectChanges();
  }


  index: any = 0;


  async simulate(data, m, i) {
    let allLatLng = data.latLong;
    let latlng = [];
    let marker;
    let icon = L.icon({
      iconUrl: '../../assets/Car_Black.png',
      iconSize: [60, 60],
    });

    // if (this.ClearMarkerTimer[i]) {
      console.log("this.index == allLatLng.length - 1==",this.index == allLatLng.length - 1);
      
      if (this.index == allLatLng.length - 1) {
        clearInterval(this.ClearMarkerTimer[i]);
        return;
      }
    // }

    console.log("allLatLng===", allLatLng, "this.index==", this.index);

    if (allLatLng.length - 1 >= this.index) {
      latlng.push([allLatLng[this.index].latitude, allLatLng[this.index].longitude]);

      latlng.push([allLatLng[this.index + 1].latitude, allLatLng[this.index + 1].longitude]);

      if (latlng.length > 2)
        latlng.slice(1);
    }
    this.index += 1;

    let angle = await this.angleFromCoordinate(latlng[0][0], latlng[0][1], latlng[1][0], latlng[1][1]);
    console.log("latlng=", latlng, "angle==", angle);

    m.slideTo(latlng[1], {
      duration: 1000,
      rotationAngle: angle
    });
  }


  angleFromCoordinate(lat1, long1, lat2,
    long2) {

    let dLon = (long2 - long1);

    let y = Math.sin(dLon) * Math.cos(lat2);
    let x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1)
      * Math.cos(lat2) * Math.cos(dLon);

    let brng = Math.atan2(y, x);

    brng *= 180 / Math.PI;
    brng = (brng + 360) % 360;
    brng = 360 - brng; // count degrees counter-clockwise - remove to make clockwise

    return brng;
  }

  clearMap() {
    if (this.marker.length != undefined) {
      for (let i in this.marker.length) {
        this.map.removeLayer(this.marker[i]);
      }
      for (let i in this.map._layers) {
        if (!this.map._layers[i].hasOwnProperty('_url')) {
          try {
            this.map.removeLayer(this.map._layers[i]);
          } catch (e) {
            console.log('problem with ' + e + this.map._layers[i]);
          }
        }
      }
    }
  }

  clearMapImage() {
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
