import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../services/map-services/map.service';
import { ApiService } from '../services/api.service';
import { GeneralService } from '../services/general.service';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-map-actions',
  templateUrl: './map-actions.component.html',
  styleUrls: ['./map-actions.component.css'],
})
export class MapActionsComponent implements OnInit {
  newLayoutForm: FormGroup;
  tempImagePath: any = [];
  editLocationForm: FormGroup;
  selectLayoutForm: FormGroup;
  configCoinForm: FormGroup;
  selectedLayoutCoin: any = {
    layout: '',
    coin: [],
  };
  gatewayData: any = [];
  gatewayList: any = [
    {
      layout: 'layout.jpg',
      gatewayId: '123456789878',
      name: 'gateway1',
      coins: [
        {
          id: 1,
          coinId: 1,
          coinName: 'a',
          bound: [],
        },
        {
          id: 2,
          coinId: 2,
          coinName: 'b',
          bound: [],
        },
        {
          id: 3,
          coinId: 3,
          coinName: 'c',
          bound: [],
        },
      ],
    },
    {
      layout: 'layout.jpg',
      gatewayId: 'AB3456789878',
      name: 'gateway2',
      coins: [
        {
          id: 4,
          coinId: 4,
          coinName: 'aa',
          bound: [],
        },
        {
          id: 5,
          coinId: 5,
          coinName: 'bb',
          bound: [],
        },
        {
          id: 6,
          coinId: 6,
          coinName: 'cc',
          bound: [],
        },
      ],
    },
    {
      layout: 'office-layout.png',
      gatewayId: 'CD3456789878',
      name: 'gateway3',
      coins: [
        {
          id: 7,
          coinId: 7,
          coinName: 'aaa',
          bound: [],
        },
        {
          id: 8,
          coinId: 8,
          coinName: 'bbb',
          bound: [],
        },
        {
          id: 9,
          coinId: 9,
          coinName: 'ccc',
          bound: [],
        },
      ],
    },
    {
      layout: 'office-layout.png',
      gatewayId: 'EF3456789878',
      name: 'gateway4',
      coins: [],
    },
  ];
  coinList: any = [];

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('allSelected') private allSelected:MatOption

  constructor(
    private fb: FormBuilder,
    private mapService: MapService,
    private api: ApiService,
    private general: GeneralService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.refreshGateway();
    this.mapService.mapEdit.subscribe((data: any) => {
      console.log('data subscribe==', data);
      if (
        this.selectedLayoutCoin.layout != '' &&
        this.selectedLayoutCoin.coin.length
      ) {
        this.selectedLayoutCoin.coin[0].bound = data.data.latlng;
        console.log('this.selectedCoinEdit===', this.selectedLayoutCoin);
        const editCoinList = this.gatewayList.filter((obj, index) => {
          if (obj.hasOwnProperty('coins') && obj.coins.length) {
            obj.coins.filter((coin, indexCoin) => {
              if (coin.id == this.selectedLayoutCoin.coin[0].coinId.id) {
                this.gatewayList[index].coins[
                  indexCoin
                ].bound = this.selectedLayoutCoin.coin[0].bound;
              }
            });
          }
        });
        console.log('this.gatewayList==', this.gatewayList);
      } else {
        this.mapService.mapError.next({ coinSelectEdit: false });
      }
    });
  }

  refreshGateway() {
    this.api
      .getGatewayData()
      .then((res: any) => {
        this.gatewayData = [];
        console.log('gateway submit====', res);
        if (res.status) {
          this.gatewayData = res.success;
          console.log('gateway list====', this.gatewayData);
        }
      })
      .catch((err: any) => {
        console.log('error===', err);
      });
  }

  createForm() {
    this.newLayoutForm = this.fb.group({
      gatewayId: ['', Validators.required],
      locationName: ['', Validators.required],
      // description: ['', Validators.required],
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
      coinName: ['', Validators.required],
    });
  }

  gatewaySelect(data) {
    console.log('gatewaySelect==', data);
    this.coinList = data.coins;
  }

  coinSelect(data) {
    console.log('coinSelect==', data);
    this.selectedLayoutCoin.coin.push({
      coinId: data,
    });
  }

  layoutSelect(data) {
    this.selectedLayoutCoin.layout = data.layout;
    console.log('data selectedLayoutCoin =', this.selectedLayoutCoin);
  }

  createLocation(data) {
    console.log('data submit=', data);
  }
  configCoin(data, type) {
    console.log('confiurartion coin data', data, type);
  }

  toggleAllSelectionGateway(formData){
    if(this.allSelected.selected){
      formData.controls.gatewayId.patchValue([...this.gatewayData.map(obj=>obj.gatewayId),0])
    }
    else{
      formData.controls.gatewayId.patchValue([])
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
    data.gatewayId=this.general.filterArray(data.gatewayId);
    data.fileData.filename =
      data.gatewayId[0] +
      parseInt(this.randomNumber().toString()) +
      data.fileData.filename;
      
    console.log('file===', data);
    if (
      data.fileData.filetype == 'image/jpg' ||
      data.fileData.filetype == 'image/jpeg' ||
      data.fileData.filetype == 'image/png'
    ) {
      
    } else {
    }
  }
}
