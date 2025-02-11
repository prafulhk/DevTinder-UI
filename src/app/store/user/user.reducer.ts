import { createReducer, on } from '@ngrx/store';
import { ConnectionActions, ConnectionApiActions, UserActions, UserApiActions } from './user.actions';

export const loginFeatureKey = 'userDetails';

export const initialState: ReadonlyArray<any> = [{ emailId: 'virat@gmail.com', password: 'Pradhaani@1' }];

export const userReducer = createReducer(
  initialState,

  on(UserActions.addUser, (state, data) => {
    return [...state, data];
  }),

  on(UserActions.removeUser, (state, data) => {
    return [];
  }),

  on(UserApiActions.addUserSuccess, (_state, { data }) => data),

  on(UserApiActions.updateProfileSuccess, (_state, { data }) => data),

  on(ConnectionActions.addConnections, (state, data) => {
    return [...state, data];
  }),

  on(ConnectionApiActions.addConnectionsSuccess, (_state, { data }) => data),

);
