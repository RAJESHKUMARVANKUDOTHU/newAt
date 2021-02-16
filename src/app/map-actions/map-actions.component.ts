import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../services/map-services/map.service';
import { ApiService } from '../services/api.service';
import { GeneralService } from '../services/general.service';
import { MatOption } from '@angular/material/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map-actions',
  templateUrl: './map-actions.component.html',
  styleUrls: ['./map-actions.component.css'],
})
export class MapActionsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('allSelected') private allSelected: MatOption;
  newLayoutForm: FormGroup;
  tempImagePath: any = [];
  editLocationForm: FormGroup;
  selectLayoutForm: FormGroup;
  public configCoinForm: FormGroup;
  mapDisable: boolean = true
  imageMarker: any = ''
  marker: any = []
  map: any
  bound: any
  coinBounds: any = [];
  layoutData: any = ''
  patchData = 0;
  newGatewayLayout = [];
  slectedLayout: any
  coinData: any = []
  coinData1: any = []
  gatewayList: any = []
  coinDataTemp: any = []
  constructor(
    private fb: FormBuilder,
    public mapService: MapService,
    private api: ApiService,
    private general: GeneralService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.refreshGateway();
    this.getLayout();


    // this.mapService.mapCoinSelected.subscribe((data) => {
    //   console.log("data sub==", data, "mapService.coinData===", this.mapService.coinData);
    //   this.patchData = data;

    //   this.configCoinForm.patchValue({
    //     coinId: this.patchData
    //   })
    //   console.log("form coin==", this.configCoinForm.get('coinId'));

    //   this.cd.detectChanges();
    // })
  }
  ngOnDestroy() {
    if (this.map != '') {
      this.map.remove();
    }
  }

  ngAfterViewInit(): void {
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
      console.log("clicked==", data);

      let latlng = [data.latlng.lat, data.latlng.lng];
      this.coinBounds = latlng;
      this.createMarker()
    })
  }

  createForm() {
    this.newLayoutForm = this.fb.group({
      gatewayId: ['', Validators.required],
      layoutName: ['', Validators.required],
      fileData: [''],
    });
    this.editLocationForm = this.fb.group({
      gatewayId: ['', Validators.required],
      coinId: ['', Validators.required],
    });
    this.selectLayoutForm = this.fb.group({
      layout: ['', Validators.required],
    });
    this.configCoinForm = this.fb.group({
      gatewayName: ['', Validators.required],
      coinId: ['', Validators.required],
    });

  }


  layoutSelect(data) {

    this.mapDisable = false;
    this.clearMap()

    console.log('data layout===', data);
    this.api.getLayoutImage(data._id).then((res: any) => {
      this.layoutData = data
      if (this.map.hasLayer(this.imageMarker)) {
        this.map.removeLayer(this.imageMarker);
      }
      this.imageMarker = L.imageOverlay(res, this.bound);
      this.imageMarker.addTo(this.map);
    });
  }

  gatewaySelect(data) {
    console.log('data==', data);
    this.coinData = []
    let gatewayData = data;
    this.coinData = gatewayData.coinIds;
    console.log('coinData==', this.coinData);
    this.createMarker();
  }

  coinSelect(data) {
    console.log('data==', data);

    let coins = this.coinData.filter((obj) => {
      console.log("obj.coinId == data.coinId==", obj.coinId == data, obj.coinId, data)
      return obj.coinId == data
    })
    console.log("coins==", coins)
    this.coinDataTemp = []
    this.coinBounds = []
    if (coins.length) {
      this.coinDataTemp = {
        coinId: coins[0].coinId,
        coinName: coins[0].coinName,
      }
      this.coinBounds = coins[0].coinBounds != null ? coins[0].coinBounds : []
      this.createMarker()
    }
    else { }
  }


  createMarker() {
    this.clearMap();
    console.log("this.coinBounds=", this.coinBounds, this.coinDataTemp);
    // this.coinBounds = this.coinBounds != undefined ? this.coinBounds : []
    if (this.coinBounds.length) {
      console.log("this.coinBounds=", this.coinBounds);

      let icon = L.icon({
        iconUrl: '../../assets/marker.png',
        iconSize: [25, 25],
      });
      let marker = L.marker(this.coinBounds, {
        icon: icon,
        draggable: 'true',
        riseOnHover: true,
      })
        .addTo(this.map)

      marker.coinId = this.coinDataTemp.coinId;
      marker.on('dragend', (event) => {
        let markerDrag = event.target;
        let position = markerDrag.getLatLng();
        let latlng = [position.lat, position.lng];
        this.coinDataTemp.coinBounds = latlng;
      });
      this.marker.push({
        marker: marker,
        coinId: this.coinDataTemp.coinId,
      });
    }
    else if (this.coinData.length) {
      this.coinBounds = []
      let icon = L.icon({
        iconUrl: '../../assets/marker.png',
        iconSize: [25, 25],
      });

      for (let i = 0; i < this.coinData.length; i++) {
        this.coinData[i].coinBounds = this.coinData[i].coinBounds != null ? this.coinData[i].coinBounds : [];

        if (this.coinData[i].coinBounds.length) {
          let marker = L.marker(this.coinData[i].coinBounds, {
            icon: icon,
          })
          marker.coinId = this.coinData[i].coinId;
          marker.coinName = this.coinData[i].coinName;
          marker.coinBounds = this.coinData[i].coinBounds;

          marker.addTo(this.map).on('click', (data) => {
            console.log("click data==", data.target);
            console.log("marker==", marker)
            this.configCoinForm.patchValue({
              coinId: data.target.coinId
            })
            this.coinDataTemp.coinId = data.target.coinId
            this.coinDataTemp.coinName = data.target.coinName
            this.coinBounds = data.target.coinBounds
            this.createMarker()
            marker.on('dragend', (event) => {
              let markerDrag = event.target;
              let position = markerDrag.getLatLng();
              let latlng = [position.lat, position.lng];
              this.coinBounds = latlng;
            });
            this.coinData.filter((obj) => {
              return obj.coinId == data.target.coinId;
            });
          });
          this.marker.push({
            marker: marker[i],
            coinId: this.coinData[i].coinId,
          });
        } else {

        }

      }
    }
    // this.cd.detectChanges();
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
      console.log('file===', file);
      reader.onload = () => {
        this.tempImagePath = reader.result;
        console.log('\nReader result', reader.result);

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
          }
          else {
            this.general.openSnackBar(res.success, '');
          }
        })
        .catch((err: any) => {
          console.log('error==', err);
        });
    } else {
    }
  }

  updateCoinBound() {

    var data = {
      coinId: this.coinDataTemp.coinId,
      coinName: this.coinDataTemp.coinName,
      coinBounds: this.coinBounds
    };


    this.api.updateLatLng(data).then((res: any) => {

      console.log('update bounds res==', res);
      if (res.status) {
        this.general.openSnackBar(res.message, '');
        this.getLayout();
      }
      else {
        this.general.openSnackBar(res.message, '');
      }
    }).catch(err => {
      console.log("err==", err);
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


  getLayout() {
    this.api
      .getLayouts()
      .then((res: any) => {
        console.log('get layout res===', res);
        if (res.status) {
          this.gatewayList = res.success;
        }
        else {
          this.gatewayList = [];
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
        console.log('gateway submit====', res);
        if (res.status) {
          this.newGatewayLayout = res.success;
          console.log('gateway list====', this.newGatewayLayout);
        }
      })
      .catch((err: any) => {
        console.log('error===', err);
      });
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