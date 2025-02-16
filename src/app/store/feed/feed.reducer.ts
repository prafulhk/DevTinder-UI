import { createReducer, on } from '@ngrx/store';
import { FeedActions, FeedApiActions } from './feed.actions';

export const feedFeatureKey = 'feeds';

export interface FeedState {
  data: any;
}

export const initialState: FeedState = {
  data:[]
};


export const feedReducer = createReducer(
  initialState,

  // on(FeedActions.addFeed, (state, data) => ({
  //   ...state,
  //   feeds: [...state.feeds, data]
  // })),

  on(FeedApiActions.addFeedSuccess, (state, { data }) => ({
    ...state,
    data
  })),

  on(FeedActions.removeFeed, (state, { id }) => ({
    ...state,
    feeds: state?.data.filter((feed: { _id: {}; }) => feed._id !== id)
  })),
);

