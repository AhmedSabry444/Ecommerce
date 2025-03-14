import { Component, OnInit } from '@angular/core';
import { Brands } from '../../../shared/interfaces/brands';
import { BrandsService } from '../../../core/services/brands.service';
import { LoaderComponent } from "../loader/loader.component";


@Component({
  selector: 'app-brands',
  imports: [LoaderComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit  {
  constructor(private _BrandsService:BrandsService){}
  allBrands!:Brands[];
  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(response)=>{
          console.log(response.data); 
          this.allBrands=response.data;
      },
      error:(err)=>{
          console.log(err)
      },
    });
}
}
