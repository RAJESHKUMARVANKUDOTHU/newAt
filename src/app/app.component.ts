import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactComponent } from './contact/contact.component';
import * as moment from 'moment';
import {timer} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ATapp';
  deviceInfo: any
  isMobile: boolean
  isTablet: boolean
  isDesktopDevice: boolean
  // isExpanded = true;
  // isShowing = false;
  showLabel: boolean
  loginDetails: any = ''
  logged: any
  menu: boolean
  role: boolean = false
  statusFreeze: boolean = false
  freezeMessage: String = "Loading"
  countDownTimer: any
  duration: any
  time: any
  private timer = timer(1000,1000);

  constructor(
    private login: LoginAuthService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService) {
    this.logged = this.login.loginData()
    this.login.loginCheckData.subscribe((res) => {
      if (res) {
        console.log("loginCheckData===", res)
        this.logged = res.other
        this.menu = res.menu
        if (this.logged == true) {
          this.loginDetails = this.login.getLoginDetails().success
          this.duration = this.loginDetails.timer
          console.log("res===", this.logged, this.menu)
          console.log("this.loginDetails inside====", this.loginDetails)
        }
        else {

        }
      }


    });

    this.startTimer()
  }
  ngOnInit(): void {
    this.duration = this.loginDetails.timer
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }
  ngOnDestroy() {
    this.startTimer()
  }
  openDailog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60vh';
    dialogConfig.width = '30vw';

    const dialogRef = this.dialog.open(ContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  startTimer() {

    var diff
    clearInterval(this.countDownTimer);


    this.countDownTimer = setInterval(() => {
      var start = new Date() as any
      var diff = Math.abs(this.duration - start)
      let timer = diff, seconds;
      var minutes = Math.floor(timer / (60 * 1000))
      seconds = Math.floor((timer % (60 * 1000) / 1000))
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.time = (minutes < 10 ? "0" + minutes : minutes) + ":" + seconds;

    }, 1000);

  }

  loginTimer(){
    let time =  this.timer.subscribe((next)=>{
      console.log("next timer==",next);
      
    })
  }

}

