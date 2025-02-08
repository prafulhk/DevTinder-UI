import { LoginLogoutActions, LoginApiActions } from './login.actions';
import { createReducer, on } from '@ngrx/store';

export const loginFeatureKey = 'userDetails';

export const initialState: ReadonlyArray<any> = [{ emailId: 'prafulkusugal1@gmail.com', password: 'Pradhaani@1' }];

export const loginReducer = createReducer(
  initialState,
  on(LoginApiActions.addUserSuccess, (_state, { data }) => data),

  // on(LoginApiActions.addUserFailure, (_state, { error }) => ({
  //   ..._state,
  //   error: error
  // })),

  on(LoginLogoutActions.addUser, (state, data) => {
    return [...state, data];
  }),

  on(LoginLogoutActions.removeUser, (state, data) => {
    return [];
  }),
);
