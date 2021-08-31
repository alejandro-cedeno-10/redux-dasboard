import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import * as fromIngresoEgresoReducer from '../ingreso-egreso.reducer';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit, OnDestroy {

  items: IngresoEgreso[] = [];

  subscription : Subscription = new Subscription();

  constructor(private store: Store<fromIngresoEgresoReducer.IngresoEgresoChildrenState>, private _egresoIngresoService : IngresoEgresoService) { }
 

  ngOnInit(){
   this.subscription = this.store.select('ingresoEgreso')
   /*  .pipe(
      filter((ingresoEgreso) => ingresoEgreso.items.length != 0 )
    ) */.
    subscribe(
      ingresoEgreso => {
        const INGRESO_EGRESO: IngresoEgreso[] = ingresoEgreso.items;
        this.items = INGRESO_EGRESO;
      }
    )
  }

  deleteItem(item : IngresoEgreso){
    this._egresoIngresoService.deleteEngresoIngreso(item.uid!).then(
      ()=> 
      Swal.fire(
        {
          title: 'Item eliminado!',
          text: item.description,
          icon: 'success',
          confirmButtonText: 'Ok',
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
