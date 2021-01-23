import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MapService } from '../services/map-services/map.service';

@Component({
  selector: 'app-map-actions',
  templateUrl: './map-actions.component.html',
  styleUrls: ['./map-actions.component.css'],
})
export class MapActionsComponent implements OnInit {
  newLocationForm: FormGroup;
  editLocationForm: FormGroup;
  selectLayoutForm: FormGroup;
  selectedLayoutCoin: any = {
    layout: '',
    coin: [],
  };
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
  constructor(private fb: FormBuilder, private mapService: MapService) {}

  ngOnInit(): void {
    this.newLocationForm = this.fb.group({
      gatewayId: ['', Validators.required],
      locationName: ['', Validators.required],
      description: ['', Validators.required],
      map: ['', Validators.required],
    });
    this.editLocationForm = this.fb.group({
      gatewayId: ['', Validators.required],
      coinId: ['', Validators.required],
    });
    this.selectLayoutForm = this.fb.group({
      layout: ['', Validators.required],
    });

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
  
  editLocation(){
    
  }

  createLocation(data) {
    console.log('data submit=', data);
  }
}
