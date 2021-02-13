import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  host: string = environment.apiHost;
  constructor(private http: HttpClient) {}

  // user/subuser login
  login(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/loginUser';
    return new Promise((resolve, reject) => {
      this.http.post(url, data, httpOptions).subscribe(
        (res) => {
          resolve(res);
        },
        (err) => {
          console.log('err==', err);
          reject(err);
        }
      );
    });
  }

  createSubUsers(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/registerSubUsers';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  viewUsers() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getAllUsers';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
         
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deleteSubuser(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateSubuserStatus';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          console.log('get', res);
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateSubUser(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateSubuserEmailid';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          console.log('get', res);
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  // superadminlogin
  adminLogin(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/loginSuperAdmin';
    return new Promise((resolve, reject) => {
      this.http.post(url, data, httpOptions).subscribe(
        (res: any) => {
          resolve(res);
        },
        (err) => {
          console.log('err==', err);
          reject(err);
        }
      );
    });
  }

  createUsers(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/registerAdmin';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  viewAdmins() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getAllAdmins';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deleteUser(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/editIsDeletedUser';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  // ------------------------------------end-----------------------------------------------------

  //------------------------- device,gateway and coin registartion------------------------------------
  deviceRegistration(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/deviceRegister';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  gatewayRegistration(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/gatewayRegister';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  coinRegistration(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/coinRegistration';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // ----------------------------registration ends--------------------------------------------

  //---------------------get data list of device,gateway,coin-------------------------------
  getDeviceData() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/viewDevice';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getGatewayData() {
    console.log('gateway res check');

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/viewGateway';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getCoinData() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/viewCoin';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  // ----------------------------------end-------------------------------------
  //  -----------------------edit device,gateway,coin--------------------------
  editDevice(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/editDevice';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  editGateway(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/editGateway';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  editCoin(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/editCoin';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // ----------------------------------end--------------------------------------------

  //  -----------------------delete device,gateway,coin--------------------------

  deleteDevice(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/deleteDevice';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  deleteGateway(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/deleteGateway';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  deleteCoin(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/deleteCoin';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // ----------------------------------end--------------------------------------------

  // -----------------------registered device ,gateway,coin count----------------------------
  allDeviceCount() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getDevicesCount';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deviceOnOff(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/deviceToggleStatus';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // ----------------------------assign/deassign asset--------------------------
  assignAsset(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/assignAsset';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  deassignAsset(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/deAssignAsset';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  assignAssetList() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getAssignAsset';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  deassignAssetList() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getDeAssignAsset';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  // ------------------------------------end------------------------------------

  // -----------------------------------------------------------------------------------------
  // get Active data of device gateway and coin respectively
  getOnlineDevice() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getOnlineDevice';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  getOfflineDevice() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getOfflineDevice';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // ----------------------------------------end---------------------------------------------------------

  // -------------------------------Settings page api-------------------------------

  // dateTimeFormat(data){
  //     const httpOptions = {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //     };

  //     let url = this.host+'/dateTimeFormatUpdate';
  //     return new Promise((resolve,reject)=>{
  //       this.http.post(url,data,httpOptions).subscribe(res=>{
  //         resolve(res);
  //       })
  //     })

  // }

  // --------------geofence setting--------------------
  geofenceSetting(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/geoFenceSetting';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getGeofenceSetting() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getGeoFenceSetting';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // ---------------end----------------------------

  /* -------------Range Setting ----------------------- */
  setRange(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/rangeSetting';
    let body = {
      data: data,
    };
      return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  timeDelay(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/timeDelay';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  zoneSetting(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/zoneRegister';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getZone() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getZonesDetails';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deviceInactivity(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateDeviceInactivityTime';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  coinInactivity(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateCoinInActivityTime';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  zoneConfiguration(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateMultipleCoinId';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  groupRegister(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/groupRegister';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getGroup() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getAllGroupDetails';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateGroup(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateGroupDetails';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateMaxFind(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateMaxFindAsset';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }
  refreshSettings() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getSettings';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  // ----------------------map center API's----------------------------------

  createLayout(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/createLayout';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getLayouts() {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getLayouts';
    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res:any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getLayoutImage(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/getLayoutImage/' + data;
    return new Promise((resolve,reject) => {
      this.http.get(url, { responseType: 'blob' }).subscribe(
        (res:any) => {
          // observer.next(res);
          const reader = new FileReader();
          reader.readAsDataURL(res);
          reader.onloadend = function () {
            console.log("reader");
            
           resolve(reader.result);
          };
        },
        (err) => {
          console.log(err);
          reject(err)
        }
      );
    });
  }

  updateLatLng(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateLatLng';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  updateZoneBound(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/updateZoneBounds';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  deleteZoneBound(data) {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };

    let url = this.host + '/deleteZoneBounds';
    let body = {
      data: data,
    };
    return new Promise((resolve, reject) => {
      this.http.post(url, body, httpOptions).subscribe(
        (res: any) => {
          resolve(res.data);
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  //---------------------manage asset download -------------------------------
  // downloadFile(response, fileName) {
  //   let body = response.body;
  //   let dataType = 'application/ms-excel';
  //   let binaryData = [];
  //   binaryData.push(body);
  //   // this.general.loadingFreez.next({status:false})
  //   let downloadLink = document.createElement('a');
  //   downloadLink.href = window.URL.createObjectURL(
  //     new Blob(binaryData, { type: dataType })
  //   );
  //   downloadLink.setAttribute('download', fileName);
  //   document.body.appendChild(downloadLink);
  //   downloadLink.click();
  // }

  downloadFile(response,fileName){
    let body = response.body
    let dataType = body.type;
    let binaryData = [];
    binaryData.push(body);
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  downloadRegisteredCoins(fileName) {
    // this.general.loadingFreez.next({status:true})

    let url = this.host + '/downloadRegisteredCoins';
    return new Promise((resolve, reject) => {
      this.http.get(url, { observe: 'response', responseType: 'blob' as 'json' }).subscribe(res => {
        console.log("res==", res)
        if (res.status == 200)
          this.downloadFile(res, fileName)

        resolve(true);
      },
        err => {
          console.log("err==", err)
        })
    });

  }

  downloadRegisteredGateways(fileName) {
    // this.general.loadingFreez.next({status:true})

    let url = this.host + '/downloadRegisteredGateways';
    return new Promise((resolve, reject) => {
      this.http.get(url, { observe: 'response', responseType: 'blob' as 'json' }).subscribe(res => {
        console.log("res==", res)
        if (res.status == 200)
          this.downloadFile(res, fileName)

        resolve(true);
      },
        err => {
          console.log("err==", err)
        })
    });
  }

  downloadRegisteredDevice(fileName) {
    // this.general.loadingFreez.next({status:true})
    let url = this.host + '/downloadRegisterdDevice';
    return new Promise((resolve, reject) => {
      this.http.get(url, { observe: 'response', responseType: 'blob' as 'json' }).subscribe(res => {

        if (res.status == 200)
          this.downloadFile(res, fileName)

        resolve(true);
      },
        err => {
          console.log("err==", err)
        })
    });

  }

  downloadOnlineCoin(fileName) {
    // this.general.loadingFreez.next({status:true})

    let url = this.host + '/downloadOnlineCoin';
    return new Promise((resolve, reject) => {
      this.http.get(url, { observe: 'response', responseType: 'blob' as 'json' }).subscribe(res => {

        if (res.status == 200)
          this.downloadFile(res, fileName)

        resolve(true);
      },
        err => {
          console.log("err==", err)
        })
    });

  }

  downloadOfflineCoin(fileName) {
    // this.general.loadingFreez.next({status:true})

    let url = this.host + '/downloadOfflineCoin';
    return new Promise((resolve, reject) => {
      this.http
        .get(url, { observe: 'response', responseType: 'blob' as 'json' })
        .subscribe(
          (res:any) => {
            if (res.status == 200) this.downloadFile(res.data, fileName);

            resolve(true);
          },
          (err) => {
            console.log('err==', err);
          }
        );
    });
  }

  downloadOnlineGateways(fileName) {
    // this.general.loadingFreez.next({status:true})

    let url = this.host + '/downloadOnlineGateways';
    return new Promise((resolve, reject) => {
      this.http
        .get(url, { observe: 'response', responseType: 'blob' as 'json' })
        .subscribe(
          (res:any) => {
            if (res.status == 200) this.downloadFile(res.data, fileName);

            resolve(true);
          },
          (err) => {
            console.log('err==', err);
          }
        );
    });
  }

  downloadOfflineGateways(fileName) {
    // this.general.loadingFreez.next({status:true})

    let url = this.host + '/downloadOfflineGateways';
    return new Promise((resolve, reject) => {
      this.http
        .get(url, { observe: 'response', responseType: 'blob' as 'json' })
        .subscribe(
          (res:any) => {
            if (res.status == 200) this.downloadFile(res.data, fileName);

            resolve(true);
          },
          (err) => {
            console.log('err==', err);
          }
        );
    });
  }

  downloadOnlineDevice(fileName) {
    // this.general.loadingFreez.next({status:true})

    let url = this.host + '/downloadOnlineDevice';
    return new Promise((resolve, reject) => {
      this.http
        .get(url, { observe: 'response', responseType: 'blob' as 'json' })
        .subscribe(
          (res:any) => {
            if (res.status == 200) this.downloadFile(res.data, fileName);

            resolve(true);
          },
          (err) => {
            console.log('err==', err);
          }
        );
    });
  }

  downloadOfflineDevice(fileName) {
    // this.general.loadingFreez.next({status:true})

    let url = this.host + '/downloadOfflineDevice';
    return new Promise((resolve, reject) => {
      this.http
        .get(url, { observe: 'response', responseType: 'blob' as 'json' })
        .subscribe(
          (res:any) => {
            if (res.status == 200) this.downloadFile(res.data, fileName);

            resolve(true);
          },
          (err) => {
            console.log('err==', err);
          }
        );
    });
  }
}
