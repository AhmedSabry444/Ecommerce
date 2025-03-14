import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../shared/interfaces/product';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products:Product[],searchWord:string): Product[] {
    return products.filter((product)=>{return product.title.toLowerCase().includes(searchWord.toLowerCase())});
  }

}
