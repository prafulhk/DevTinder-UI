import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userState } from './user.reducer';

export const userFeature = createFeatureSelector<userState>('userDetails');

export const loggedInUser = createSelector(
    userFeature,
  (state) => state ?? []
);

export const selectUserError = createSelector(
  userFeature,
  (state: userState) => state.error
);