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
  newGatewayLayout = [];
  gatewayData: any = [];
  coinData: any = [];
  gatewayList: any = [
    {
      layout: 'layout.jpg',
      gateway: [
        {
          gatewayId : '123456789878',
          name: 'gateway1',
          coins: [
            {
              id: 1,
              coinId: 1,
              coinName: 'a',
              bound: [79.48061790228995, -189.84375]
            },
            {
              id: 2,
              coinId: 2,
              coinName: 'b',
              bound: [-52.32191088594772, 253.12500000000003],
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
          gatewayId : 'AB3456789878',
          name: 'gateway2',
          coins: [
            {
              id: 4,
              coinId: 4,
              coinName: 'aa',
              bound: [-69.56522590149099, -354.37500000000006],
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
      ],
      
    },
    {
      layout: 'layout.jpg',
      gateway: [
        {
          gatewayId : '123456789878',
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
              bound: [24.766784522874453, -514.6875000000001],
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
          gatewayId : 'CD3456789878',
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
      ],
    },
    
    {
      layout: 'office-layout.png',
      gateway: [],
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
      this.mapService.selectedCoinBound.bounds = data.data.latlng;
      console.log("this.mapService.selectedCoinBound====",this.mapService.selectedCoinBound);
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

  createForm() {
    this.newLayoutForm = this.fb.group({
      gatewayId: ['', Validators.required],
      layoutName: ['', Validators.required],
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

  layoutSelect(data) {
    console.log("data layout===",data);
    
    // this.selectedLayoutCoin.layout = data.layout;
    this.mapService.selectedCoinBound.layout = data.layout;
    this.gatewayData = data.gateway
    console.log('data selectedLayoutCoin =', this.selectedLayoutCoin);
  }

  gatewaySelect(data){
    console.log("data==",data);
    this.mapService.clear();
    this.mapService.selectedCoinBound.gatewayId = data.gatewayId;
    this.mapService.GatewayCoinBound = data.coins;
    this.mapService.mapDetectChanges.next({type:'edit'});
    this.coinData = data.coins;
  }

  coinSelect(data){
    console.log("data==",data);
    this.mapService.selectedCoinBound.coinId = data.coinId;
    this.mapService.selectedCoinBound.bounds = data.bound;
    this.mapService.mapDetectChanges.next({type:'edit'});
    console.log("this.mapService.selectedCoinBound====",this.mapService.selectedCoinBound);
    
  }
  

  getValidation(){
    if(this.mapService.selectedCoinBound.layout != '' && this.mapService.selectedCoinBound.gatewayId != '' && this.mapService.selectedCoinBound.coinId !=0){
      return "visible"
    }
    else{
      return "hide"
    }
  }
  editLocation(){
    
  }

  createLocation(data) {
    console.log('data submit=', data);
  }
  configCoin(data, type) {
    console.log('confiurartion coin data', data, type);
  }

  toggleAllSelectionGateway(formData){
    if(this.allSelected.selected){
      formData.controls.gatewayId.patchValue([...this.newGatewayLayout.map(obj=>obj.gatewayId),0])
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
    data.gatewayObjectId=this.general.filterArray(data.gatewayId);
    data.fileData.filename =
      data.gatewayId[0] +
      parseInt(this.randomNumber().toString()) +
      data.fileData.filename;
      data.file=data.fileData.filename
      console.log('file===', data);
    if (
      data.fileData.filetype == 'image/jpg' ||
      data.fileData.filetype == 'image/jpeg' ||
      data.fileData.filetype == 'image/png'
    ) {
      var value={
        gatewayObjectId:this.general.filterArray(data.gatewayId),
        file: data.gatewayId[0] +
              parseInt(this.randomNumber().toString()) +
              data.fileData.filename,
        layoutName:data.layoutName
      }
      console.log("file==",value)
      this.api.createLayout(value).then((res:any)=>{
          console.log("create layout res===",res);
          if(res.status){
            this.general.openSnackBar(res.success,'')
          }
          
      }).catch((err:any)=>{
        console.log("error==",err)
      })
      
    } 
    else {
    }
  }

  updateBound(){
    var data={
      
    }
    this.api.updateLatLng(data).then((res:any)=>{
      console.log("update bounds res==",res);
      if(res.status){
        this.general.openSnackBar(res.success,'')
      }
    })
  }
}
