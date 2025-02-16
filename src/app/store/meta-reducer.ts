import { ActionReducer, MetaReducer } from '@ngrx/store';
import { LogoutActions } from './user/user.actions'; // Replace with your logout action path

export function clearStateMetaReducer<State>(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    // If the logout action is dispatched, reset state
    if (action.type === LogoutActions.logoutUser.type) {
      state = undefined;
    }
    return reducer(state, action);
  };
}

// Provide this meta-reducer in your StoreModule configuration
export const metaReducers: MetaReducer<any>[] = [clearStateMetaReducer];