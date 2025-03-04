import { Routes } from '@angular/router';

export const routesDashboard: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../ingreso-egreso/estadistica/estadistica.component'),
  },
  {
    path: 'ingreso-egreso',
    loadComponent: () => import('../ingreso-egreso/ingreso-egreso.component'),
  },
  {
    path: 'detalle',
    loadComponent: () => import('../ingreso-egreso/detalle/detalle.component'),
  },
];
