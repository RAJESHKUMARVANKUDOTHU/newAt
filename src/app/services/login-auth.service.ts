import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs'
import { Router , ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  public loginCred = new Subject<any>()
  public loginCheckData= new Subject<any>()
  constructor(private location:Location,private router:Router) {
    this.popState()
   }
  ngOnInit(): void {

  }


  // loginStatusMenu(){
  //   var status = localStorage.getItem('sensegizlogin')
  //   var route = window.location.pathname
  //   // console.log("route==",route)
  //   if(route !='/login' && route!='/admin-login' ){
  //     this.loginCred.next(true)
  //   }
  //   else{
  //     this.loginCred.next(false)
  //   }
  // }

  loginData(){
    var status=localStorage.getItem('sensegiz')
    // console.log("login data===",status)
    if(status && status != 'undefined' || status != null){
      // console.log("true")
        this.loginCheckData.next(true)
        return true  
    }
    else{
      // console.log("false")
      this.loginCheckData.next(false)
      return false
    }
  }
  
popState(){
  this.location.subscribe(
    ( (value:PopStateEvent) => {
      // console.log("locaton OnNext")
      // console.log(value,this.location.path);
      if(window.location.pathname=='/login' || window.location.pathname=='/admin-login'){
        this.loginCheckData.next(false)
        this.loginCred.next(false)
        localStorage.clear()
      }
      else{
        this.loginCheckData.next(true)
        this.loginCred.next(true)
      }

    }),
    ( ex => {
      console.log("Error occured postate event")
      console.log(ex);
    })
  )
}
  getLoginDetails(){
    var status=JSON.parse(localStorage.getItem('sensegiz'))
    // console.log("getLoginDetails===",status)
    if(status && status != 'undefined' || status != null){
      // console.log("hmm")
      return status
    }
    else{
      return false
    }

  }



  login(data){
    // console.log("setting data",localStorage.setItem('sensegiz',data))
    localStorage.setItem('sensegiz',data)
    return true
  }

  logout(){
    this.loginCheckData.next(false)
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
