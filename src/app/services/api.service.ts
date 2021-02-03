import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host:string = environment.apiHost
  constructor(private http:HttpClient,) { }
  
  
  // user/subuser login
  login(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/loginUser';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      },err=>{
        console.log("err==",err)
        reject(err)
      })
    });
  }

  createSubUsers(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   
    let url = this.host+'/registerSubUsers';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        console.log("get",res)
        resolve(res);
      })
    })
  }

  viewUsers(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    let url = this.host+'/getAllUsers';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        console.log("res=", resolve(res),res)
        resolve(res);
      })
    })
  }

  deleteSubuser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   
    let url = this.host+'/updateSubuserStatus';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        console.log("get",res)
        resolve(res);
      })
    })
  }

  updateSubUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   
    let url = this.host+'/updateSubuserEmailid';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        console.log("get",res)
        resolve(res);
      })
    })
  }
// superadminlogin
  adminLogin(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/loginSuperAdmin';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      },err=>{
        console.log("err==",err)
        reject(err)
      })
    });
  }
 
  createUsers(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/registerAdmin';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  viewAdmins(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
    let url = this.host+'/getAllAdmins';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        console.log("res=", resolve(res),res)
        resolve(res);
      })
    })
  }



  deleteUser(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/editIsDeletedUser';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }
// ------------------------------------end-----------------------------------------------------


    //------------------------- device,gateway and coin registartion------------------------------------
    deviceRegistration(data){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
  
      let url = this.host+'/deviceRegister';
      return new Promise((resolve,reject)=>{
        this.http.post(url,data,httpOptions).subscribe(res=>{
          resolve(res);
        })
      })
    }
    gatewayRegistration(data){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
  
      let url = this.host+'/gatewayRegister';
      return new Promise((resolve,reject)=>{
        this.http.post(url,data,httpOptions).subscribe(res=>{
          resolve(res);
        })
      })
    }
    coinRegistration(data){
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
    
        let url = this.host+'/coinRegistration';
        return new Promise((resolve,reject)=>{
          this.http.post(url,data,httpOptions).subscribe(res=>{
            resolve(res);
          })
      })
    }


    // ----------------------------registration ends--------------------------------------------

    //---------------------get data list of device,gateway,coin-------------------------------
      getDeviceData(){
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
      
        let url = this.host+'/viewDevice';
        return new Promise((resolve,reject)=>{
          this.http.get(url).subscribe(res=>{
            resolve(res);
          })
        })
  
      }
      getGatewayData(){
        console.log("gateway res check")

        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
      
        let url = this.host+'/viewGateway';
        return new Promise((resolve,reject)=>{
          this.http.get(url).subscribe(res=>{
            console.log("gateway res==",res)
            resolve(res);
          })
        })
  
      }
      getCoinData(){
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
      
        let url = this.host+'/viewCoin';
        return new Promise((resolve,reject)=>{
          this.http.get(url).subscribe(res=>{
            resolve(res);
          })
        })
  
      }
      // ----------------------------------end-------------------------------------
  //  -----------------------edit device,gateway,coin--------------------------
      editDevice(data){
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
  
        let url = this.host+'/editDevice';
        return new Promise((resolve,reject)=>{
          this.http.post(url,data,httpOptions).subscribe(res=>{
            resolve(res);
          })
      })
      }
      editGateway(data){
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
  
        let url = this.host+'/editGateway';
        return new Promise((resolve,reject)=>{
          this.http.post(url,data,httpOptions).subscribe(res=>{
            resolve(res);
          })
      })
      }
      editCoin(data){
          const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          };
  
          let url = this.host+'/editCoin';
          return new Promise((resolve,reject)=>{
            this.http.post(url,data,httpOptions).subscribe(res=>{
              resolve(res);
            })
        })
      }
  
  
  
  // ----------------------------------end--------------------------------------------
  
  //  -----------------------delete device,gateway,coin--------------------------
  
  
      deleteDevice(data){
          const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          };
  
          let url = this.host+'/deleteDevice';
          return new Promise((resolve,reject)=>{
            this.http.post(url,data,httpOptions).subscribe(res=>{
              resolve(res);
            })
        })
      }
      deleteGateway(data){
          const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          };
  
          let url = this.host+'/deleteGateway';
          return new Promise((resolve,reject)=>{
            this.http.post(url,data,httpOptions).subscribe(res=>{
              resolve(res);
            })
        })
      }
      deleteCoin(data){
          const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
          };
  
          let url = this.host+'/deleteCoin';
          return new Promise((resolve,reject)=>{
            this.http.post(url,data,httpOptions).subscribe(res=>{
              resolve(res);
            })
        })
      }
  
  
  
  
  // ----------------------------------end--------------------------------------------

  // -----------------------registered device ,gateway,coin count----------------------------
    allDeviceCount(){
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        let url = this.host+'/getDevicesCount';
        return new Promise((resolve,reject)=>{
          this.http.get(url).subscribe(res=>{
            resolve(res);
          })
      })
    }
  

    deviceOnOff(data){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      let url = this.host+'/deviceToggleStatus';
      return new Promise((resolve,reject)=>{
        this.http.post(url,data,httpOptions).subscribe(res=>{
          resolve(res);
        })
    })
    }

  
  // ----------------------------assign/deassign asset--------------------------
    assignAsset(data){
        const httpOptions = {
          headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
  
        let url = this.host+'/assignAsset';
        return new Promise((resolve,reject)=>{
          this.http.post(url,data,httpOptions).subscribe(res=>{
            resolve(res);
          })
        })  
    }
    deassignAsset(data){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
  
      let url = this.host+'/deAssignAsset';
      return new Promise((resolve,reject)=>{
        this.http.post(url,data,httpOptions).subscribe(res=>{
          resolve(res);
        })
      }) 
    }

    assignAssetList(){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      let url = this.host+'/getAssignAsset';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
          resolve(res);
        })
      })  
    }
    deassignAssetList(){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      let url = this.host+'/getDeAssignAsset';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
          resolve(res);
        })
      }) 
    }
  // ------------------------------------end------------------------------------



  // -----------------------------------------------------------------------------------------
  // get Active data of device gateway and coin respectively
  getOnlineDevice(){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      let url = this.host+'/getOnlineDevice';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
          resolve(res);
        })
      })
    }
    getOfflineDevice(){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      let url = this.host+'/getOfflineDevice';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
          resolve(res);
        })
      })
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
  geofenceSetting(data){
    console.log("geo")
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/geoFenceSetting';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        console.log("geo",res)
        resolve(res);
      })
    }) 

}

