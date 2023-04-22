import { createAction, props } from '@ngrx/store';
import { Product } from 'src/app/models/product';

export const loadProducts = createAction(
  '[Product] Load Products'
);

export const loadProductsSuccess = createAction(
  '[Product Effect] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product Effect] Load Products Failure',
  props<{ error: string }>()
);

export const loadProductDetails = createAction(
  '[Product Details Effect] Load Product Details',
  props<{ id: number }>()
);




