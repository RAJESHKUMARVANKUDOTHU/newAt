import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { LoginAuthService } from '../../services/login-auth.service';
import { ApiService } from '../../services/api.service';
import { GeneralService } from '../../services/general.service';
@Component({
  selector: 'app-manage-asset',
  templateUrl: './manage-asset.component.html',
  styleUrls: ['./manage-asset.component.css']
})
export class ManageAssetComponent implements OnInit {
  assetForm:FormGroup
  deviceData:any

  public doughnutChartLabels: string[] = ['Device','Gateways','Coin'];
  public doughnutChartData:any
  public doughnutChartData1:any
  public doughnutChartData2:any
  countActive:any=[]
  countOffline:any =[]  
  chartOptions = {
    responsive: true,
  };

  public colors:Array<any> = [
    {
       backgroundColor:["rgb(21,157,7)" ,"rgb(255,165,7)","rgb(5,120,200)"],
    },
  ];

  public offlinecolors:Array<any> = [
    {
      backgroundColor:["rgb(255,165,7)" ,"rgb(21,157,7)","rgb(5,120,200)"],
    },
  ];
  public Activecolors:Array<any> = [
    {
      backgroundColor:["rgb(255,165,7)" ,"rgb(21,157,7)","rgb(5,120,200)"]
    },
  ];
  constructor(
    private login:LoginAuthService,
    private api: ApiService,
    private general:GeneralService,
    private fb:FormBuilder
  ) {
    this.doughnutChartData=this.countActive
    this.doughnutChartData1=this.countOffline
    this.doughnutChartData2=[
      // this.general.registeredDeviceCount,
      // this.general.registeredGatewayCount,
      // this.general.registeredCoinCount
    ]
    // console.log("this.doughnutChartData2========",this.doughnutChartData2)
    this.deviceData=this.general.deviceData
   }

  ngOnInit(): void {
    this.assetForm=this.fb.group({
      deviceId:['',Validators.required],
      deviceName:['',Validators.required]
    })


    this.deviceCount()
    this.gatewayCount()
    this.coinCount()
  }

  deviceCount(){
    this.api.deviceStatus().then((res:any)=>{
      // console.log("device count====",res); 
        if(res.status){
          this.countActive.push(res.active)
          this.countOffline.push(res.offline)
        } 
    
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  gatewayCount(){
    this.api.gatewayStatus().then((res:any)=>{
      // console.log("gateway count====",res); 
      if(res.status){
        this.countActive.push(res.active)
        this.countOffline.push(res.offline)
      } 
      }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  coinCount(){
    this.api.coinStatus().then((res:any)=>{
      // console.log("coin count====",res);
      if(res.status){
          this.countActive.push(res.active)
          this.countOffline.push(res.offline)
          console.log("this.countActive==",this.countActive,this.countOffline)
          this.doughnutChartData=[this.countActive[0],this.countActive[1],this.countActive[2]]
          this.doughnutChartData1=[this.countOffline[0],this.countOffline[1],this.countOffline[2]]
        } 
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  assign(data){

    if(this.assetForm.valid){
      this.api.assignAsset(data).then((res:any)=>{
        // console.log("coin count====",res);
        if(res.status){
          this.general.openSnackBar('Asset assigned successfully','')
        } 
     
      }).catch((err:any)=>{
        console.log("error===",err)
      })
    }
  }
  deassign(data){
    if(this.assetForm.valid){
      this.api.deassignAsset(data).then((res:any)=>{
        console.log("coin count====",res);
        if(res.status){
          this.general.openSnackBar('Asset deassigned successfully','')
        } 
     
      }).catch((err:any)=>{
        console.log("error===",err)
      })
    }
  }

}
