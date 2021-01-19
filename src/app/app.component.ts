import { Component,OnInit } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { Router , ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ATapp';
  isExpanded = true;
  isShowing = false;
  showLabel:boolean
  sideNav:boolean=false
  loginDetails:any
  logged:boolean
  menu:boolean
  log:boolean=true
  statusFreeze:boolean=false
  freezeMessage:String="Downloading"
  constructor(
    private login:LoginAuthService,
    private router:Router,
    private route:ActivatedRoute,  
    private deviceService: DeviceDetectorService){
      this.loginDetails=this.login.getLoginDetails()
      this.logged=this.login.loginData()
      
      // this.menu=this.login.loginStatusMenu()
      console.log("this.loginDetails====",this.loginDetails)
      this.login.loginCheckData.subscribe((res)=>{
        console.log("res===",res)
        this.logged=res
        this.loginDetails=this.login.getLoginDetails()
        console.log("this.loginDetails inside====",this.loginDetails)
        console.log("this.logged in======",this.logged)
      });
      this.login.loginCred.subscribe(res=>{
        console.log("res1===",res)

        this.menu=res
        this.loginDetails=this.login.getLoginDetails()
        console.log("this.loginDetails inside====",this.loginDetails)
        console.log("this.menu======",this.menu)
      
      })
      
      console.log("route = ",window.location.pathname)
    }
    logout(){
      localStorage.clear()
      this.login.loginCheckData.next(false)
      this.router.navigate(['/login'])
    }
}

