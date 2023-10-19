import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as ProductActions from '../store/action/product.actions';
import * as ProductSelector from '../store/selector/product.selectors';
import { Observable } from 'rxjs';
import { Category, Product, Range } from '../models/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  productDetails$!: Observable<Product>;
  categories: Array<Category> = new Array();
  priceRanges: Array<Range> = new Array();
  selRating: number = 1;

  constructor(private route: ActivatedRoute, private store: Store, private router: Router){

  }
  
  ngOnInit(): void {
    var productId = this.route.snapshot.params['id'];
    // this.route.queryParams.subscribe((params: any) => {
    //   if(params && (params.categories || params.priceRanges || params.selRating)){
    //     if(params.categories)
    //       this.categories = JSON.parse(params.categories);
    //     if(params.priceRanges)
    //       this.priceRanges= JSON.parse(params.priceRanges);
    //     if(params.selRating)
    //       this.selRating = JSON.parse(params.selRating);
    //   }        
    // });
    this.store.dispatch(ProductActions.loadProducts());
    this.productDetails$ = this.store.pipe(select(ProductSelector.selectProductById(productId)));
    this.store.dispatch(ProductActions.loadProductDetails({id: productId}));
  }

  goBack(){
    this.router.navigate(['/products'], { queryParams: { categories: JSON.stringify(this.categories), priceRanges: JSON.stringify(this.priceRanges), selRating: JSON.stringify(this.selRating) } });
  }

}
