import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { AuthGuard } from './auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthenticationInterceptor } from './authentication.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BnNgIdleService } from 'bn-ng-idle';
import { ManageAssetComponent } from './assets/manage-asset/manage-asset.component';
import { GeofenceComponent } from './geofence/geofence.component';
import { ContactComponent } from './contact/contact.component';
import { ReportComponent } from './report/report.component';
import { MapCenterComponent } from './map-center/map-center.component';
import { ManageDeviceComponent } from './assets/manage-device/manage-device.component';
import { ManageGatewayComponent } from './assets/manage-gateway/manage-gateway.component';
import { ManageCoinComponent } from './assets/manage-coin/manage-coin.component';
import { ActiveDeviceComponent } from './assets/active-device/active-device.component';
import { OfflineDeviceComponent } from './assets/offline-device/offline-device.component';
import { ChartsModule } from 'ng2-charts';
import { AddAssetsComponent } from './assets/add-assets/add-assets.component';
import { EditAssetsComponent } from './assets/edit-assets/edit-assets.component';
import { SettingComponent } from './setting/setting.component';
import { LiveDataComponent } from './live-data/live-data.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import {NgxIntlTelInputModule} from 'ngx-intl-tel-input';
import { SettingInfoComponent } from './setting-info/setting-info.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    LoginComponent,
    DashboardComponent,
    AdminDashboardComponent,
    ManageAssetComponent,
    GeofenceComponent,
    ContactComponent,
    ReportComponent,
    MapCenterComponent,
    ManageDeviceComponent,
    ManageGatewayComponent,
    ManageCoinComponent,
    ActiveDeviceComponent,
    OfflineDeviceComponent,
    AddAssetsComponent,
    EditAssetsComponent,
    SettingComponent,
    LiveDataComponent,
    SettingInfoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ChartsModule,
    NgxIntlTelInputModule,
    NgCircleProgressModule.forRoot({}),

  ],
  providers: [
    AuthGuard,BnNgIdleService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor,multi:true},
  ],
    bootstrap: [AppComponent]
})
export class AppModule { }
