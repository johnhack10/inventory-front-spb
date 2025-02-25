import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./modules/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)},
];
