import { Routes } from '@angular/router';
import { guardGuard } from './guards/guard.guard';

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
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.routesDashboard),
    canMatch: [guardGuard]
  },
  { path: '**', redirectTo: '' },
];
