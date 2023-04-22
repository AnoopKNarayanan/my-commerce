import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Category } from '../models/product';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  categories: Array<Category> = new Array();
  selCategory: Category = new Category();

  constructor(private productService: ProductService, private router: Router, public nav: NavbarService) {

  }

  ngOnInit(): void {
    this.productService.getAllCategories().subscribe(res => {
      res.forEach(category => {
        this.categories.push({category: category, checked: false});
      });
    });
  }

  onCategorySelect(category: String) {
    let categories = JSON.parse(JSON.stringify(this.categories));
    let catIndex = categories.findIndex((cat: { category: String; }) => cat.category == category);
    categories[catIndex].checked = true;
    this.router.navigate(['/products'], { queryParams: { categories: JSON.stringify(categories) } });
  }

}
