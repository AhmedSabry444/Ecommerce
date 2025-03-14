import { Component, inject ,OnInit } from '@angular/core';
import {ActivatedRoute, Router}    from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../../../core/services/products.service';
import { Product,CartData } from '../../../shared/interfaces/product';
import { RouterLink } from '@angular/router';
import { CurrencyPipe} from '@angular/common';



@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent  {
  [x: string]: any;

  _ProductsService=inject(ProductsService)
  cartData:any;
  products!:CartData[];
    _ToastrService=inject(ToastrService)
  

  addProducttoWish(pId:any,token:any): void {
      this._ProductsService.addProductToWish(pId,token).subscribe({
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
