import { ActionReducerMap } from '@ngrx/store';
import * as fromUIReducer from './shared/ui.reducer';
import * as fromAuthReducer from './auth/auth.reducer';
import * as fromIgresoEgresoReducer from './ingreso-egreso/ingreso-egreso.reducer';

export interface AppState {
    ui: fromUIReducer.State;
    auth: fromAuthReducer.AuthState,
   /*  ingresoEgreso: fromIgresoEgresoReducer.IngresoEgresoState
 */
}

export const APP_REDUCERS: ActionReducerMap<AppState> = {
    ui: fromUIReducer.reducer,
    auth: fromAuthReducer.reducer,
   /*  ingresoEgreso: fromIgresoEgresoReducer.reducer */
};