import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const FeedActions = createActionGroup({
  source: 'Feed',
  events: {
    'Add Feed':emptyProps,
    'Remove Feed': props<{ id: {} }>(),
  }
});

export const FeedApiActions = createActionGroup({
  source: 'Feed API',
  events: {
    'Add Feed Success': props<{ data: any[] }>(),
  },
});
