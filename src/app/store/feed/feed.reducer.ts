import { createReducer, on } from '@ngrx/store';
import { FeedActions, FeedApiActions } from './feed.actions';
import { Feed, Feeds } from '../../models/feeds.model';

export const feedFeatureKey = 'feeds';

export interface FeedState {
  data: Feeds[];
}

export const initialState: FeedState = {
  data:[]
};


export const feedReducer = createReducer(
  initialState,

  on(FeedApiActions.addFeedSuccess, (state, { data }) => ({
    ...state,
    data
  })),

  on(FeedActions.removeFeed, (state, { id }) => ({
    ...state,
    feeds: state?.data.filter((feed: { _id: {}; }) => feed._id !== id)
  })),
);

