import { Injectable } from '@angular/core';
import { Subject, Observable, EMPTY } from 'rxjs'
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {
  public loginCred = new Subject<any>()
  public loginCheckData = new Subject<any>()
 
  constructor(private location: Location, private router: Router, ) {
    this.popState()
  }
  ngOnInit(): void {
   
  }

  loginData() {
    var status = JSON.parse(localStorage.getItem('sensegiz'))
    if (this.checkRole() && this.checkRole() != null) {
      // console.log("true")
      if(status.success.role ==  'superAdminRole'){
        var a ={
          menu : false,
          other : true
        }
      }
      else{
        a ={
          menu : true,
          other : true
        }
      }
      this.loginCheckData.next(a)
    }
    else {
       a ={
        menu : false,
        other : false
      }
      this.loginCheckData.next(a)
    }
  }

  popState() {
    var status = JSON.parse(localStorage.getItem('sensegiz'))
    this.location.subscribe(
      ((value: PopStateEvent) => {

        if (window.location.pathname == '/login' || window.location.pathname == '/admin-login' && status.success.role == undefined) {
          var a ={
            menu : false,
            other : false
          }
          this.loginCheckData.next(a)
          localStorage.clear()
          return a
          
        }
        else {
          // a ={
          //   menu : true,
          //   other : true
          // }
          // this.loginCheckData.next(a)
          // return a
          this.loginData()
        }

      }),
      (ex => {
        console.log("Error occured postate event")
        console.log(ex);
      })
    )
  }
  getLoginDetails() {
    var status = JSON.parse(localStorage.getItem('sensegiz'))
    if (this.checkRole() && this.checkRole() != null) {
      return status
    }
    else {
      return false
    }
  }

  checkRole() {
    var status = JSON.parse(localStorage.getItem('sensegiz'))
    if (status && status != 'undefined' || status != null) {
      if (status.success.role == 'adminRole' ||
        status.success.role == 'userRole' ||
        status.success.role == 'coAdminRole' ||
        status.success.role == 'subAdminRole' || status.success.role == 'superAdminRole') {
        return true
      }
      else {
        return false
      }
    } else {
      return false
    }
  }
  login(data) {
    // console.log("setting data",localStorage.setItem('sensegiz',data))
    localStorage.setItem('sensegiz', data)
    return true
  }

  logout() {
    var a={
      menu:false,
      other:false
    }
    this.loginCheckData.next(a)
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
