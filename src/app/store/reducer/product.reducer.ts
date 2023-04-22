import { EntityState, createEntityAdapter, EntityAdapter } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import * as ProductActions from '../action/product.actions';


export const productFeatureKey = 'product';

export interface ProductState {
  products: Product[];
}

export const initialState: ProductState = {
  products: []
}

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, action) => {
    return {
      ...state,
      products: action.products
    }
  }
),
  on(ProductActions.loadProductsFailure, (state, action) => {
      return {
        ...state,
        error: action.error
      }
    }
  )
);
