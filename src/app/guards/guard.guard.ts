import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

export const guardGuard: CanMatchFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router)
  //tap se ejecuta para opciones secundarias
  return authService.isAuth().pipe(
    tap( state =>{
      if(!state) router.navigate(['/login'])
    })
  );
};
