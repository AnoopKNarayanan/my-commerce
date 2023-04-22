import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import * as ProductReducer from '../store/reducer/product.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  [ProductReducer.productFeatureKey]: ProductReducer.productReducer
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