getGeofenceSetting(){
  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  let url = this.host+'/getGeoFenceSetting';
  return new Promise((resolve,reject)=>{
    this.http.get(url).subscribe(res=>{
      resolve(res);
    })
  }) 

}

  // ---------------end----------------------------


  /* -------------Range Setting ----------------------- */
  setRange(data){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      let url = this.host+'/rangeSetting';
      return new Promise((resolve,reject)=>{
        this.http.post(url,data,httpOptions).subscribe(res=>{
          resolve(res);
        })
      }) 

  }

  timeDelay(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/timeDelay';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    }) 
  }

  zoneSetting(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/zoneRegister';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  getZone(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getZonesDetails';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        resolve(res);
      })
    })
  }

  deviceInactivity(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateDeviceInactivityTime';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  coinInactivity(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateCoinInActivityTime';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  zoneConfiguration(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateMultipleCoinId';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  groupRegister(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/groupRegister';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }


  getGroup(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getAllGroupDetails';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        resolve(res);
      })
    })
  }

  updateGroup(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateGroupDetails';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }


  // ----------------------map center API's----------------------------------

  createLayout(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/createLayout';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  getLayouts(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getLayouts';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        resolve(res);
      })
    })
  }
  
  updateLatLng(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateLatLng';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  updateZoneBound(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/updateZoneBounds';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  deleteZoneBound(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/deleteZoneBounds';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }

  getLayoutImage(data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    let url = this.host+'/getLayoutImage';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,httpOptions).subscribe(res=>{
        resolve(res);
      })
    })
  }



  //---------------------manage asset download -------------------------------
  downloadFile(response,fileName){
    let body = response.body
    let dataType = body.type;
    let binaryData = [];
    binaryData.push(body);
    // this.general.loadingFreez.next({status:false})
    let downloadLink = document.createElement('a');
    downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
    downloadLink.setAttribute('download', fileName);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }


  downloadRegisteredCoins(fileName){
    // this.general.loadingFreez.next({status:true})
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    let url = this.host+'/downloadRegisteredCoins';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        // if(res.status==200)
        // this.downloadFile(res,fileName)
  
        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });
  
  }

  downloadRegisteredGateways(data,fileName){
    // this.general.loadingFreez.next({status:true})
  
    let url = this.host+'/downloadRegisteredGateways';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
        if(res.status==200)
        this.downloadFile(res,fileName)
  
        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });
  
  }

  downloadOnlineCoin(data,fileName){
    // this.general.loadingFreez.next({status:true})
  
    let url = this.host+'/downloadOnlineCoin';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
        if(res.status==200)
        this.downloadFile(res,fileName)
  
        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });
  
  }

  downloadOfflineCoin(data,fileName){
    // this.general.loadingFreez.next({status:true})
  
    let url = this.host+'/downloadOfflineCoin';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
        if(res.status==200)
        this.downloadFile(res,fileName)
  
        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });
  
  }

  downloadOnlineGateways(data,fileName){
    // this.general.loadingFreez.next({status:true})
  
    let url = this.host+'/downloadOnlineGateways';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
        if(res.status==200)
        this.downloadFile(res,fileName)
  
        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });
  
  }

  downloadOfflineGateways(data,fileName){
    // this.general.loadingFreez.next({status:true})
  
    let url = this.host+'/downloadOfflineGateways';
    return new Promise((resolve,reject)=>{
      this.http.post(url,data,{ observe: 'response', responseType: 'blob' as 'json' }).subscribe(res=>{
        if(res.status==200)
        this.downloadFile(res,fileName)
  
        resolve(true);
      },
      err=>{
        console.log("err==",err)
      })
    });
  
  }
}
