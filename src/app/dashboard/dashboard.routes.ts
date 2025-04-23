import { Routes } from '@angular/router';
import DashboardComponent from './dashboard.component';
import { provideState } from '@ngrx/store';
import { ingresoEgresoReducer } from '../ngrx/ingreso-egreso.reducer';

export const routesDashboard: Routes = [
  {
    path: '',
    component: DashboardComponent,
    providers: [
      provideState('ingresosEgreso',ingresoEgresoReducer)
    ],
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
