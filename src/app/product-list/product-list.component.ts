import { Component, OnInit } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { Category, Range, Product, PriceArr } from '../models/product';
import { ProductService } from '../services/product.service';
import { select, Store } from '@ngrx/store';
import * as ProductActions from '../store/action/product.actions';
import * as ProductSelector from '../store/selector/product.selectors';
import { LoadingService } from '../services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  productList$!: Observable<Product[]>;
  categories: Array<Category> = new Array();
  collapseCat: Boolean = true;
  collapsePrice: Boolean = true;
  collapseRating: Boolean = true;
  priceRanges: Array<Range> = new Array();
  ratings: Array<Range> = new Array();
  selRating: number = 1;
  loading$ = this.loadingService.loading$;
  reRoute: Boolean = false;
  selCategory: String = '';
  keyword: String = '';

  constructor(private productService: ProductService, private store: Store, private loadingService: LoadingService, private route: ActivatedRoute, private router: Router, private nav: NavbarService) {
    this.priceRanges.push(
      {start: 0, end: 50, checked: true}, 
      {start: 50, end: 100, checked: true}, 
      {start: 100, end: 200, checked: true}, 
      {start: 200, end: 10000, checked: true}
    );

    this.ratings.push(
      {start: 1, end: 5, checked: true}, 
      {start: 2, end: 5, checked: false}, 
      {start: 3, end: 5, checked: false}, 
      {start: 4, end: 5, checked: false}, 
      {start: 5, end: 5, checked: false}
    )
  }

  ngOnInit(): void {
    this.nav.hide();
    this.store.dispatch(ProductActions.loadProducts());
    this.productList$ = this.store.pipe(select(ProductSelector.selectProducts()));
    this.route.queryParams.subscribe((params: any) => {
      if(params && params.category){
        if(params.category)
          this.selCategory = params.category;
          //this.categories = JSON.parse(params.categories);
      }       
    });
  }

  onRatings(rating: number) {
    this.ratings.forEach(range => {
      if(range.start != rating){
        range.checked = false;
      }
    });
    this.onFilter();
  }

  onFilter() {
    let categories = this.onCategoryChange();
    let priceArr = this.onPriceChange();
    this.productList$ = this.store.pipe(select(ProductSelector.selectProductsByFilter(categories, priceArr.startArr, priceArr.endArr, this.selRating, this.keyword)));
  }

  onCategoryChange() {
    let categories: String[] = [];
    this.categories.forEach(cat => {
      if(cat.checked){
        categories.push(cat.category);
      }
    });
    return categories;
  }

  onPriceChange() {
    let priceArr: PriceArr = new PriceArr();
    let startArr: Array<number> = new Array();
    let endArr: Array<number> = new Array();
    this.priceRanges.forEach(range => {
      if(range.checked){
        startArr.push(range.start);
        endArr.push(range.end);
      }
    });

    startArr = startArr.sort(function(a, b) {
      return a - b;
    });
    endArr = endArr.sort(function(a, b) {
      return a - b;
    });
    priceArr.startArr = startArr;
    priceArr.endArr = endArr;
    return priceArr;
  }

  goToDetails(id: number) {
    // this.router.navigate(['/product/' + id], { queryParams: { categories: JSON.stringify(this.categories), priceRanges: JSON.stringify(this.priceRanges), selRating: JSON.stringify(this.selRating) } });
    this.router.navigate(['/product/' + id]);
  }

  onSearch(searchForm: any) {
    this.keyword = searchForm.form.controls.keyword.value;
    this.onFilter();
  }
}
