import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AuthService } from '../auth/auth.service';
import { IngresoEgresoService } from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as fromUIActions from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styleUrls: ['./ingreso-egreso.component.css'],
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  myForm!: FormGroup;
  tipo = 'ingreso';

  loadingSubs: Subscription = new Subscription();
 loading: boolean = false;

  constructor(public ingresoEgresoService: IngresoEgresoService
    ,private _store: Store<AppState>
    ) {}

  ngOnInit(){

    this.loadingSubs =
    this._store.select('ui').subscribe(ui=> this.loading= ui.isLoading);
   
    this.myForm = new FormGroup({
      description: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0)),
    });
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe()
  }

  newIngresoEgreso() {

    this._store.dispatch(fromUIActions.ACTIVAR_LOADING());

    const ingresoEgreso = new IngresoEgreso({
      ...this.myForm.value,
      tipo: this.tipo,
    });

    this.ingresoEgresoService
      .newEgresoIngreso(ingresoEgreso)
      .then(() => {

        Swal.fire(
          {
            title: 'Success!',
            text: ingresoEgreso.description,
            icon: 'success',
            confirmButtonText: 'Ok',
          }
        );

        this.myForm.reset({
          monto: 0,
        });
        this._store.dispatch(fromUIActions.DESACTIVAR_LOADING());
      
      })
      .catch((err) => {
        this._store.dispatch(fromUIActions.DESACTIVAR_LOADING());
        console.log(err)});

      
  }
}
