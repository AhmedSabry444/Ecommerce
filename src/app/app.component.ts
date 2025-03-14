import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./core/layout/navbar/navbar.component";
import { HomeComponent } from "./features/components/home/home.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecom';
}
