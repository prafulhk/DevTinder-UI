import { createFeatureSelector, createSelector } from '@ngrx/store';
import { recievedRequestsState } from './requests.reducer';

export const selectAllRecievedRequest = createFeatureSelector<recievedRequestsState>('recievedRequests');

export const selectAllRequests = createSelector(
    selectAllRecievedRequest,
  (state) => {
    return state?.requests;
  }
);

export const selectConnections = createSelector(
  selectAllRecievedRequest,
(state) => {
  return state?.connections;
}
);
