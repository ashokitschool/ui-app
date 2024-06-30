import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../common/product';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CartItem } from '../common/cart-item';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-list-grid.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  constructor(private productService: ProductService,
             private cartService: CartService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }


  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.searchProductsWithKeyword();
    } else {
      this.loadProductsByCategory();
    }
  }

  loadProductsByCategory() {
    // check id param available in routed url
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = + this.route.snapshot.paramMap.get('id')!;
    } else {
      this.currentCategoryId = 1;
    }
    this.productService.getProductsByCategory(this.currentCategoryId).subscribe(data => {
      console.log(data);
      this.products = data;
    })
  }


  searchProductsWithKeyword() {
    const theKeyWord: string = this.route.snapshot.paramMap.get('keyword')!;
    this.productService.searchProducts(theKeyWord).subscribe(data => {
      this.products = data;
    })
  }

  handleAddToCartBtn(theProduct: Product){

    const theCartItem = new CartItem(theProduct.id!, theProduct.name!, theProduct.imageUrl!, theProduct.unitPrice!);
    this.cartService.addToCart(theCartItem);

  }

}
