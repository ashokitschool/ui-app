import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../common/product-category';
import { ProductService } from '../services/product.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-category-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css'
})
export class ProductCategoryMenuComponent implements OnInit{

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.listProductCategories();
  }


  listProductCategories(){
    this.productService.getProductCategories().subscribe(data => {
        this.productCategories = data;
    })
  }

}
