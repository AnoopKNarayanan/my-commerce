import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/models/product';
import * as ProductReducer from '../reducer/product.reducer';

export const selectProductState = createFeatureSelector<ProductReducer.ProductState>(
    ProductReducer.productFeatureKey
);

export const selectProducts = () => createSelector(
    selectProductState,
    (state: ProductReducer.ProductState) => {
        return state.products;
    }
);

export const selectProductsByFilter = (categories: String[], startArr: Array<number>, endArr: Array<number>, rating: number, keyword?: String) =>  createSelector(
    selectProductState,
    (state: ProductReducer.ProductState) => {
        //apply price filter
        let products: Array<Product> = new Array();
        startArr.forEach(function (value, i) {
            products.push(...state.products.filter(data => data.price >= value && data.price <= endArr[i]));
        });

        //apply rating filter
        products = products.filter(data => data.rating.rate >= rating);

        //apply category filter
        products = products.filter(data => categories.includes(data.category));

        //apply keyword search
        if(keyword) {
            products = products.filter(data => data.category.toLowerCase().includes(keyword.toLowerCase()) || 
                                        data.title.toLowerCase().includes(keyword.toLowerCase()) ||
                                        data.description.toLowerCase().includes(keyword.toLowerCase()));
        }

        return products;
    }
);

export const selectProductById = (id: number) => createSelector(
    selectProductState,
    (state: any) => {
        return state.products.find((product: Product) => product.id == id);
    }
);

