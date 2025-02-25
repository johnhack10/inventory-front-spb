import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink, MatToolbarModule, MatMenuModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  mobileQuery: MediaQueryList;

  menuNav = [
    { name: "Home", route: "home", icon: "home" },
    { name: "Categorías", route: "category", icon: "category" },
    { name: "Productos", route: "product", icon: "production_quantity_limits" }
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }
}
