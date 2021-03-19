import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from '../services/api.service';
import { environment } from '../../environments/environment';
import * as CanvasJS from '../../assets/canvasjs-3.2.7/canvasjs.min';
import 'leaflet.animatedmarker/src/AnimatedMarker';
import * as moment from 'moment';
import { LoginAuthService } from '../services/login-auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  date: any = new Date();
  map;
  zoneList: any = [];
  zoneAction: any = [];
  deviceList: any = [
    {
      _id: '123456',
      zoneId: '6017e1f9ddf0806ec7d3ddf5',
      deviceId: 1,
      coinId: 1,
      zoneName: 'job card',
      inTime: '2021-02-01T10:15:51.108Z',
      outTime: '2021-02-01T10:15:51.108Z',
      latlng: [
        { lat: 71.3125, lng: -94.5 },
        { lat: 37.8125, lng: 179 },
      ],
    },
    {
      _id: '23456',
      zoneId: '60000b28f2f77b310224833e',
      deviceId: 2,
      coinId: 2,
      zoneName: 'washing',
      inTime: '2021-02-01T10:15:51.108Z',
      outTime: '2021-02-01T10:15:51.108Z',
      latlng: [
        { lat: 37.8125, lng: 179 },
        { lat: 71.3125, lng: -94.5 },
      ],
    },
    {
      _id: '34567',
      zoneId: '6017e1f9ddf0806ec7d3ddf5',
      deviceId: 3,
      coinId: 1,
      zoneName: 'job card',
      inTime: '2021-02-01T10:15:51.108Z',
      outTime: '2021-02-01T10:15:51.108Z',
      latlng: [{ lat: 35.3125, lng: -61.5 }, { lat: -18.1875, lng: 147 }, { lat: 35.3125, lng: -61.5 }, { lat: 66.8125, lng: 88 }],
    },
    {
      _id: '45678',
      zoneId: '60000b28f2f77b310224833e',
      deviceId: 4,
      coinId: 2,
      zoneName: 'washing',
      inTime: '2021-02-01T10:15:51.108Z',
      outTime: '2021-02-01T10:15:51.108Z',
      latlng: [{ lat: -18.1875, lng: 147 }],
    },
    {
      _id: '56789',
      zoneId: '6017e20bddf0806ec7d3ddf6',
      deviceId: 5,
      coinId: 4,
      zoneName: 'shopfloor',
      inTime: '2021-02-01T10:15:51.108Z',
      outTime: '2021-02-01T10:15:51.108Z',
      latlng: [{ lat: 66.8125, lng: 88 }],
    },
    {
      _id: '67890',
      zoneId: '6017e219c78d016edfc9ca71',
      deviceId: 6,
      coinId: 5,
      zoneName: 'ready post washing',
      inTime: '2021-02-01T10:15:51.108Z',
      outTime: '2021-02-01T10:15:51.108Z',
      latlng: [{ lat: 0, lng: 0 }],
    },
    {
      _id: '4321',
      zoneId: '6017e20bddf0806ec7d3ddf6',
      deviceId: 7,
      coinId: 4,
      zoneName: 'shopfloor',
      inTime: '2021-02-01T10:15:51.108Z',
      outTime: '2021-02-01T10:15:51.108Z',
      latlng: [{ lat: -4.1875, lng: 89.5 }],
    },
  ];
  tempDeviceList: any = [];
  tempZoneList: any = [];
  marker: any = [];
  interval : any;
  errStatus: any = {
    searchError: false,
    searchMessage: 'Vehicle not found',
  };

  constructor(private cd: ChangeDetectorRef, private api: ApiService, private login : LoginAuthService) { }

  ngOnInit(): void {
    this.congestionGraph();
    setTimeout(() => {
      this.createMap();
    }, 1);
    this.login.loginCheckData.subscribe(res=>{
      if(!res.other){
        this.clearTimeInterval()
      }
    })
  }

  ngOnDestroy() {
    if (this.map) {
      this.map.remove();
    }
    this.clearTimeInterval()
  }

  clearTimeInterval(){
    clearInterval(this.interval);
  }

  createMap() {
    this.map = L.map('map', {
      attributionControl: false,
      minZoom: 1,
      maxZoom: 5,
      center: [0, 0],
      zoom: 0,
      fullscreenControl: true,
      fullscreenControlOptions: {
        title: 'Show me the fullscreen !',
        titleCancel: 'Exit fullscreen mode',
        position: 'topleft',
      },
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1.0,
    });
    var bounds = this.map.getBounds();
    this.map.setMaxBounds(bounds);
    this.map.dragging.disable();
    this.getLayout();
    this.map.on('click', (data) => {
      console.log("data latlng===",data.latlng);
    });
  }

  getLayout() {
    this.api
      .getLayouts()
      .then((res: any) => {
        console.log('get layout res===', res);
        if (res.status) {
          let data = res.success
          for (let i = 0; i < data.length; i++) {
            if (data[i].layoutName != null) {
              this.api.getLayoutImage(data[i]._id).then((resImg: any) => {
                this.clearMapImage();
                var bounds = this.map.getBounds();
                L.imageOverlay(resImg, bounds).addTo(this.map);
                this.map.on('load', this.getZones());
                // this.map.on('load', this.getZongetZoneVehicleDataes());
              });
              break;
            }
          }
        }
        else {
          this.clearMapImage();
          this.clearMap();
        }
      })
      .catch((err: any) => {
        console.log('error==', err);
      });
  }

  getZongetZoneVehicleDataes() {
    this.api.getZoneVehicleData().then((res: any) => {
      console.log('zone vehicle response==', res);
      if (res.status) {
        this.deviceList = res.success;
        let data = res.success;
        data.map((obj, index) => {
          let latlng = [{
            lat: obj.deviceData.deviceBound.latitude,
            lng: obj.deviceData.deviceBound.longitude
          }]
          this.deviceList[index].latlng = latlng;
        });
        this.tempDeviceList = this.deviceList;
        this.calculateZoneActions();
      } else {
        this.deviceList = [];
      }
      this.createDevice();
    });
  }

  // , {color: "white", weight: 1}

  getZones() {
    console.log('here zones');
    this.api.getZone().then((res: any) => {
      console.log('zone details response==', res);
      this.zoneList = [];
      if (res.status) {
        this.getZongetZoneVehicleDataes();
        this.interval = setInterval(()=>{
          this.getZongetZoneVehicleDataes();
        },10000)
        this.zoneList = res.success.map((obj) => {
          obj.highlight = false;
          obj.selected = true;
          obj.color = this.getRandomColor();
          return obj;
        });
        this.tempZoneList = this.zoneList;
      } else {
        this.zoneList = [];
      }
    });
  }


  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  zoneClick(data) {
    console.log('zone click data===', data);
    this.clearMap();
    // this.zoneList = [];
    this.zoneList = this.zoneList.map((obj) => {
      if (obj._id == data._id) {
        obj.selected = true;
        obj.highlight = true;
      } else {
        obj.selected = false;
        obj.highlight = false;
      }
      return obj;
    });
    console.log('this.zoneList===', this.zoneList);
    this.createDevice();
  }

  createDevice() {
    this.clearMap();
    let icon = L.icon({
      iconUrl: '../../assets/marker.png',
      iconSize: [25, 25],
    });
    console.log("this.deviceList==", this.deviceList,"this.zoneList==",this.zoneList);

    for (let i = 0; i < this.zoneList.length; i++) {
      if (this.zoneList[i].selected) {
        new L.polygon(this.zoneList[i].bounds, { color: this.zoneList[i].color })
          .addTo(this.map)
          .on('click', () => {
            this.zoneClick(this.zoneList[i]);
          });
        for (let j = 0; j < this.deviceList.length; j++) {
          if (this.deviceList[j].zoneId == this.zoneList[i]._id) {
            let latlng = [];
            for (let k = 0; k < this.deviceList[j].latlng.length; k++) {
              latlng.push([
                this.deviceList[j].latlng[k].lat,
                this.deviceList[j].latlng[k].lng,
              ]);
            }
            this.marker.push(
              new L.animatedMarker(latlng, { icon: icon, interval: 3000 })
                .addTo(this.map)
                .bindPopup(this.getPopUpForm(this.deviceList[j]))
                .openPopup()
            );
          }
        }
      }
    }
  }

  searchVehicle(data) {
    console.log('search data===', data);
    if (data) {
      this.deviceList = this.tempDeviceList.filter((obj) => {
        return (
          obj.deviceId
            .toString()
            .toLowerCase()
            .indexOf(data.toString().toLowerCase()) > -1
        );
      });

      for (let i = 0; i < this.deviceList.length; i++) {
        this.zoneList = this.tempZoneList.filter((obj) => {
          if (
            obj._id
              .toString()
              .toLowerCase()
              .indexOf(this.deviceList[i].zoneId.toString().toLowerCase()) > -1
          ) {
            obj.selected = true;
            obj.highlight = true;
            return obj;
          } else {
            return;
          }
        });
      }

      if (!this.zoneList.length || !this.deviceList.length) {
        this.errStatus.searchError = true;
        this.clearSearchDeviceZone();
      } else {
        this.errStatus.searchError = false;
      }
    } else {
      this.clearSearchDeviceZone();
    }
    this.createDevice();
  }

  clearSearchDeviceZone() {
    this.deviceList = this.tempDeviceList;
    this.zoneList = this.tempZoneList;
    this.zoneList = this.zoneList.map((obj) => {
      obj.selected = true;
      obj.highlight = false;
      return obj;
    });
  }

  getPopUpForm(data) {
    let edt = moment(data.inTime).add(data.totalDelay, 'milliseconds').format('YYYY-MM-DD hh:mm:ss')
    let a = '<table>';
    a += '<tr><td><b>Vehicle Name</b></td><td>' + data.deviceName + '</td></tr>';
    a += '<tr><td><b>Location Name</b></td><td>' + data.coinName + '</td></tr>';
    a += '<tr><td><b>Zone Name</b></td><td>' + data.zoneName + '</td></tr>';
    a += '<tr><td><b>In time</b></td><td>' + moment(data.inTime).format('YYYY-MM-DD hh:mm:ss') + '</td></tr>';
    a += '<tr><td><b>SDT</b></td><td>' + data.standardDeliveryTime + ' minutes</td></tr>';
    a += '<tr><td><b>EDT</b></td><td>' + edt + '</td></tr>';
    a += '</table>';
    return a;
  }


  calculateZoneActions() {
    let groupByzone = this.groupByZone();
    let data = Object.keys(groupByzone).map((obj) => {
      return {
        data: groupByzone[obj],
        zoneName: obj
      }
    })
    var sum = 0;
    var prevdate = null ;
    data.forEach(element => {
      element.data.forEach((obj,index) => {
        var thedate = moment(obj.inTime, "YYYY-MM-DD hh:mm:ss");
        if (prevdate) {
          sum += prevdate.diff(thedate, 'milliseconds');
        }
        prevdate = thedate;
      });
      var avg = (sum / (element.data.length));
      this.zoneList.forEach(zone => {
        if(zone.zoneName == element.zoneName){
          zone.vehicleCount = element.data.length;
          zone.avgTime = avg;
        }
        else{
          zone.vehicleCount = 0;
          zone.avgTime = 0;
        }
      });
    });
    console.log("data calculate zone actions===", groupByzone, "data1===", data,"this.zoneAction==",this.zoneList);
  }


  groupByZone() {
    return this.deviceList.reduce(function (r, a) {
      r[a.zoneName] = r[a.zoneName] || [];
      r[a.zoneName].push(a);
      return r;
    }, Object.create(null));
  }

  clearMap() {
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

  congestionGraph() {
    var chart = new CanvasJS.Chart('line', {
      animationEnabled: true,
      theme: 'light2',
      title: {
        text: '',
      },
      data: [
        {
          type: 'line',
          indexLabelFontSize: 12,
          dataPoints: [
            { x: 0, y: 0 },
            { x: 20, y: 470 },
            { x: 30, y: 490 },
            { x: 40, y: 500 },
            { x: 50, y: 550 },
            { x: 60, y: 600 },
            { x: 70, y: 650 },

            // { y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
          ],
        },
      ],
    });
    chart.render();
  }

}
