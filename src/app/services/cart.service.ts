import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  constructor() { }

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  addToCart(theCartItem: CartItem){
    this.cartItems.push(theCartItem);

    // calculate cart totals (price & quantity)
    this.computeCartTotals();
  }

  computeCartTotals(){
     let totalPriceValue: number = 0;
     let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){

      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;

    }

    // publish new values so that all subscriber can recieve updated cart status data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

  }

}
