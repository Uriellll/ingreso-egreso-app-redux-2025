import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component'),
  },
  {
    path: 'registro',
    loadComponent: () => import('./auth/register/register.component'),
  },
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component'),
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.routesDashboard),
  },
  { path: '**', redirectTo: '' },
];
