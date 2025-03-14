import { AuthonService } from './../../services/authon/authon.service';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import {jwtDecode}  from 'jwt-decode';



@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
_AuthonService = inject(AuthonService);
_Router = inject(Router);

enableNavbar : boolean = false;

ngOnInit(): void{

  this._AuthonService.isLogin.subscribe((val)=>{
    this.enableNavbar=val;
  })

  this._AuthonService.userName.subscribe((value)=>{
this.loggedUserName=value;
  })

}

signOut(){
  localStorage.removeItem('token')
  this._AuthonService.isLogin.next(false);
  this._Router.navigate(['/login'])
}
loggedUserName:string='';


}
