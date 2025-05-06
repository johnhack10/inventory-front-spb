import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from "../../shared/components/sidenav/sidenav.component";
import { CategoryModule } from '../../category/category.module';
import { ProductModule } from '../../product/product.module';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidenavComponent, CategoryModule, ProductModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
