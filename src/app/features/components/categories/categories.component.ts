import { Categories } from './../../../shared/interfaces/categories';
import { CategoriesService } from './../../../core/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderComponent } from "../loader/loader.component";


@Component({
  selector: 'app-categories',
  imports: [LoaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  constructor(private _CategoriesService:CategoriesService){}

  allCategories!:Categories[];

  ngOnInit(): void {
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
  }





