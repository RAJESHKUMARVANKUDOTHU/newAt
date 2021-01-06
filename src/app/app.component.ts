import { Component,OnInit } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { Router , ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import { ContactComponent } from './contact/contact.component';

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
    public dialog: MatDialog,    
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

    openDailog(){
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.height = '60vh';
        dialogConfig.width = '30vw';

        const dialogRef = this.dialog.open(ContactComponent, dialogConfig);
      
        dialogRef.afterClosed().subscribe(result => {
          
        });
    }

    logout(){
      localStorage.clear()
      this.login.loginCheckData.next(false)
      this.router.navigate(['/login'])
    }
}

