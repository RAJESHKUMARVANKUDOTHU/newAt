import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginAuthService } from '../services/login-auth.service';
import { GeneralService } from '../services/general.service';
import { ApiService } from '../services/api.service';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { SettingInfoComponent } from '../setting-info/setting-info.component';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  @ViewChild('allSelected') private allSelected:MatOption
  @ViewChild('allSelected1') private allSelected1:MatOption
  @ViewChild('allSelected2') private allSelected2:MatOption
  @ViewChild('allSelected3') private allSelected3:MatOption
  @ViewChild('allSelected4') private allSelected4:MatOption
  @ViewChild('allSelected5') private allSelected5:MatOption
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
  deviceData:any=[]
  name:any
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
    this.refreshCoin()
  }
  createForm(){
    // this.dateTimeForm=this.fb.group({
    //   dateTimeFormat:['',Validators.required]
    // })

    this.distanceForm=this.fb.group({
      range:['',Validators.required]
    })

    this.timeDelay=this.fb.group({
      deviceId:['',Validators.required],
      timedelay:['',Validators.required],
    
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
      zoneName:['',Validators.required],
      standardtime:['',Validators.required]
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
      }
   
    }).catch((err:any)=>{
      console.log("error===",err)
    })
  }
 
 refreshDevice(){

  this.api.getDeviceData().then((res:any)=>{
    this.deviceData=[]
    console.log("find submit====",res);
    if(res.status){
        this.deviceData=res.success
    }
  }).catch((err:any)=>{
    console.log("error===",err)
  })
}


  // onSubmitDateTime(data){
  //   console.log("data===",data)
  //   try{
  //     if(this.dateTimeForm.valid){
  //       this.api.dateTimeFormat(data).then((res:any)=>{
  //         console.log("dateTimeFormat res===",res)
  //         if(res.status){
  //           this.general.openSnackBar('Date Time Format updated Successfully','')
  //           this.dateTimeForm.reset()
  //         }
  //       }).catch((err)=>{
  //         console.log("err=",err)
  //       })
  //     }

  //   }
  //   catch(error){
  //     console.log("error==",error)
  //   }
  // }

  onSubmitDistanceForm(data){
    console.log("data===",data)
    try{
      if(this.distanceForm.valid){
        this.api.setRange(data).then((res:any)=>{
          console.log("range res===",res)

          if(res.status){
            this.distanceForm.reset()
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
    data.deviceId=this.general.filterArray(data.deviceId)
    console.log("onSubmitTimeDelay data==",data)
   

    try{
      if(this.timeDelay.valid){
        this.api.timeDelay(data).then((res:any)=>{
          console.log("timeDelay res===",res)

          if(res.status){
            this.timeDelay.reset()
            this.general.openSnackBar('Time updated Successfully','')
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
  onSubmitInactivityFind(data){
    data.deviceId=this.general.filterArray(data.deviceId)
    console.log("onSubmitInactivityFind data==",data)
    this.inactivityFind.reset()


  }
  onSubmitInactivityCoin(data){
    data.coinId=this.general.filterArray(data.coinId)
    console.log("onSubmitInactivityCoin data==",data)
    this.inactivityCoin.reset()


  }
  onSubmitMaxFindForm(data){
    data.deviceId=this.general.filterArray(data.deviceId)
    console.log("onSubmitMaxFindForm data==",data)
    this.maxFindForm.reset()
  }
  onSumbitCoinCategory(data){
    data.coinId=this.general.filterArray(data.coinId)
    console.log("onSumbitCoinCategory data==",data)
    this.coinCategory.reset()


  }
  onSubmitZoneForm(data){
    console.log("onSubmitZoneForm data==",data)
    try{
      if(this.zoneForm.valid){
        this.api.zoneSetting(data).then((res:any)=>{
          console.log("zone setting res===",res)

          if(res.status){
            this.zoneForm.reset()
            this.general.openSnackBar(res.success,'')
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
  onSubmitGroupCoinForm(data){
    data.coinId=this.general.filterArray(data.coinId)
    console.log("onSubmitGroupCoinForm data==",data)
    this.groupCoinForm.reset()

  }

  toggleAllSelectionDevice(formData){
    console.log("allselected",this.allSelected)
    if(this.allSelected.selected){
      formData.controls.deviceId.patchValue([...this.deviceData.map(obj=>obj.deviceId),0])  
    }
    else{
       formData.controls.deviceId.patchValue([])
    }
  }
  toggleAllSelectionDevice1(formData){
    if(this.allSelected1.selected){
      formData.controls.deviceId.patchValue([...this.deviceData.map(obj=>obj.deviceId),0])
    }
    else{
      formData.controls.deviceId.patchValue([])
    }
  }
  toggleAllSelectionDevice2(formData){
    
    if(this.allSelected2.selected){
      formData.controls.deviceId.patchValue([...this.deviceData.map(obj=>obj.deviceId),0])
    }
    else{
      formData.controls.deviceId.patchValue([])
    }
  }
  

  toggleAllSelectionCoin(formData){

    if(this.allSelected3.selected){
      formData.controls.coinId.patchValue([...this.coinData.map(obj=>obj.coinId),0])
    }
    else{
      formData.controls.coinId.patchValue([])
    }
  }
  toggleAllSelectionCoin1(formData){
   
    if(this.allSelected4.selected){
      formData.controls.coinId.patchValue([...this.coinData.map(obj=>obj.coinId),0])
    }
    else{
      formData.controls.coinId.patchValue([])
    }
  } 
  
  toggleAllSelectionCoin2(formData){
    if(this.allSelected5.selected){
      formData.controls.coinId.patchValue([...this.coinData.map(obj=>obj.coinId),0])
    }
    else{
      formData.controls.coinId.patchValue([])
    }
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
