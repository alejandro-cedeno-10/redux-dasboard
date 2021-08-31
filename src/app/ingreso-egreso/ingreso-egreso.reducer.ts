
import { Action, createReducer, on } from '@ngrx/store';
import * as fromIngresoEgresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { AppState } from '../app.reducer';


export interface IngresoEgresoState {
    items : IngresoEgreso[];
  }

  export interface IngresoEgresoChildrenState extends AppState{
    ingresoEgreso: IngresoEgresoState;
  };

  const initialState: IngresoEgresoState = {
    items: []
  };


  const ingresoEgresoReducer = createReducer(
    initialState,
    on(fromIngresoEgresoActions.SET_ITEMS, (state,{ items }) => ({
        ...state,
        items: [
          ...items.map(item => {
            return {
              ...item
            };
          })
        ]
    })),

    on(fromIngresoEgresoActions.UNSET_ITEMS, (state) => ({
      ...state,
      items: []
  }))
  );
  
  export function reducer(state: IngresoEgresoState | undefined, action: Action) {
    return ingresoEgresoReducer(state, action);
  }
  