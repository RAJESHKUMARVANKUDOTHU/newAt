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
  styleUrls: ['./zone-configuration.component.css']
})
export class ZoneConfigurationComponent implements OnInit {
  selectLayoutForm: FormGroup;
  selectZoneForm: FormGroup;
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
  zoneList : any = [
    {
      id:1,
      name : 'Job card',
      bounds : [
        [8.667918002363134, -229.21875000000003],
        [18.22935133838668, 275.62500000000006],
        [-68.56038368664157, 215.15625000000003],
      ]
    },
    {
      id:2,
      name : 'Washing',
      bounds : [
        [-61.48075950007598, -600.4687500000001],
        [7.27529233637217, -503.43750000000006],
        [-67.50856836293859, -452.81250000000006],
        [-79.63987399850707, -530.1562500000001],
      ]
    },
    {
      id:3,
      name : 'Shopfloor',
      bounds : []
    },
  ]
  

  constructor(
    private fb: FormBuilder,
    private mapService: MapService,
    private api: ApiService,
    private general: GeneralService
  ) {}

  ngOnInit(): void {
    this.mapService.clear();

    this.selectLayoutForm = this.fb.group({
      layout: ['', Validators.required],
    });
    this.selectZoneForm = this.fb.group({
      zone: ['', Validators.required],
    });

    this.mapService.mapZone.subscribe((data:any)=>{
      console.log("this.selectedLayoutZone==",this.mapService.selectedLayoutZone);
      
    })
  }

  ngOnDestroy(){
    this.mapService.clear();
  }

  layoutSelect(data) {
    this.mapService.selectedLayoutZone.layout = data.layout;
    console.log('data selectedLayoutCoin zone =', this.mapService.selectedLayoutZone);
  }


  zoneSelect(data) {
    this.mapService.selectedLayoutZone.zone = data.id;
    if(data.bounds.length){
      this.mapService.selectedLayoutZone.bounds = data.bounds;
    }
    else{
      this.mapService.selectedLayoutZone.bounds = [];
    }
    this.mapService.mapDetectChanges.next()
    console.log('data selectedLayoutCoin zone =', this.mapService.selectedLayoutZone);
  }

  submitZone(data){
    console.log("zone submit===",data);
  }


  removeZone(data){
    console.log("zone remove===",data);
  }

}
