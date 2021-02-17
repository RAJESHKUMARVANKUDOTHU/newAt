import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from './services/login-auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ATapp';
  deviceInfo:any
  isMobile: boolean
  isTablet: boolean
  isDesktopDevice: boolean
  // isExpanded = true;
  // isShowing = false;
  showLabel: boolean
  loginDetails: any
  logged: boolean
  menu: boolean
  role: boolean = false
  statusFreeze: boolean = false
  freezeMessage: String = "Loading"
  constructor(
    private login: LoginAuthService,
    private router: Router,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private deviceService: DeviceDetectorService) {
    this.loginDetails = this.login.getLoginDetails().success
    this.logged = this.login.loginData()

    console.log("this.loginDetails====", this.loginDetails)
    this.login.loginCheckData.subscribe((res) => {
      console.log("res===", res)
      this.logged = res
      console.log("this.loginDetails inside====", this.loginDetails)
    });
    this.login.loginCred.subscribe(res => {
      console.log("res1===", res)

      this.menu = res
      this.loginDetails = this.login.getLoginDetails().success
      })

    console.log("route = ", window.location.pathname)
  }
  ngOnInit(): void {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    this.isMobile = this.deviceService.isMobile();
    this.isTablet = this.deviceService.isTablet();
    this.isDesktopDevice = this.deviceService.isDesktop();
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

  logout() {
    localStorage.clear()
    this.login.loginCheckData.next(false)
    this.router.navigate(['/login'])
  }
}

