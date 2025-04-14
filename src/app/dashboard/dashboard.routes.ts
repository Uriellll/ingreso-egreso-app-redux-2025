import { Routes } from '@angular/router';
import DashboardComponent from './dashboard.component';

export const routesDashboard: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children:[
      {
        path: '',
        loadComponent: () => import('../ingreso-egreso/estadistica/estadistica.component'),
      },
      {
        path: 'ingreso-egreso',
        loadComponent: () => import('../ingreso-egreso/ingreso-egreso.component'),
      },
      {
        path: 'detalle',
        loadComponent: () => import('../ingreso-egreso/detalle/detalle.component'),
      },
    ]
  },
 
];
