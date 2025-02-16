import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const ReceivedRequestActions = createActionGroup({
  source: 'ReceivedRequest',
  events: {
    'Add RecievedRequest':emptyProps,
    'Remove RecievedRequest': props<{ id: {} }>(),
    'Add connectionRequest':emptyProps,
  }
});

export const ReceivedRequestApiActions = createActionGroup({
  source: 'ReceivedRequest API',
  events: {
    'Add ReceivedRequest Success': props<{ data: any[],isFromAPI: boolean }>(),
    'Add ConnectionRequest Success': props<{ data: any[],isFromAPI: boolean }>(),
  },
});
