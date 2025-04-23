import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app.reducer';
import { IngresoEgresoInterface } from '../../interfaces/ingreso-egreso.interface';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { OrdenIngresoPipe } from '../../pipes/orden-ingreso.pipe';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [CommonModule,  OrdenIngresoPipe],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.scss'
})
export default class DetalleComponent implements OnInit, OnDestroy {
  store = inject(Store<AppState>);
  ingresosEgresos: IngresoEgresoInterface[] = [];
  ingresoEgrSub!:Subscription;
  ingresoEgreService = inject(IngresoEgresoService);
  ngOnDestroy(): void {
    this.ingresoEgrSub.unsubscribe();
  }
  
  ngOnInit(): void {
    this.ingresoEgrSub = this.store.select('ingresosEgresos').subscribe(({items}) => this.ingresosEgresos = items)
  }
  delete(uid:string | ''){
    this.ingresoEgreService.borrarIngresoEgreso(uid).then(()=>{
      Swal.fire('Borrado', 'Item borrado', 'success')
    }).catch(err =>{
      Swal.fire('Error', err.message, 'error')
    })
  }

}
