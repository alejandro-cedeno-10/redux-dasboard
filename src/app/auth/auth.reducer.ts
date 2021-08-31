
import { Action, createReducer, on } from '@ngrx/store';
import * as fromAuthActions from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user : User
  }

  const initialState: AuthState = {
    user: {
        name: '',
        email : '',
        uid: ''
    }
  };


  const authReducer = createReducer(
    initialState,
    on(fromAuthActions.SET_USER, (state,{ user }) => ({
        ...state,
        user : user
    })),
    on(fromAuthActions.UNSET_USER, (state) => ({
      ...state,
      user: {email : '',
              name: '',
              uid: ''}
      }))
  );
  
  export function reducer(state: AuthState | undefined, action: Action) {
    return authReducer(state, action);
  }
  