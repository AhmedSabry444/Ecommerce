import { Routes } from '@angular/router';
import { HomeComponent } from './features/components/home/home.component';
import { CartComponent } from './features/components/cart/cart.component';
import { CategoriesComponent } from './features/components/categories/categories.component';
import { BrandsComponent } from './features/components/brands/brands.component';
import { ProductsComponent } from './features/components/products/products.component';
import { LoginComponent } from './features/components/login/login.component';
import { RegisterComponent } from './features/components/register/register.component';
import { NotfoundComponent } from './features/components/notfound/notfound.component';
import { authGuard } from './core/guards/auth/auth.guard';
import {notLoginGuard} from './core/guards/auth/notlogin.guard';
import { SingleProductComponent } from './features/components/single-product/single-product.component';
import { CheckoutComponent } from './features/components/checkout/checkout.component';
import { ForgetpasswordComponent } from './features/components/forgetpassword/forgetpassword.component';
import { WishlistComponent } from './features/components/wishlist/wishlist.component';


export const routes: Routes = [
    {path:'', redirectTo:'/home', pathMatch:'full'},
    {path:'checkout/:cartId',component:CheckoutComponent , title:'checkout', canActivate:[authGuard]},
    {path:'single/:pid',component:SingleProductComponent , title:'single-product', canActivate:[authGuard]},
    {path:'forgetpassword', component:ForgetpasswordComponent , title:'forgetpassword',},
    {path:'home', component:HomeComponent , title:'home', canActivate:[authGuard]},
    {path:'wishlist', component:WishlistComponent , title:'wishlist', canActivate:[authGuard]},
    {path:'cart', component:CartComponent , title:'cart' ,canActivate:[authGuard]},
    {path:'categories', component:CategoriesComponent , title:'categories' ,canActivate:[authGuard]},
    {path:'brands', component:BrandsComponent , title:'brands' ,canActivate:[authGuard]},
    {path:'products', component:ProductsComponent , title:'products' ,canActivate:[authGuard]},
    
    {path:'login', component:LoginComponent , title:'login' ,canActivate:[notLoginGuard]},
    {path:'register', component:RegisterComponent , title:'register' ,canActivate:[notLoginGuard]},

    {path:'**', component:NotfoundComponent , title:'404 error'},
];
