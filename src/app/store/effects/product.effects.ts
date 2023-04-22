import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';
import * as ProductActions from '../action/product.actions';


@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productservice: ProductService) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      mergeMap((action) => 
        this.productservice.getAllProducts().pipe(
          map(data => ProductActions.loadProductsSuccess({ products: data })),
          catchError(error => of(ProductActions.loadProductsFailure({ error })))
        )
      )
    );
  });
}
