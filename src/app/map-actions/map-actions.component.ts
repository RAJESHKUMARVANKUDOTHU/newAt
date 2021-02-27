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
import * as L from 'leaflet' ;
@Component({
  selector: 'app-map-actions',
  templateUrl: './map-actions.component.html',
  styleUrls: ['./map-actions.component.css'],
})
export class MapActionsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('allSelected') private allSelected: MatOption;
  @ViewChild('mapElement') mapElement: ElementRef;
  newLayoutForm: FormGroup;
  tempImagePath: any = [];
  selectLayoutForm: FormGroup;
  public configCoinForm: FormGroup;
  mapDisable: boolean = true;
  marker: any = [];
  map: any = null;
  bound: any;
  layoutData: any = '';
  newGatewayLayout = [];
  selectedLayout: any = '';
  coinData: any = [];
  gatewayList: any = [];
  constructor(
    private fb: FormBuilder,
    public mapService: MapService,
    private api: ApiService,
    private general: GeneralService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.resetMap();
    this.createForm();
    this.refreshGateway();
    this.getLayout();
      }
  ngOnDestroy() {
    this.resetMap();
  }

  resetMap(){
    if (this.map != null) {
      this.clearMap();
      this.clearMapImage();
      this.map.remove();
    }
  }

  createMap(){
    this.mapDisable = true;
    this.map = L.map('map', {
      attributionControl: false,
      minZoom: 1,
      maxZoom: 5,
      center: [0, 0],
      zoom: 0,
      zoomControl: true,
      fullscreenControl: true,
      fullscreenControlOptions: {
        title: 'Show me the fullscreen !',
        titleCancel: 'Exit fullscreen mode',
        position: 'topleft',
      },
      crs: L.CRS.Simple,
      maxBoundsViscosity: 1.0,
    });
   
    this.bound = this.map.getBounds();
    this.map.setMaxBounds(this.bound);
    this.map.dragging.disable();
    this.map.on('click', (data) => {
      let latlng = [data.latlng.lat, data.latlng.lng];
      let coin = this.configCoinForm.get('coinId').value;
      if (coin) {
        this.configCoinForm.patchValue({
          coinBounds: latlng,
        });
      }
      this.createMarker();
    });
    this.cd.detectChanges();
  }

  createForm() {
    this.newLayoutForm = this.fb.group({
      gatewayId: ['', Validators.required],
      layoutName: ['', Validators.required],
      fileData: [''],
    });
    this.selectLayoutForm = this.fb.group({
      layout: ['', Validators.required],
    });
    this.configCoinForm = this.fb.group({
      gatewayId: ['', Validators.required],
      coinId: ['', Validators.required],
      coinName: ['', Validators.required],
      coinBounds: ['', Validators.required],
    });
  }

  layoutSelect(data) {
    this.mapDisable = false;
    console.log('data layout===', data);
    if(data){
      this.selectedLayout = data
      let layout = this.gatewayList.filter(obj=>{
        return obj.layoutName == data
      })
      this.api.getLayoutImage(layout[0]._id).then((res: any) => {
        console.log("image layout==",res);
        
        this.layoutData = layout[0];
        this.configCoinForm.reset()
        this.updateSelected();
        this.clearMapImage();
        L.imageOverlay(res, this.bound).addTo(this.map);
        this.createMarker();
      });
    }
  }

  gatewaySelect(data) {
    console.log('data==', data);
    this.coinData = [];
    let gatewayData = this.layoutData.gateways.filter(obj=>{
      return obj.gatewayId == data
    });
    this.coinData = gatewayData[0].coinIds;
    this.updateSelected(data);
    this.createMarker();
  }

  coinSelect(data) {
    console.log('data==', data);
    let coins = this.coinData.filter((obj) => {
      return obj.coinId == data;
    });
    if (coins.length) {
      this.configCoinForm.patchValue({
        coinId: coins[0].coinId,
        coinName: coins[0].coinName,
        coinBounds: coins[0].coinBounds != null ? coins[0].coinBounds : [],
      });
      this.updateSelected(coins.gatewayId, coins.coinId);
      this.createMarker();
    }
  }

  updateSelected(gatewayId = 0, coinId = 0) {
    if (this.layoutData != '') {
      this.layoutData.gateways = this.layoutData.gateways.map((obj) => {
        if (gatewayId == 0) {
          obj.selected = true;
        } else {
          if (obj.gatewayId == gatewayId) {
            obj.selected = true;
          } else {
            obj.selected = false;
          }
        }
        obj.coinIds.map((coin) => {
          if (coinId == 0) {
            coin.selected = true;
          } else {
            if (coin.coinId == coinId) {
              coin.selected = true;
            } else {
              coin.selected = false;
            }
          }
        });
        return obj;
      });
      console.log('layout data===', this.layoutData);
    }
  }

  createMarker() {
    this.clearMap();
    let coin = this.configCoinForm.get('coinBounds').value;
    console.log("coin===",coin);
    
    if (coin != null) {
      let data = {
        bounds: this.configCoinForm.get('coinBounds').value,
        gatewayId: this.configCoinForm.get('gatewayId').value,
        coinId: this.configCoinForm.get('coinId').value,
        coinName: this.configCoinForm.get('coinName').value,
      };
      this.addCoinMarker(data);
    } else  {
      for (let i = 0; i < this.layoutData.gateways.length; i++) {
        if (this.layoutData.gateways[i].selected) {
          for (let j = 0; j < this.layoutData.gateways[i].coinIds.length; j++) {
            if (this.layoutData.gateways[i].coinIds[j].selected) {
              this.layoutData.gateways[i].coinIds[j].coinBounds =
                this.layoutData.gateways[i].coinIds[j].coinBounds != null
                  ? this.layoutData.gateways[i].coinIds[j].coinBounds
                  : [];

              if (this.layoutData.gateways[i].coinIds[j].coinBounds.length) {
                let data = {
                  gatewayId: this.layoutData.gateways[i].coinIds[j].gatewayId,
                  bounds: this.layoutData.gateways[i].coinIds[j].coinBounds,
                  coinId: this.layoutData.gateways[i].coinIds[j].coinId,
                  coinName: this.layoutData.gateways[i].coinIds[j].coinName,
                };
                this.addCoinMarker(data);
              }
            }
          }
        }
      }
    }
    this.cd.detectChanges();
    setTimeout(()=>{
      this.mapElement.nativeElement.focus();
    },0);
  }

  addCoinMarker(data) {
    let icon = L.icon({
      iconUrl: '../../assets/marker.png',
      iconSize: [25, 25],
    });
    let marker = new L.marker(data.bounds, {
      icon: icon,
      draggable: 'true',
      riseOnHover: true,
    });
    marker.gatewayId = data.gatewayId;
    marker.coinId = data.coinId;
    marker.coinName = data.coinName;
    marker.bounds = data.bounds;
    marker
      .addTo(this.map)
      .on('click', (obj) => {
        console.log('clicked data===', obj.target);
        this.gatewaySelect(obj.target.gatewayId);
        this.coinSelect(obj.target.coinId);
        this.configCoinForm.patchValue({
          gatewayId: obj.target.gatewayId,
          coinId: obj.target.coinId,
          coinName: obj.target.coinName,
          coinBounds: obj.target.bounds,
        });
        this.cd.detectChanges();
        this.createMarker();
      })
      .on('dragend', (event) => {
        console.log('drag data===', event.target);
        this.gatewaySelect(event.target.gatewayId);
        let position = event.target.getLatLng();
        let latlng = [position.lat, position.lng];
        this.configCoinForm.patchValue({
          gatewayId: event.target.gatewayId,
          coinId: event.target.coinId,
          coinName: event.target.coinName,
          coinBounds: latlng,
        });
        this.createMarker();
      });
    this.marker.push(marker);
    
  }

  getValidation() {
    if (this.layoutData != '') {
      if (
        this.layoutData.layoutName != '' &&
        this.layoutData.gateways[0].gatewayId != '' &&
        this.layoutData.gateways[0].coinIds.length
      ) {
        return 'visible';
      } else {
        return 'hide';
      }
    }
  }

  toggleAllSelectionGateway(formData) {
    if (this.allSelected.selected) {
      formData.controls.gatewayId.patchValue([
        ...this.newGatewayLayout.map((obj) => obj.gatewayId),
        0,
      ]);
    } else {
      formData.controls.gatewayId.patchValue([]);
    }
  }

  fileChange(files) {
    let reader = new FileReader();
    if (files && files.length > 0) {
      let file = files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.tempImagePath = reader.result;
        this.newLayoutForm.get('fileData').setValue({
          filename: file.name,
          filetype: file.type,
          value: this.tempImagePath.split(',')[1],
        });
      };
    }
  }

  clearFile() {
    this.newLayoutForm.get('fileData').setValue(null);
    this.tempImagePath = '';
    this.fileInput.nativeElement.value = '';
  }

  randomNumber(min = 1, max = 20) {
    return Math.random() * (max - min) + min;
  }

  createNewLayout(data) {
    data.gatewayObjectId = this.general.filterArray(data.gatewayId);
    data.fileData.filename =
      data.gatewayId[0] +
      parseInt(this.randomNumber().toString()) +
      data.fileData.filename;
    // data.file=data.fileData.filename
    console.log('file===', data);
    if (
      data.fileData.filetype == 'image/jpg' ||
      data.fileData.filetype == 'image/jpeg' ||
      data.fileData.filetype == 'image/png'
    ) {
      this.api
        .createLayout(data)
        .then((res: any) => {
          console.log('create layout res===', res);
          if (res.status) {
            this.general.openSnackBar(res.success, '');
          } else {
            this.general.openSnackBar(res.success, '');
          }
        })
        .catch((err: any) => {
          console.log('error==', err);
        });
    } else {
    }
  }

  updateCoinBound(data) {
    console.log('submit coin===', data);

    this.api
      .updateLatLng(data)
      .then((res: any) => {
        console.log('update bounds res==', res);
        if (res.status) {
          this.general.openSnackBar(res.message, '');
          this.getLayout();
        } else {
          this.general.openSnackBar(res.message, '');
        }
      })
      .catch((err) => {
        console.log('err==', err);
      });
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

  clearMapImage(){
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

  getLayout() {
    this.api
      .getLayouts()
      .then((res: any) => {
        console.log('get layout res===', res);
        if (res.status) {
          this.gatewayList = res.success;
          this.selectLayoutForm.patchValue({
            layout : this.selectedLayout
          })
          this.layoutSelect(this.selectedLayout);
          if(!this.map){
            this.createMap();
          }
        } else {
          this.gatewayList = [];
          if(!this.map){
            this.createMap();
          }
        }
      })
      .catch((err: any) => {
        console.log('error==', err);
      });
  }

  refreshGateway() {
    this.api
      .getGatewayData()
      .then((res: any) => {
        this.newGatewayLayout = [];
        if (res.status) {
          this.newGatewayLayout = res.success;
          console.log('gateway list====', this.newGatewayLayout);
        }
      })
      .catch((err: any) => {
        console.log('error===', err);
      });
  }
  deleteLayout(data){
    console.log("delete layout ==",data)
    let layout = this.gatewayList.filter(obj=>{
      return obj.layoutName == data.layout
    })
   data._id=layout[0]._id
  
   this.api.deleteLayout(data).then((res:any)=>{
     if(res.status){
      this.resetMap()
      this.coinData=[]
      this.mapDisable=true
      this.selectLayoutForm.reset()
      this.getLayout()
     }
   })
    console.log("delete layout ==",data)
  }
}

// selectedLayoutCoin: any = {
//   layout: '',
//   coin: [],
// };
// gatewayData: any = [];
// coinData: any = [];
// gatewayList: any = [
//   {
//     layoutName: 'layout.jpg',
//     gateways: [
//       {
//         gatewayId: '123456789878',
//         gatewayName: 'gateway1',
//         coinIds: [
//           {
//             _id: 1,
//             coinId: 1,
//             coinName: 'a',
//             bound: [79.48061790228995, -189.84375],
//           },
//           {
//             _id: 2,
//             coinId: 2,
//             coinName: 'b',
//             bound: [-52.32191088594772, 253.12500000000003],
//           },
//           {
//             _id: 3,
//             coinId: 3,
//             coinName: 'c',
//             bound: [],
//           },
//         ],
//       },
//       {
//         gatewayId: 'AB3456789878',
//         gatewayName: 'gateway2',
//         coinIds: [
//           {
//             _id: 4,
//             coinId: 4,
//             coinName: 'aa',
//             bound: [-69.56522590149099, -354.37500000000006],
//           },
//           {
//             _id: 5,
//             coinId: 5,
//             coinName: 'bb',
//             bound: [],
//           },
//           {
//             _id: 6,
//             coinId: 6,
//             coinName: 'cc',
//             bound: [],
//           },
//         ],
//       },
//     ],
//   },
//   {
//     layoutName: 'layout.jpg',
//     gateways: [
//       {
//         gatewayId: '123456789878',
//         gatewayName: 'gateway1',
//         coinIds: [
//           {
//             _id: 1,
//             coinId: 1,
//             coinName: 'a',
//             bound: [],
//           },
//           {
//             _id: 2,
//             coinId: 2,
//             coinName: 'b',
//             bound: [24.766784522874453, -514.6875000000001],
//           },
//           {
//             _id: 3,
//             coinId: 3,
//             coinName: 'c',
//             bound: [],
//           },
//         ],
//       },
//       {
//         gatewayId: 'CD3456789878',
//         gatewayName: 'gateway3',
//         coinIds: [
//           {
//             _id: 7,
//             coinId: 7,
//             coinName: 'aaa',
//             bound: [],
//           },
//           {
//             _id: 8,
//             coinId: 8,
//             coinName: 'bbb',
//             bound: [],
//           },
//           {
//             _id: 9,
//             coinId: 9,
//             coinName: 'ccc',
//             bound: [],
//           },
//         ],
//       },
//     ],
//   },

//   {
//     layoutName: 'office-layout.png',
//     gateways: [],
//   },
// ];
// coinList: any = [];
