import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  host:string = environment.apiHost
  constructor(private http:HttpClient,) { }
  
  
  // user login
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

// adminlogin
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
  // ----------------------user create,display,delete-----------------------
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

  viewUsers(){
    console.log("get")
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


  // ------get Active, offline && online count of device gateway and coin respectively-------

  deviceStatus(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   
    let url = this.host+'/activeDevice';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        resolve(res);
      })
    })
  }
  gatewayStatus(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   
    let url = this.host+'/activeGateways';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        resolve(res);
      })
    })
  }
  
  coinStatus(){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
   
    let url = this.host+'/activeCoin';
    return new Promise((resolve,reject)=>{
      this.http.get(url).subscribe(res=>{
        resolve(res);
      })
    })
  }

  // ------------------------------- end-------------------------------------------------------------

  // -----------------------------------------------------------------------------------------
  // get Active data of device gateway and coin respectively
    getActiveDeviceList(){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      let url = this.host+'/activeDeviceList';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
          resolve(res);
        })
      })
    }
    getActiveGatewayList(){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      let url = this.host+'/activeGatewayList';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
          resolve(res);
        })
      })
    }
    getActiveCoinList(){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      let url = this.host+'/activeCoinList';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
          resolve(res);
        })
      })
    }



    // ----------------------------------------end---------------------------------------------------------
     
    
    
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

    // -----------------------registered device ,gateway,coin count----------------------------
    allDeviceCount(){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
  
      let url = this.host+'/allDeviceCount';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
          resolve(res);
        })
    })
  }



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
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };
    
      let url = this.host+'/viewGateway';
      return new Promise((resolve,reject)=>{
        this.http.get(url).subscribe(res=>{
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

// ----------------------------assign asset--------------------------
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
  // ------------------------------------end------------------------------------

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


  /* -------------Range Setting ----------------------- */
  setRange(data){
      const httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

      let url = this.host+'/range';
      return new Promise((resolve,reject)=>{
        this.http.post(url,data,httpOptions).subscribe(res=>{
          resolve(res);
        })
      }) 

  }

}
