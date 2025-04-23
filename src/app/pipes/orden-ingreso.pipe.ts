import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgresoInterface } from '../interfaces/ingreso-egreso.interface';

@Pipe({
  name: 'ordenIngreso',
  standalone: true
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgresoInterface[]): IngresoEgresoInterface[] {
    return items.slice().sort((a,b) =>{
      if(a.tipo === 'ingreso'){
        return -1;
      }else{
        return 1;
      }
    });
  }

}
