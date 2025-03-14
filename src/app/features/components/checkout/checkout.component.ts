import { ProductsService } from './../../../core/services/products.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
 


@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  cartId!:string;

  _ProductsService =inject(ProductsService);
  _ActivatedRoute =inject(ActivatedRoute);
  _Router= inject(Router);


  addressform = new FormGroup({
    phone: new FormControl(null,[Validators.required]),
    city: new FormControl(null,[Validators.required]),
    details: new FormControl(null,[Validators.required]),
  });

  onlinePayment(formData:any){

    let id =this._ActivatedRoute.snapshot.params?.['cartId'];
  if(formData.valid){
this._ProductsService.checkOut(id,formData.value).subscribe({
  next:(res)=>{
      console.log(res)
      location.href=res.session.url;
  },
  error:(err)=>{
    console.log(err)
  } 
})
  }
  }

}
