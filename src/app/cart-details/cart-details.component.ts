import { Component, OnInit } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css'
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService){

  }

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails(){
    this.cartItems = this.cartService.cartItems;
    console.log(this.cartItems);

    this.cartService.totalPrice.subscribe(data => {
      this.totalPrice = data;
    })

    this.cartService.totalQuantity.subscribe(data => {
      this.totalQuantity = data;
    })

    this.cartService.computeCartTotals();

  }

}
