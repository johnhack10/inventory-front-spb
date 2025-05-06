import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';


export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import ('./components/home/home.component').then((c) => c.HomeComponent),

      },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/home/home.component').then((c) => c.HomeComponent),
      },
      {
        path: 'category',
        loadComponent: () =>
          import('../category/components/category/category.component').then((c) => c.CategoryComponent),
      },
      {
        path: 'product',
        loadComponent: () =>
          import('../product/product/product.component').then((c) => c.ProductComponent),
      }
    ],
  },
];
