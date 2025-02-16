import { createFeatureSelector, createSelector } from '@ngrx/store';
import { FeedState } from './feed.reducer';


export const selectFeedFeature = createFeatureSelector<FeedState>('feeds');

export const selectAllFeeds = createSelector(
  selectFeedFeature,
  (state) => state ?? []
);

