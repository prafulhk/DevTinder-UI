import { createReducer, on } from '@ngrx/store';
import { UserActions, UserApiActions } from './user.actions';

export const loginFeatureKey = 'userDetails';


export interface userState {
  data?: any;
  error?: any;

}

export const initialState: userState = {
  data:null,
  error:null
};


export const userReducer = createReducer(
  initialState,

  // on(UserActions.addUser, (state, data) => {
  //   return {...state, data};
  // }),

  on(UserActions.removeUser, () => {
    return {};
  }),


  on(UserApiActions.addUserSuccess, (state, { data }) => ({
    ...state,
    data,
    error:null
  })),

  on(UserApiActions.addUserFailure, (state, { error }) => ({
    ...state,
    error
  })),

  on(UserApiActions.updateProfileSuccess, (state, { data }) => ({
    ...state,
    data,
    error: null
  })),

);
