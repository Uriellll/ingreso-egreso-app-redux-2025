import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app.reducer';
import * as ui from '../../ngrx/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent implements OnInit, OnDestroy {
  
  fb = inject(FormBuilder);
  form!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);
  store = inject(Store<AppState>);
  subs!: Subscription;
  cargando:boolean = false;
  ngOnInit(): void {
    this.form = this.fb.group({
      usuario: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
    this.subs =this.store.select('ui').subscribe(ui =>{
      this.cargando = ui.isLoading;
    })
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
  login() {
    if (this.form.invalid) return;
    this.store.dispatch(ui.isLoading())
    const { usuario, password } = this.form.value;
    this.authService
      .signIn(usuario, password)
      .then((value) => {
        this.store.dispatch(ui.stopLoading())
        this.router.navigate(['/']);
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading())
        Swal.fire({
          icon: 'error',
          title: 'Error...',
          text: err.message,
        });
      });
  }
}
