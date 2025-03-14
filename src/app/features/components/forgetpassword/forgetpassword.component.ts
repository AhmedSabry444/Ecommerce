import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthonService } from '../../../core/services/authon/authon.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-forgetpassword',
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {

forgetForm = new FormGroup({
      email: new FormControl(null,[Validators.required,Validators.email]),
    },);

    _AuthonService = inject(AuthonService);
      _ToastrService=inject(ToastrService)
_Router = inject(Router);

    forget(form:any){
          if(form.valid){
            this._AuthonService.forgetPassword(form.value).subscribe({
              next: (resp) => {
                console.log(resp)
                this._ToastrService.info('Reset Code Sent To Your Email')
              },
              error: (errr) => {
                console.log(errr)
              },
            })
          }
        }
    
    
    
    
}
