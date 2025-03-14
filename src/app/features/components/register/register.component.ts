import { AuthonService } from './../../../core/services/authon/authon.service';
import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {


  isErrorMsg : boolean = false;
  isLoading : boolean = false;

_AuthonService = inject(AuthonService)
  
  registerForm = new FormGroup({
    name: new FormControl(null,[Validators.required, Validators.minLength(3), Validators.maxLength(14)]),
    email: new FormControl(null,[Validators.required,Validators.email]),
    password: new FormControl(null,[Validators.pattern(/^[A-Z].{6,15}$/),Validators.required]),
    rePassword: new FormControl(null,[Validators.pattern(/^[A-Z].{6,15}$/),Validators.required]),
    phone: new FormControl(null,[Validators.required,Validators.pattern(/^01[01245][0-9]{8}$/)]),
  },this.confirmPassword);


  confirmPassword(f : any){
    if(f.get('password')?.value === f.get('rePassword')?.value){
return null
    }else{
      return {didntmatch:true};
    }
  }

  signUp(form:any){
    if(form.valid){
      this.isLoading=true;
      this._AuthonService.signUp(form.value).subscribe({
        next: (resp) => {
          console.log(resp)
          this.isErrorMsg=false;
          this.isLoading=false;
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
