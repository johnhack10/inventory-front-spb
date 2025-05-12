import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { NgFor } from '@angular/common';
import { MediaMatcher } from '@angular/cdk/layout';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterOutlet, NgFor, RouterLink, MatToolbarModule, MatMenuModule, MatSidenavModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {
  mobileQuery: MediaQueryList;
  private readonly keycloakService = inject(KeycloakService);
  username: any;

  menuNav = [
    { name: "Home", route: "home", icon: "home" },
    { name: "Categorías", route: "category", icon: "category" },
    { name: "Productos", route: "product", icon: "production_quantity_limits" }
  ]

  ngOnInit(): void {
     this.username = this.keycloakService.getUsername();
  }

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
  }

  logout() {
    this.keycloakService.logout();
  }
}
