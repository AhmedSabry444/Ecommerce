import { ToastrService } from 'ngx-toastr';
import { CartData, Product } from '../../../shared/interfaces/product';
import { ProductsService } from './../../../core/services/products.service';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
[x: string]: any;

  _ProductsService=inject(ProductsService)
  cartData:any;
  products!:CartData[];
    _ToastrService=inject(ToastrService)
  

  ngOnInit(): void {
      this._ProductsService.getLoggedUserCart().subscribe({
        next:(resp)=>{
          console.log(resp)
          this.cartData=resp;
          this.products=resp.data.products;
        },
        error:(err)=>{
          console.log(err)
        },
      })
  }
  
  updateQuantity(count:any,id:any){
this._ProductsService.updateItem(count,id).subscribe({
  next:(res)=>{
      console.log(res)
      this.cartData=res;
      this.products=res.data.products;
      this._ToastrService.success('Count Updated')
  },
  error:(err)=>{
    console.log(err)
  }
})
  }

  removeItem(id:any){
    this._ProductsService.removeItem(id).subscribe({
      next:(resp)=>{
        console.log(resp)
        this.cartData=resp;
        this.products=resp.data.products;
        this._ToastrService.error('Item Removed From Cart')
      },
      error:(err)=>{
        console.log(err)
      },
    })
  }
}
