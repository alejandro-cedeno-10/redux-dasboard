import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../auth/auth.service';
import { IngresoEgreso } from './ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators';
import * as fromIngresoEgresoActions from './ingreso-egreso.actions';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class IngresoEgresoService {


  ingresoEgresoListenerSubscription: Subscription = new Subscription();
  ingresoEgresoItemsSubscription: Subscription = new Subscription();


  constructor(
    private _angularFireStore: AngularFirestore,
    private _autService: AuthService,
    private _store: Store<AppState>
  ) {}

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubscription =  this._store
      .select('auth')
      .pipe(filter((auth) => auth.user.uid != ''))
      .subscribe((auth) => {
        this.ingresoEgresoItems(auth.user.uid);
      });
  }

  private ingresoEgresoItems(uid: string) {
   
    this.ingresoEgresoItemsSubscription = this._angularFireStore
      .collection(`${uid}/ingreso-egresos/items`)
      .snapshotChanges()
      .pipe(
        map((docData) => {
          return docData.map((doc) => {
            return {
              uid: doc.payload.doc.id,
              data: doc.payload.doc.data()
            };
          });
        }),

      )
      .subscribe((collection: any[]) => {
       const INGRESO_EGRESO : IngresoEgreso[] = collection.map( doc =>{
          return {
            uid : doc.uid,
            description: doc.data.description,
            monto : doc.data.monto,
            tipo: doc.data.tipo
          }
        })
       this._store.dispatch(fromIngresoEgresoActions
        .SET_ITEMS({items: INGRESO_EGRESO})) 
      });
  }

  newEgresoIngreso(ingresoEgreso: IngresoEgreso) {
    const user = this._autService.getUser();

    return this._angularFireStore
      .doc(`${user.uid}/ingreso-egresos`)
      .collection('items')
      .add({ ...ingresoEgreso });
  }

  cancelarSubscription(){
    this.ingresoEgresoListenerSubscription.unsubscribe();
    this.ingresoEgresoItemsSubscription.unsubscribe();

    this._store.dispatch(fromIngresoEgresoActions.UNSET_ITEMS())
  }

  deleteEngresoIngreso(uid: string){
    const user = this._autService.getUser();

    return this._angularFireStore.doc(`${user.uid}/ingreso-egresos/items/${uid}`)
    .delete();

  }
}
