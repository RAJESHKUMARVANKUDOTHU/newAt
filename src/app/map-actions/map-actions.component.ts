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
  public configCoinForm: FormGroup;
  public configCoinForm1: FormGroup;
  // selectedLayoutCoin: any = {
  //   layout: '',
  //   coin: [],
  // };
  newGatewayLayout = [];
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

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('allSelected') private allSelected: MatOption;

  constructor(
    private fb: FormBuilder,
    public mapService: MapService,
    private api: ApiService,
    private general: GeneralService,
    private cd: ChangeDetectorRef,
  ) { }
  patchData = 0;
  ngOnInit(): void {
    this.configCoinForm1 = this.fb.group({
      name: ['', Validators.required],
      gname: ['', Validators.required],
    });
    this.createForm();
    this.refreshGateway();
    this.mapService.getLayout();

    this.mapService.mapCoinSelected.subscribe((data) => {
      console.log("data sub==", data, "mapService.coinData===", this.mapService.coinData);
      this.patchData = data;

      this.configCoinForm.patchValue({
        coinId: this.patchData
      })
      console.log("form coin==", this.configCoinForm.get('coinId'));

      this.cd.detectChanges();
    })
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
    console.log('data layout===', data);
    this.mapService.selectedCoinBound.layout = data.layoutName;
    this.mapService.selectedLayout.next(data._id);
    this.mapService.gatewayData = data.gateways;
    // console.log('data selectedLayoutCoin =', this.selectedLayoutCoin);
  }

  gatewaySelect(data) {
    console.log('data==', data);
    console.log("gatewaySelect form coin 2==", this.configCoinForm.get('coinId').value);
    console.log("gatewaySelect form coin 2==", this.configCoinForm.get('gatewayName').value);
    let gatewayData = this.mapService.gatewayData.filter((obj) => {
      return obj.gatewayId == data
    })
    this.mapService.clear();
    this.mapService.selectedCoinBound.gatewayId = gatewayData[0].gatewayId;
    this.mapService.GatewayCoinBound = gatewayData[0].coinIds;
    this.mapService.mapDetectChanges.next({ type: 'edit' });
    this.mapService.coinData = gatewayData[0].coinIds;
  }

  coinSelect(data) {
    console.log('data==', data);
    console.log("form coin 2==", this.configCoinForm.get('coinId'));
    console.log("form coin 2==", this.configCoinForm.get('gatewayName'));
    let coinData = this.mapService.coinData.filter((obj) => {
      return obj.coinId == data
    })
    this.mapService.selectedCoinBound.coinId = coinData[0].coinId;
    this.mapService.selectedCoinBound.coinName = coinData[0].coinName;
    this.mapService.selectedCoinBound.coinBounds = coinData[0].coinBounds;
    this.mapService.mapDetectChanges.next({ type: 'edit' });
    console.log(
      'this.mapService.selectedCoinBound====',
      this.mapService.selectedCoinBound
    );
  }

  getValidation() {
    if (
      this.mapService.selectedCoinBound.layout != '' &&
      this.mapService.selectedCoinBound.gatewayId != '' &&
      this.mapService.selectedCoinBound.coinId != 0
    ) {
      return 'visible';
    } else {
      return 'hide';
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

  // getLayout() {
  //   this.api
  //     .getLayouts()
  //     .then((res: any) => {
  //       console.log('get layout res===', res);
  //       if (res.status) {
  //         this.gatewayList = res.success;
  //       }
  //       else{
  //         this.gatewayList = [];
  //       }
  //     })
  //     .catch((err: any) => {
  //       console.log('error==', err);
  //     });
  // }


  updateCoinBound() {

    var data = {
      coinId: this.mapService.selectedCoinBound.coinId,
      coinName: this.mapService.selectedCoinBound.coinName,
      coinBounds: this.mapService.selectedCoinBound.coinBounds
    };


    this.api.updateLatLng(data).then((res: any) => {

      console.log('update bounds res==', res);
      if (res.status) {
        this.general.openSnackBar(res.message, '');
        this.mapService.getLayout();
      }
      else {
        this.general.openSnackBar(res.message, '');
      }
    }).catch(err => {
      console.log("err==", err);
    });
  }

}
