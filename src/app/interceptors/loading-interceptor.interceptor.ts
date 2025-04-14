import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';
import Swal from 'sweetalert2';

export const loadingInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  Swal.fire({
    title: 'Cargando',
    didOpen: () => {
      Swal.showLoading();
    },
  });
  return next(req).pipe(
    finalize(() =>Swal.close())
  )
};
