import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { SidebarComponent } from '../shared/sidebar/sidebar.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import * as ingresoEgresoActions from '../ngrx/ingreso-egreso.actions';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NavbarComponent,SidebarComponent,FooterComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent implements OnInit, OnDestroy {
  store = inject(Store<Store>);
  userSub!: Subscription;
  ingreSub!:Subscription;
  ingresoEgresoService = inject(IngresoEgresoService);
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.ingreSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub =this.store.select('user')
    .pipe(filter(auth => auth.user.uid != null))
    .subscribe(res =>{
      this.ingreSub =  this.ingresoEgresoService.initIngresosEgresos(res.user.uid).subscribe(res =>{
        this.store.dispatch(ingresoEgresoActions.setItems({items: res}))
      })
    })

  }

}
