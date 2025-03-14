import { Product } from './../../../shared/interfaces/product';
import { Component, inject ,OnInit } from '@angular/core';
import { ProductsService } from '../../../core/services/products.service';
import {ActivatedRoute}    from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-single-product',
  imports: [],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.scss'
})
export class SingleProductComponent implements OnInit {

  _ProductsService = inject(ProductsService);
  _ToastrService=inject(ToastrService)
  _ActivatedRoute= inject (ActivatedRoute);
  productdetails !: Product;
  
  ngOnInit(): void {
    let productId = this._ActivatedRoute.snapshot.params?.['pid'];
      this._ProductsService.getSpecificProduct(productId).subscribe({
        next:(res)=>{
          this.productdetails=res.data;
        },
        error:()=>{}
      })
  }
  addToCart(id:any){
    let mytoken = localStorage.getItem('token');
    this._ProductsService.addProductToCart(mytoken,id).subscribe({
      next:(resp)=>{
        console.log(resp)
        this._ToastrService.success('Item Add To Cart')
      },
      error:(err)=>{
        console.log(err)
      }
    }
    )
  }
}
