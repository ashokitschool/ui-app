import { Component, OnInit } from '@angular/core';
import { Product } from '../common/product';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { CartItem } from '../common/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{

  product: Product = new Product(
    1,
    'SKU001',
    'Sample Product',
    'This is a sample product description.',
    10.99,
    'https://example.com/sample-product.jpg',
    true,
    100,
    new Date('2024-06-24'), // Example date
    new Date('2024-06-24')  // Example date
);

  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe( () => {
      this.handleProductDetails();
    })
  }

  handleProductDetails(){
    const theProductId: number = +this.route.snapshot.paramMap.get('id')!;
    this.productService.getProduct(theProductId).subscribe(data => {
        console.log(data);
        this.product = data;
    })
  }

  handleAddToCartBtn(theProduct: Product){
    const theCartItem = new CartItem(theProduct.id!, theProduct.name!, theProduct.imageUrl!, theProduct.unitPrice!);
    this.cartService.addToCart(theCartItem);
  }

}
