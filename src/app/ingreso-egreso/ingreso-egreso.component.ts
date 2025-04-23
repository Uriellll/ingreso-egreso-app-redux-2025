import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgresoInterface } from '../interfaces/ingreso-egreso.interface';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../ngrx/app.reducer';
import * as ui from '../ngrx/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './ingreso-egreso.component.html',
  styleUrl: './ingreso-egreso.component.scss',
})
export default class IngresoEgresoComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  fb = inject(FormBuilder);
  tipo: string = 'ingreso';
  ingresoService = inject(IngresoEgresoService);
  store = inject(Store<AppState>);
  load: boolean = false;
  subscription!: Subscription;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });
    this.subscription = this.store.select('ui').subscribe(({ isLoading }) => {
      this.load = isLoading;
    });
  }
  save() {
    if (this.form.invalid) return;
    const ingresoEgr: IngresoEgresoInterface = {
      ...this.form.value,
      tipo: this.tipo,
    };
    this.store.dispatch(ui.isLoading());
    this.ingresoService
      .createIngresoEgreso(ingresoEgr)
      .then(() => {
        Swal.fire(
          'Registro Creado',
          this.form.get('descripcion')?.value,
          'success'
        );
        this.form.reset();
        this.store.dispatch(ui.stopLoading());
      })
      .catch((err) => {
        Swal.fire('Error', err.message, 'error');
        this.store.dispatch(ui.stopLoading());
      });
  }
}
