import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from './ingreso-egreso.model';

@Pipe({
  name: 'ordenIngresoEgreso'
})
export class OrdenIngresoEgresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    if(items.length == 0) return items
    const itemsForSort = [...items];
   return itemsForSort.sort( (item) =>{
     if(item.tipo ==='ingreso'){
       return -1;
     }else{
       return 1;
     }
   } )
  }

}
