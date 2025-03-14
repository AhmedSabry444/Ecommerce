import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProducts():Observable<any>{
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/products')
  }

  getSpecificProduct(x:any):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${x}`)
  }

  addProductToCart(mytoken:any,pId:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{productId:pId},{
      headers : {
        token : mytoken
      } 
    })
  }
  addProductToWish(mytoken:any,pId:any):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId:pId},{
      headers : {
        token : mytoken
      } 
    })
  }

  getLoggedUserCart():Observable<any>{
    let mytoken:any;
    if(typeof localStorage!=='undefined'){
      mytoken = localStorage.getItem('token')
    }
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart',{
      headers:{
        token : mytoken
      }
    })
  }

updateItem(myCount:any,id:any):Observable<any>{
    let mytoken : any = localStorage.getItem('token')
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count:myCount},{
      headers:{
      token : mytoken
      },
    })
}

removeItem(id:any):Observable<any>{
  let mytoken : any = localStorage.getItem('token')
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
    headers:{
    token : mytoken
    },
  })
}


checkOut(cartId:any,addressData:any):Observable<any>{
  let mytoken : any = localStorage.getItem('token')
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:4200`,{
  shippingAddress:addressData},{ 
    headers:{
      token:mytoken
    }
  })

}

}

