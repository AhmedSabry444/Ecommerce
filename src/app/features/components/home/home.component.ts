import { AuthonService } from './../../../core/services/authon/authon.service';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../shared/interfaces/product';
import { LoaderComponent } from "../loader/loader.component";
import { CategoriesService } from '../../../core/services/categories.service';
import { Categories } from '../../../shared/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';
import { OnsalePipe } from "../../../core/pipe/onsale.pipe";
import { SearchPipe } from "../../../core/pipe/search.pipe";
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [LoaderComponent, CarouselModule, RouterLink, CurrencyPipe, SearchPipe, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(private _ProductsService:ProductsService,private _CategoriesService:CategoriesService){}

  _AuthonService = inject(AuthonService)
  _ToastrService=inject(ToastrService)
  allProducts!:Product[];
  productdetails !: Product;
  searchValue:string='';  
  isLoading : boolean = false;
    allCategories!:Categories[];
    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
        0: {
          items: 1
        },
        400: {
          items: 2
        },
        740: {
          items: 3
        },
        940: {
          items: 7
        }
      },
      nav: true
    };


  ngOnInit(): void {
    this.isLoading=true;
    this._ProductsService.getAllProducts().subscribe({
      next:(response)=>{
          console.log(response.data); 
          this.allProducts=response.data;
          this.isLoading=false;
      },
      error:(err)=>{
          console.log(err);
          this._ToastrService.error(err.message)
          this.isLoading=false;
      },
    });
    this._CategoriesService.getAllCategories().subscribe({
      next:(response)=>{
          console.log(response.data); 
          this.allCategories=response.data;
      },
      error:(err)=>{
          console.log(err)
      },
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
    addToWish(id:any){
      let mytoken = localStorage.getItem('token');
      this._ProductsService.addProductToWish(mytoken,id).subscribe({
        next:(resp)=>{
          console.log(resp)
          this._ToastrService.success('Item Add To WishList')
        },
        error:(err)=>{
          console.log(err)
        }
      }
      )
    }
  }
  
