import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { LoginAuthService } from '../../services/login-auth.service';
import { ApiService } from '../../services/api.service';
import { GeneralService } from '../../services/general.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';

@Component({
  selector: 'app-manage-asset',
  templateUrl: './manage-asset.component.html',
  styleUrls: ['./manage-asset.component.css']
})
export class ManageAssetComponent implements OnInit {
  assignAssetForm:FormGroup
  deassignAssetForm:FormGroup
  findData:any
  getAssetList:any
  getDeAssetList:any
  id:any
  public doughnutChartLabels: string[] = ['Device','Gateways','Coin'];
  public doughnutChartData:any=[0,0,0]
  public doughnutChartData1:any=[0,0,0]
  public doughnutChartData2:any=[0,0,0]
  countActive:any=[]
  countOffline:any =[]  
  countReg:any=[]
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
    private fb:FormBuilder,
    public dialog: MatDialog
  ) {
    // this.doughnutChartData=this.countActive
    // this.doughnutChartData1=this.countOffline
     
   }

  ngOnInit(): void {
    this.assignAssetForm=this.fb.group({
      deviceId:['',Validators.required],
      deviceName:['',Validators.required]
    })
    this.deassignAssetForm=this.fb.group({
      deviceId:['',Validators.required],
     
    })
    // this.doughnutChartData2=this.countReg

    this.registeredCount()
    this.refreshDevice()
    this.getAssignAssetList()
    this.getDeAssignAssetList()
  }

  registeredCount(){
    this.api.allDeviceCount().then((res:any)=>{
      console.log("allDeviceCount count====",res); 
        if(res.success){

          this.countReg=res.count
         
          this.doughnutChartData2=[this.countReg.deviceCount,this.countReg.gatewayCount,this.countReg.coinCount]
          console.log("this.doughnutChartData2",this.doughnutChartData2)
        } 
    
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  getAssetInfo(a){
    this.id=a._id
    // this.userId=a.userId
  }
  getAssignAssetList(){
    this.api.assignAssetList().then((res:any)=>{
      console.log("assignAsset list res====",res);
      if(res.status){
        this.getAssetList=res.success
      } 
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  getDeAssignAssetList(){
    this.api.deassignAssetList().then((res:any)=>{
      console.log("deassignAsset list res====",res);
      if(res.status ){
        this.getDeAssetList=res.success
      } 
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  assignAsset(data){
    data._Id=this.id
    // data.userId=this.userId
    console.log("assign data==",data)
    if(this.assignAssetForm.valid){
      this.api.assignAsset(data).then((res:any)=>{
        console.log("assignAsset res====",res);
        if(res.status || !res.status){
          this.refreshDevice()
          this.general.openSnackBar(res.message,'')
        } 
     
      }).catch((err:any)=>{
        console.log("error===",err)
      })
    }
  }
  deassignAsset(data){
    data._Id=this.id
    // data.userId=this.userId
    if(this.deassignAssetForm.valid){
      this.api.deassignAsset(data).then((res:any)=>{
        console.log("De assignAsset res====",res);
        if(res.status || !res.status){
          this.refreshDevice()
          this.general.openSnackBar(res.message,'')
        } 
     
      }).catch((err:any)=>{
        console.log("error===",err)
      })
    }
  }


  refreshDevice(){

    this.api.getDeviceData().then((res:any)=>{
      this.findData=[]
      console.log("find submit====",res);
      if(res.status){
  
        this.findData=res.success
      }
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
}
