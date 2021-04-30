import { Component, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { GeneralService } from '../services/general.service';
import * as moment from 'moment';
import * as L from 'leaflet';
import "leaflet.heat/dist/leaflet-heat.js";
@Component({
  selector: 'app-congestion',
  templateUrl: './congestion.component.html',
  styleUrls: ['./congestion.component.css']
})
export class CongestionComponent implements OnInit {
  congestionForm: FormGroup
  map: any = null
  bounds: any = []
  zones: any = []
  congestionData: any = []
  marker: any = []
  refreshCongestionData: boolean = true
  timeInterval: any
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public general: GeneralService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    this.congestionForm = this.fb.group({
      date: ['', Validators.required],
      fromTime: ['', Validators.required],
      toTime: ['', Validators.required]
    })
    setTimeout(() => {
      this.initiateMap()
    }, 1);
    this.getZones()
    if (this.refreshCongestionData) {
      this.timeInterval = setInterval(() => {
        this.refreshCongestion(this.getData())
      }, 6000);
    };
  }

  ngOnDestroy() {
    this.resetMap()
    clearInterval(this.timeInterval)
  }

  initiate() {
    console.log("this.refreshCongestionData==", this.refreshCongestionData)
    this.timeInterval = setInterval(() => {
      if (this.refreshCongestionData) {
        this.refreshCongestion(this.getData())
      };
    }, 1000*60*5);
  }

  destroy() {
    this.refreshCongestionData = true
    this.initiate()
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
        position: 'topleft'
      }
    })
    this.bounds = this.map.getBounds()
    this.map.setMaxBounds(this.bounds)
    this.map.dragging.disable();
    this.getLayout()

  }

  getData() {
    var now = new Date()
    var then = moment(now).subtract(5, "minutes").toDate()
    var fromDate = moment(then).format("HH:mm")
    var toDate = moment(now).format("HH:mm")
    var data = {
      date: '',
      toTime: toDate,
      fromTime: fromDate
    }
    return data;
  }

  getLayout() {
    this.api.getLayouts().then((res: any) => {
      console.log("res==", res)
      if (res.status) {
        let layout = res.success
        for (let i = 0; i < layout.length; i++) {
          this.api.getLayoutImage(layout[i]._id).then((imgRes: any) => {
            this.clearMapImage()
            L.imageOverlay(imgRes, this.bounds).addTo(this.map)
            this.map.on('load', this.refreshCongestion(this.getData()))
          })
        }
      }
      else { }
    })
  }

  refreshCongestion(value) {
    console.log("value==", value)
    value.date = value.date != '' ? moment(value.date).format('YYYY-MM-DD') : moment(Date.now()).format('YYYY-MM-DD')
    var data = {
      timeZoneOffset: this.general.getZone(),
      fromDate: value.date + ' ' + value.fromTime + ':00',
      toDate: value.date + ' ' + value.toTime + ':00'
    }
    console.log("congestion form data===", data)
    this.api.getCongestion(data).then((res: any) => {
      console.log("congestion res===", res)
      this.congestionData = []
      if (res.status) {
        this.congestionData = res.success.map((obj) => {
          obj.zoneBounds = true
          obj.boundColor = this.getFillColor(obj.congestion)
          obj.bounds = this.getBound(obj.zoneId)
          return obj
        })
        this.createZoneBounds()
      }
      else {

      }

    }).catch((err: any) => {
      console.log("err===", err)
    })
  }

  onSubmit(data) {

    console.log("congestion form data===", data)
    this.refreshCongestionData = false
    clearInterval(this.timeInterval)
    this.refreshCongestion(data)
   
  }

  clickOnZone(data) {
    this.clearMap()
    console.log("data=", data)
    this.congestionData = this.congestionData.map((obj) => {
      if (data.zoneId == obj.zoneId) {
        obj.zoneBounds = true
      }
      else {
        obj.zoneBounds = false
      }
      
      return obj
    })
    this.createZoneBounds()
  }
  
  getBound(data) {
    let arr = [];
    this.zones.filter((obj) => {
      if (data == obj._id) {
        arr.push(obj.bounds)
      }
    })
    return arr
  }

  getFillColor(value) {
    var color = ''
    if (value < 0) {
      return color = 'red'
    }
    else if (value == 0) {
      return color = 'transparent'
    }
    else if (value >= 25) {
      return color = 'yellow'
    }
    else if (value >= 25 && value <= 50) {
      return color = 'blue'
    }
    else {
      return color = 'green'
    }
  }

  getZones() {
    this.api.getZone().then((res: any) => {
      console.log("zones==",res);
      
      if (res.status) {
        this.zones = res.success
      }
    }).catch((err: any) => {
      console.timeLog("err==", err)
    })
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getPopUp(data) {
    let content = 'Congestion : ' + data.congestion + ' min </br> STD : ' + data.standardDeliveryTime + ' min';
    return content;
  }

  createZoneBounds() {
    this.clearMap()
    for (let i = 0; i < this.congestionData.length; i++) {
      if (this.congestionData[i].zoneBounds && this.congestionData[i].bounds[0].length) {
        new L.polygon(this.congestionData[i].bounds[0], {
          color: this.congestionData[i].boundColor == 'transparent' ? this.getRandomColor() : this.congestionData[i].boundColor,
          fillColor: this.congestionData[i].boundColor,
          fillOpacity: 0.7
        })
          .bindPopup(this.getPopUp(this.congestionData[i]),
            { autoClose: false })
          .addTo(this.map).openPopup()
          .on('click', () =>
            this.clickOnZone(this.congestionData[i])
          )
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
  
  resetMap() {
    if (this.map != null) {
      this.clearMap();
      this.clearMapImage();
      this.map.remove();
    }
  }
}
