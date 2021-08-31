import { state } from '@angular/animations';
import { Action, createReducer, on } from '@ngrx/store';
import * as fromUIActions from './ui.actions';

export interface State {
  isLoading: boolean;
}

const initialState: State = {
  isLoading: false,
};

const uiReducer = createReducer(
  initialState,
  on(fromUIActions.ACTIVAR_LOADING, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(fromUIActions.DESACTIVAR_LOADING, (state) => ({
    ...state,
    isLoading: false,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return uiReducer(state, action);
}
