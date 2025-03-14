import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { User } from '../../../shared/interfaces/user';
import { Login } from '../../../shared/interfaces/login';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import {jwtDecode}  from 'jwt-decode';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthonService {

  pid = inject(PLATFORM_ID);
  r =inject(Router);

  constructor(private _HttpClient:HttpClient) { 

    if(isPlatformBrowser(this.pid)){

    
    {
      if(localStorage.getItem('token')!==null){
      this.verifyToken(localStorage.getItem('token')).subscribe({
        next:(res)=>{
          console.log('hello from verify token')
          if(res.message == 'verified')
            this.isLogin.next(true)
          this.r.navigate(['/home'])
          let token :any=localStorage.getItem('token')
          let decodedToken:any= jwtDecode(token);
          this.userName.next(decodedToken.name)
        },
        error:()=>{this.isLogin.next(false)
          this.r.navigate(['/login'])
        },
      });
      };
    }
    }
  }

  verifyToken(t:any):Observable <any>{

    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/auth/verifyToken',{
      headers:{
        token : t
      }
    })
  }

  userName :BehaviorSubject <string> = new BehaviorSubject('');

  signUp(userData:User):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData);}

    signIn(loginData:Login):Observable<any>{
      return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin',loginData);}

      forgetPassword(email:any):Observable<any>{
        return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',email);}
      

      isLogin : BehaviorSubject <boolean> = new BehaviorSubject(false);
      
      
}
