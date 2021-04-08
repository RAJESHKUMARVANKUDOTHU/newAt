import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { GeneralService } from '../../services/general.service';
import { LoginAuthService } from '../../services/login-auth.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.css']
})
export class AdminSettingsComponent implements OnInit {
onlineStatus:FormGroup
offlineStatus:FormGroup
changeOnlineStatus:any=[]
changeOfflineStatus:any=[]
loginData:any
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private general: GeneralService,
    private login:LoginAuthService

    ) {  
    this.onlineStatus=this.fb.group({
      onlineStatus:['',Validators.required]
    })
    this.offlineStatus=this.fb.group({
      offlineStatus:['',Validators.required]
    })
  }

  ngOnInit(): void {
    this.loginData=this.login.getLoginDetails()
 
    this.refreshSettings(this.loginData.userData)
  }
  refreshSettings(data){
  this.api.getUserSettings(data).then((res:any)=>{
    console.log("user settings ===",res)
    if(res.status){
      
    }
  })
}
onSubmitOnlineStatus(data){
  if(this.onlineStatus.valid){
    data.userId=this.loginData.userData
  }
  console.log("onSubmitOfflineStatus data==",data)
  this.api.updateOnlineStatus(data).then((res:any)=>{
    console.log("res==",res)
  }).catch((err:any)=>{
    console.log("err==",err)
  })
}
onSubmitOfflineStatus(data){
  if(this.offlineStatus.valid){
    data.userId=this.loginData.userData
  }
  console.log("onSubmitOfflineStatus data==",data)
  this.api.updateOfflineStatus(data).then((res:any)=>{
    console.log("res==",res)
  }).catch((err:any)=>{
    console.log("err==",err)
  })
}

onSubmitTxPower(data){
  if(this.offlineStatus.valid){
    data.userId=this.loginData.userData
  }
  console.log("onSubmitOfflineStatus data==",data)
  this.api.updateTxPower(data).then((res:any)=>{
    console.log("res==",res)
  }).catch((err:any)=>{
    console.log("err==",err)
  })
}

onSubmitRssi(data){
  if(this.offlineStatus.valid){
    data.userId=this.loginData.userData
  }
  console.log("onSubmitOfflineStatus data==",data)
  this.api.updateRssi(data).then((res:any)=>{
    console.log("res==",res)
  }).catch((err:any)=>{
    console.log("err==",err)
  })
}


}
