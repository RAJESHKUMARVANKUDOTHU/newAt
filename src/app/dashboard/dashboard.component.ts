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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  date: any = new Date();
  map;
  zoneList : any = [];
  deviceList : any = [
    {
      _id : '123456',
      zoneId : "6017e1f9ddf0806ec7d3ddf5",
      deviceId : 1,
      coinId : 1,
      zoneName : 'job card',
      inTime : '2021-02-01T10:15:51.108Z',
      outTime : '2021-02-01T10:15:51.108Z',
      latlng : {lat: 71.3125, lng: -94.5}
    },
    {
      _id : '23456',
      zoneId : "60000b28f2f77b310224833e",
      deviceId : 2,
      coinId : 2,
      zoneName : 'washing',
      inTime : '2021-02-01T10:15:51.108Z',
      outTime : '2021-02-01T10:15:51.108Z',
      latlng : {lat: 37.8125, lng: 179}
    },
    {
      _id : '34567',
      zoneId : "6017e1f9ddf0806ec7d3ddf5",
      deviceId : 3,
      coinId : 1,
      zoneName : 'job card',
      inTime : '2021-02-01T10:15:51.108Z',
      outTime : '2021-02-01T10:15:51.108Z',
      latlng : {lat: 35.3125, lng: -61.5}
    },
    {
      _id : '45678',
      zoneId : "60000b28f2f77b310224833e",
      deviceId : 4,
      coinId : 2,
      zoneName : 'washing',
      inTime : '2021-02-01T10:15:51.108Z',
      outTime : '2021-02-01T10:15:51.108Z',
      latlng : {lat: -18.1875, lng: 147}
    },
    {
      _id : '56789',
      zoneId : "6017e20bddf0806ec7d3ddf6",
      deviceId : 5,
      coinId : 4,
      zoneName : 'shopfloor',
      inTime : '2021-02-01T10:15:51.108Z',
      outTime : '2021-02-01T10:15:51.108Z',
      latlng : {lat: 66.8125, lng: 88}
    },
    {
      _id : '67890',
      zoneId : "6017e219c78d016edfc9ca71",
      deviceId : 6,
      coinId : 5,
      zoneName : 'ready post washing',
      inTime : '2021-02-01T10:15:51.108Z',
      outTime : '2021-02-01T10:15:51.108Z',
      latlng : {lat: 0, lng: 0}
    },
    {
      _id : '4321',
      zoneId : "6017e20bddf0806ec7d3ddf6",
      deviceId : 7,
      coinId : 4,
      zoneName : 'shopfloor',
      inTime : '2021-02-01T10:15:51.108Z',
      outTime : '2021-02-01T10:15:51.108Z',
      latlng : {lat: -4.1875, lng: 89.5}
    },
  ];
  marker : any = [];

  constructor(private cd: ChangeDetectorRef, private api: ApiService) {}

  ngOnInit(): void {
    this.congestionGraph();
  }

  ngOnDestroy() {
    this.map.remove();
  }

  ngAfterViewInit() {
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
      },
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1.0,
    });
    var bounds = this.map.getBounds();
    this.map.setMaxBounds(bounds);
    this.map.dragging.disable();
    // this.map.on('click',(event)=>{
    //   console.log("event click===",event);
    // })
    let data = {
      _id : "600693933a4d5fc813ff5041"
    }
    this.api.getLayoutImage(data._id).subscribe((res: any) => {
      L.imageOverlay(res, bounds).addTo(this.map);
      this.map.on('load', this.getZones());
    });
  }

// , {color: "white", weight: 1}
  getZones(){
    console.log("here zones");
    this.api.getZone().then((res: any) => {
      console.log('zone details response==', res);
      this.zoneList = [];
      if (res.status) {
        this.zoneList = res.success.map((obj)=> {
          obj.highlight = false;
          obj.selected = true;
          return obj;
        })
        this.createDevice();
      }
      else{
        this.zoneList = [];
        this.createDevice();
      }
    });
  }

  zoneClick(data){
    console.log("zone click data===",data);
    this.clearMap();
    // this.zoneList = [];
    this.zoneList = this.zoneList.map(obj =>{
      if(obj._id == data._id){
        obj.selected = true;
        obj.highlight = true;
      }
      else{
        obj.selected = false;
        obj.highlight = false;
      }
      return obj;
    })
    console.log("this.zoneList===",this.zoneList);
    this.createDevice();
  }

  createDevice(){
    this.clearMap();
    let icon = L.icon({
      iconUrl: '../../assets/marker.png',
      iconSize: [25, 25],
    });
    for(let i = 0 ; i < this.zoneList.length ; i++){
      if(this.zoneList[i].selected){
        new L.polygon(this.zoneList[i].bounds).addTo(this.map).on('click',()=>{
          this.zoneClick(this.zoneList[i]);
        });
        for(let j = 0 ; j < this.deviceList.length ; j++){
          if(this.deviceList[j].zoneId == this.zoneList[i]._id){
            let latlng = [this.deviceList[j].latlng.lat , this.deviceList[j].latlng.lng]
            this.marker.push(new L.marker(
              latlng,
              { icon: icon }
            ).addTo(this.map));
          }
        }
      }
    }
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
