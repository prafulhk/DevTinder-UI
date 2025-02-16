import { createReducer, on } from '@ngrx/store';
import { ReceivedRequestActions, ReceivedRequestApiActions } from './requests.actions';

export const requestsFeatureKey = 'recievedRequests';

export interface recievedRequestsState {
  requests: any;
  connections:any
}

export const initialState: recievedRequestsState = {
  requests: { data: {} },
  connections: {  }
};


export const receivedRequestReducer = createReducer(
  initialState,

  // on(ReceivedRequestActions.addRecievedRequest, (state, data) => ({
  //   ...state,
  //   requests: {...state.requests, data}
  // })),

  on(ReceivedRequestApiActions.addReceivedRequestSuccess, (state, { data }) => ({
    ...state,
    requests: data
  })),

  on(ReceivedRequestActions.removeRecievedRequest, (state, { id }) => ({
    ...state,
    requests: { data: state.requests.data.filter((requests: { _id: {}; }) => requests._id !== id) }
  })),

  on(ReceivedRequestApiActions.addConnectionRequestSuccess, (state, { data }) => ({
    ...state,
    connections: data
  })),
);

