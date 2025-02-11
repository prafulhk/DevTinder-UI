import { createFeatureSelector, createSelector } from '@ngrx/store';

export const loggedInUser = createFeatureSelector('userDetails');

export const selectLoginError = createSelector(
    loggedInUser,
    (state:any) => state.error
  );

