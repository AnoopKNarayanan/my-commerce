import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Category } from '../models/product';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';
import { Categories } from '../models/categories';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  // categories: Array<Category> = new Array();
  categories: Array<Categories> = new Array();
  selCategory: Category = new Category();

  constructor(private productService: ProductService, private router: Router, public nav: NavbarService) {

  }

  ngOnInit(): void {
    // this.productService.getAllCategories().subscribe(res => {
    //   res.forEach(category => {
    //     this.categories.push({category: category, checked: false});
    //   });
    // });
    this.productService.getCategories().subscribe(resp => {
      this.categories = resp.categories;
    });    
  }

  onCategorySelect(category: String) {
    // let categories = JSON.parse(JSON.stringify(this.categories));
    // let catIndex = categories.findIndex((cat: { category: String; }) => cat.category == category);
    // categories[catIndex].checked = true;
    this.router.navigate(['/products'], { queryParams: { category: category } });
  }

  show(sectionId: string) {
    var el = document.getElementById(sectionId);
    if(el){
      el.classList.add('flyout-container-visible');
    }
  }

  hide(sectionId: string) {
    var el = document.getElementById(sectionId);
    if(el){
      el.classList.remove('flyout-container-visible');
    }
  }

}
