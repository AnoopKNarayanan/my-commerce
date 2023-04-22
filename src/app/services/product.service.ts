import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  
  /**
   * This function is used to make http call to API for fetching list of Products
   * @param url API URL
   */
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products');
  }

  getAllCategories(): Observable<Array<String>> {
    return this.http.get<Array<String>>('https://fakestoreapi.com/products/categories');
  }

  getByCategory(category: String): Observable<Product[]> {
    return this.http.get<Product[]>('https://fakestoreapi.com/products/category/' + category);
  }

}
