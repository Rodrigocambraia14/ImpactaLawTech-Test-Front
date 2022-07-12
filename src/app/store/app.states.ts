import { createFeatureSelector, MetaReducer } from '@ngrx/store';
import { hydrationMetaReducer } from './reducers/hydration.reducer';
import * as auth from './reducers/auth.reducer';
export interface AppState {
  authState: auth.State;
}

export const reducers: any = {
  auth: auth.reducer,
};

export const metaReducers: MetaReducer[] = [
  hydrationMetaReducer
]

export const selectAuthState = createFeatureSelector<AppState>('auth');
