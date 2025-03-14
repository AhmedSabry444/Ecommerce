import { User } from './../../../shared/interfaces/user';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthonService } from './../../../core/services/authon/authon.service';
import { Router, RouterLink } from '@angular/router';
import { ForgetpasswordComponent } from '../forgetpassword/forgetpassword.component';
import {jwtDecode}  from 'jwt-decode';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  isErrorMsg : boolean = false;
  isLoading : boolean = false;

_AuthonService = inject(AuthonService);
_Router = inject(Router);
  

  loginForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.pattern(/^[A-Z].{6,15}$/),Validators.required]),
    },);



    login(form:any){
      if(form.valid){
        this.isLoading=true;
        this._AuthonService.signIn(form.value).subscribe({
          next: (resp) => {
            console.log(resp)
            this.isErrorMsg=false;
            this.isLoading=false;
            localStorage.setItem('token',resp.token);
            let decodedToken:any= jwtDecode(resp.token);
            this._AuthonService.userName.next(decodedToken.name)
            this._AuthonService.isLogin.next(true);
            this._Router.navigate(['/home'])
          },
          error: (errr) => {
            console.log(errr)
            this.isErrorMsg = true;
            this.isLoading=false;
          },
          complete: () => {},
        })
      }else{
        console.log('Problem')
      }
    }


}
