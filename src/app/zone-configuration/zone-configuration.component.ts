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
// import { clear } from 'console';

@Component({
  selector: 'app-zone-configuration',
  templateUrl: './zone-configuration.component.html',
  styleUrls: ['./zone-configuration.component.css'],
})
export class ZoneConfigurationComponent implements OnInit {
  selectLayoutForm: FormGroup;
  selectZoneForm: FormGroup;
  gatewayList: any = [];
  zoneList: any = [
    {
      id: 1,
      name: 'Job card',
      bounds: [
        [8.667918002363134, -229.21875000000003],
        [18.22935133838668, 275.62500000000006],
        [-68.56038368664157, 215.15625000000003],
      ],
    },
    {
      id: 2,
      name: 'Washing',
      bounds: [
        [-61.48075950007598, -600.4687500000001],
        [7.27529233637217, -503.43750000000006],
        [-67.50856836293859, -452.81250000000006],
        [-79.63987399850707, -530.1562500000001],
      ],
    },
    {
      id: 3,
      name: 'Shopfloor',
      bounds: [],
    },
  ];

  constructor(
    private fb: FormBuilder,
    public mapService: MapService,
    private api: ApiService,
    private general: GeneralService
  ) { }

  ngOnInit(): void {
    this.mapService.clear();
    this.getZoneDetails();
    this.mapService.getLayout();
    this.selectLayoutForm = this.fb.group({
      layout: ['', Validators.required],
    });
    this.selectZoneForm = this.fb.group({
      zone: ['', Validators.required],
    });

    this.mapService.mapZone.subscribe((data: any) => {
      console.log(
        'this.selectedLayoutZone==',
        this.mapService.selectedLayoutZone
      );
    });
  }

  ngOnDestroy() {
    this.mapService.clear();
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

  getZoneDetails() {
    this.api.getZone().then((res: any) => {

      console.log('zone details response==', res);
      this.zoneList = [];
      if (res.status) {
        this.zoneList = res.success;
        this.mapService.clear();
        this.mapService.mapDetectChanges.next({ type: 'zone' });
      }
      else {
        this.zoneList = [];
      }
    });
  }


  layoutSelect(data) {
    this.mapService.selectedLayout.next(data._id);
    this.mapService.selectedLayoutZone.layoutName = data.layoutName;
    console.log(
      'data selectedLayoutCoin zone =',
      this.mapService.selectedLayoutZone
    );
  }

  zoneSelect(data) {
    this.mapService.selectedLayoutZone.id = data._id;
    if (data.bounds.length) {
      this.mapService.selectedLayoutZone.bounds = data.bounds;
    } else {
      this.mapService.selectedLayoutZone.bounds = [];
    }
    this.mapService.mapDetectChanges.next({ type: 'zone' });
    console.log(
      'data selectedLayoutCoin zone =',
      this.mapService.selectedLayoutZone
    );
  }

  submitZone(data) {
    console.log('zone submit===', data);
    console.log("this.mapService.selectedLayoutZone==============", this.mapService.selectedLayoutZone);
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

  removeZone(data) {
    console.log('zone remove===', data);
    let sendData = {
      id: data.id
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
}
