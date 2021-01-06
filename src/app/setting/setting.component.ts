import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service';
import { ApiService } from '../services/api.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { SettingInfoComponent } from '../setting-info/setting-info.component';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  dateTimeForm:FormGroup
  distanceForm:FormGroup
  timeDelay:FormGroup
  inactivityFind:FormGroup
  inactivityCoin:FormGroup
  groupCoinForm:FormGroup
  coinCategory:FormGroup
  zoneForm:FormGroup
  maxFindForm:FormGroup
  feetValue:any=[10,20,30,40,50,60,70,80,90,100]
  coinData:any=[]
  gatewayData:any=[]
  findData:any=[]
  allSelected:any
  constructor(
    private fb: FormBuilder,
    private login:LoginAuthService,
    private api: ApiService,
    private general: GeneralService,
    public dialog: MatDialog,    
  ) { }

  ngOnInit(): void {
    this.createForm()
    this.refreshDevice()
    this.refreshGateway()
    this.refreshCoin()
  }
  createForm(){
    this.dateTimeForm=this.fb.group({
      dateTimeFormat:['',Validators.required]
    })

    this.distanceForm=this.fb.group({
      rangeInFeet:['',Validators.required]
    })

    this.timeDelay=this.fb.group({
      deviceId:['',Validators.required],
      delay:['',Validators.required],
    
    })

    this.inactivityFind=this.fb.group({
      deviceId:['',Validators.required],
      minutes:['',Validators.required],
      alert:['',Validators.required]
    })


    this.inactivityCoin=this.fb.group({
      coinId:['',Validators.required],
      minutes:['',Validators.required],
      alert:['',Validators.required]
    })


    this.groupCoinForm=this.fb.group({
      coinId:['',Validators.required],
      group:['',Validators.required],
      
    })


    this.coinCategory=this.fb.group({
      coinId:['',Validators.required],
      category:['',Validators.required],
      minutes:['',Validators.required]
    })

    this.zoneForm=this.fb.group({
      category:['',Validators.required],
      minutes:['',Validators.required]
    })

    this.maxFindForm=this.fb.group({
      deviceId:['',Validators.required],
      maxLimit:['',Validators.required],
    })
  }
  refreshCoin(){
    this.api.getCoinData().then((res:any)=>{
      console.log("coin submit====",res);
      this.coinData=[]
      if(res.status){
        this.coinData=res.success
        for(let i=0;i<res.success.length;i++){
          if(res.success[i] != null){
            this.coinData.push(res.success[i])
          }
        }
      }
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
 
 refreshDevice(){

  this.api.getDeviceData().then((res:any)=>{
    this.findData=[]
    console.log("find submit====",res);
    if(res.status){
        for(let i=0;i<res.success.length;i++){
          if(res.success[i] != null){
            this.findData.push(res.success[i])
          }
        }
    }
  }).catch((err:any)=>{
    console.log("error===",err)
  })
}

  refreshGateway(){
    this.api.getGatewayData().then((res:any)=>{
      this.gatewayData=[]
      console.log("gateway submit====",res);
      if(res.status){
        if(res.status){
          this.gatewayData=res.success
          for(let i=0;i<res.success.length;i++){
            if(res.success[i] != null){
              this.gatewayData.push(res.success[i])
            }
          }
        }
      }
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }

  onSubmitDateTime(data){
    console.log("data===",data)
    try{
      if(this.dateTimeForm.valid){
        this.api.dateTimeFormat(data).then((res:any)=>{
          console.log("dateTimeFormat res===",res)
          if(res.status){
            this.general.openSnackBar('Date Time Format updated Successfully','')
          }
        }).catch((err)=>{
          console.log("err=",err)
        })
      }

    }
    catch(error){
      console.log("error==",error)
    }
  }

  onSubmitDistanceForm(data){
    console.log("data===",data)
    try{
      if(this.distanceForm.valid){
        this.api.setRange(data).then((res:any)=>{
          console.log("range res===",res)

          if(res.status){
            this.general.openSnackBar('Range updated Successfully','')
          }
        }).catch((err)=>{
          console.log("err=",err)
        })
      }

    }
    catch(error){
      console.log("error==",error)
    }

  }
  onSubmitTimeDelay(data){

  }
  onSubmitInactivityFind(data){

  }
  onSubmitInactivityCoin(data){

  }
  onSubmitMaxFindForm(data){

  }
  onSumbitCoinCategory(data){

  }
  onSubmitZoneForm(data){

  }
  onSubmitGroupCoinForm(data){

  }
  toggleAllSelection(data,value){
    
  }

  openInfo(data){
    console.log("data==",data)
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '50vh';
    dialogConfig.width = '30vw';
    dialogConfig.data = {
      type:data
    }
    const dialogRef = this.dialog.open(SettingInfoComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}
