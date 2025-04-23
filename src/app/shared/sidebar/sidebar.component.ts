import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngrx/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy{
  
  store= inject(Store<AppState>)
  authService= inject(AuthService);
  router = inject(Router);
  nombre:string = '';
  userSub!: Subscription;
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
  ngOnInit(): void {
    this.userSub =this.store.select('user').subscribe(({user}) =>{
      if(user.nombre){
        this.nombre = user.nombre;
      }
    })
  }
 
  logOut(){
    this.authService.logOut().then(()=>{
      this.router.navigate(['/login'])
    })
  }

}
