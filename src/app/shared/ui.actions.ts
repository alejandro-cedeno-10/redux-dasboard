import { createAction, props } from '@ngrx/store';

export const ACTIVAR_LOADING = createAction('[UI Loading] Loading..');

export const DESACTIVAR_LOADING = createAction(
  '[UI Loading finish] Loading finish'
);

