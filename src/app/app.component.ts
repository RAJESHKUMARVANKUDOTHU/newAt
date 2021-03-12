import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactComponent } from './contact/contact.component';
import * as moment from 'moment';
import { timer } from 'rxjs';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ATapp';
  deviceInfo: any;
  isMobile: boolean;
  isTablet: boolean;
  isDesktopDevice: boolean;
  // isExpanded = true;
  // isShowing = false;
  showLabel: boolean;
  loginDetails: any = '';
  logged: any;
  menu: boolean;
  role: boolean = false;
  statusFreeze: boolean = false;
  freezeMessage: String = 'Loading';
  countDownTimer: any;
  duration: any;
  time: any;
  private timer = timer(1000, 1000);

  constructor(
    private login: LoginAuthService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private general: GeneralService,
  ) {
    this.logged = this.login.loginData();
    this.login.loginCheckData.subscribe((res) => {
      if (res) {
        this.logged = res.other;
        this.menu = res.menu;
        if (this.logged == true) {
          this.loginDetails = this.login.getLoginDetails().success;
          this.duration = this.loginDetails.timer;
        }
      }
    });
    this.startTimer();
    this.freezeSubscribe();
  }
  ngOnInit(): void {
    this.duration = this.loginDetails.timer;
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
  }
  ngOnDestroy(){
    this.startTimer()
  }
  openDailog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.height = '60vh';
    dialogConfig.width = '30vw';

    const dialogRef = this.dialog.open(ContactComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => { });
  }

  freezeSubscribe() {
    this.general.loadingFreez.subscribe((res: any) => {
      console.log("free==", res);

      this.statusFreeze = res.status
      this.freezeMessage = res.msg
    })
  }

  startTimer() {
    clearInterval(this.countDownTimer);
    this.countDownTimer = setInterval(() => {
      var start = new Date() as any;
      var diff = Math.abs(this.duration - start);
      var minutes = Math.floor((diff / 1000 / 60) << 0);
      var seconds = Math.floor((diff / 1000) % 60);
      this.time =
        (minutes < 10 ? '0' + minutes : minutes) +
        ':' +
        (seconds < 10 ? '0' + seconds : seconds);
      if (minutes == 0 && seconds == 2) {
        this.general.loadingFreez.next({ status: true, msg: 'Your session has logged out..! please try again later' })
      }
 
      if (minutes == 0 && seconds == 0) {
        console.log("timer==", this.countDownTimer);
        this.general.loadingFreez.next({ status: false, msg: '' })
        clearTimeout(this.countDownTimer)
        this.login.logout();
        return;
      }
    }, 1000);
  }
}
