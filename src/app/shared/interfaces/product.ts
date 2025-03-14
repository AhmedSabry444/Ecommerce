export interface Product {
sold: number;
images: string[];
    subcategory: Subcategory[];
ratingsQuantity: number;
    _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  priceAfterDiscount?: number;
  availableColors?: any[];
}

export interface CartProduct{
subcategory:Subcategory[];
  _id:string;
  quantity: number;
  title: string;
  imageCover: string;
  category: Category;
  brand: Category;
  ratingsAverage: number;
  id: string;
}

export interface CartData{
  product:CartProduct;
  _id:string;
  price: number;
  count:number;
}
export interface Category {
_id: string;
name: string;
slug: string;
image: string;
}

export interface Subcategory {
_id: string;
name: string;
slug: string;
category: string;
}



