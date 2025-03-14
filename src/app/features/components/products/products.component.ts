import { Component,inject,OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductsService } from '../../../core/services/products.service';
import { Product } from '../../../shared/interfaces/product';
import { LoaderComponent } from "../loader/loader.component";
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from "../../../core/pipe/search.pipe";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [LoaderComponent, RouterLink, SearchPipe,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductsService:ProductsService){}
  searchValue:string='';  
  isLoading : boolean = false;
    _ToastrService=inject(ToastrService)
  allProducts!:Product[];
  ngOnInit(): void {
    this.isLoading=true;
    this._ProductsService.getAllProducts().subscribe({
      next:(response)=>{
          console.log(response.data); 
          this.allProducts=response.data;
          this.isLoading=false;

      },
      error:(err)=>{
          console.log(err)
          this.isLoading=false;

      },
    });
}
addToCart(id:any){
  let mytoken = localStorage.getItem('token');
  this._ProductsService.addProductToCart(mytoken,id).subscribe({
    next:(resp)=>{
      console.log(resp)
      this._ToastrService.success('Add To Cart')
    },
    error:(err)=>{
      console.log(err)
    }
  }
  )
}
}
