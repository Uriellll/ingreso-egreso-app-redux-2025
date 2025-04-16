import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { AppState } from '../../ngrx/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as ui from '../../ngrx/ui.actions';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export default class RegisterComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
  formGroup!: FormGroup;
  formBuilder = inject(FormBuilder);
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store<AppState>)
  sub!: Subscription;
  load: boolean = false;
  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.sub =this.store.select('ui').subscribe(ui =>{
      this.load = ui.isLoading
    })
  }
  register() {
    if (this.formGroup.invalid) return;
    this.store.dispatch(ui.isLoading())
    const { nombre, correo, password } = this.formGroup.value;
   /*  Swal.fire({
      title: 'Cargando',
      didOpen: () => {
        Swal.showLoading();
      },
    }); */
    this.authService
      .createUser(nombre, correo, password)
      .then((credentials) => {
        this.store.dispatch(ui.stopLoading())
        /* Swal.close(); */
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err.message,
        });
      });
  }
}
