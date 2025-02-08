import { createFeatureSelector, createSelector } from '@ngrx/store';

export const loggedInUser = createFeatureSelector('userDetails');

export const selectLoginError = createSelector(
    loggedInUser,
    (state:any) => state.error
  );


// export const selectLoggedInUser = createSelector(
//     loggedInUser,
//     (data) => data
// );


// export const selectUser = (state: any) => state.user;

// // Selector to get the user's name
// export const selectUserName = createSelector(
//     selectUser,
//     (user) => user
// );