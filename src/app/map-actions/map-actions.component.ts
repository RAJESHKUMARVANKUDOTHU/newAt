import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-map-actions',
  templateUrl: './map-actions.component.html',
  styleUrls: ['./map-actions.component.css']
})
export class MapActionsComponent implements OnInit {
  newLocationForm : FormGroup;
  editLocationForm : FormGroup;
  gatewayList:any=[
    {
      gatewayId:'123456789878',
      name:'gateway1',
      coins:[
        {
          coinId:1,
          coinName:'a'
        },
        {
          coinId:2,
          coinName:'b'
        },
        {
          coinId:3,
          coinName:'c'
        },
      ]
    },
    {
      gatewayId:'AB3456789878',
      name:'gateway2',
      coins:[
        {
          coinId:4,
          coinName:'aa'
        },
        {
          coinId:5,
          coinName:'bb'
        },
        {
          coinId:6,
          coinName:'cc'
        },
      ]
    },
    {
      gatewayId:'CD3456789878',
      name:'gateway3',
      coins:[
        {
          coinId:7,
          coinName:'aaa'
        },
        {
          coinId:8,
          coinName:'bbb'
        },
        {
          coinId:9,
          coinName:'ccc'
        },
      ]
    },
    {
      gatewayId:'EF3456789878',
      name:'gateway4'
    },
  ];
  coinList:any = [];
  constructor(private fb:FormBuilder,) { }

  ngOnInit(): void {
    this.newLocationForm=this.fb.group({
      gatewayId:['',Validators.required],
      locationName:['',Validators.required],
      description:['',Validators.required],
      map:['',Validators.required],
    })
    this.editLocationForm=this.fb.group({
      gatewayId:['',Validators.required],
      coinId:['',Validators.required],
    })
  }
  

  gatewaySelect(data){
    console.log("gatewaySelect==",data);
    this.coinList = data.coins;
  }
 

  coinSelect(data){
    console.log("coinSelect==",data);
    
  }

  createLocation(data){
    console.log("data submit=",data);
    
  }



}
