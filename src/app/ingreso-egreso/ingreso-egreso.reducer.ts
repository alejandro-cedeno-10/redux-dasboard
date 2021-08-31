
import { Action, createReducer, on } from '@ngrx/store';
import * as fromIngresoEgresoActions from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';


export interface IngresoEgresoState {
    items : IngresoEgreso[];
  }

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
  