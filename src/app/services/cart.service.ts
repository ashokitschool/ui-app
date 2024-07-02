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

    // check if we already have the item in our cart

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = new CartItem(0, "", "", 0);

    if(this.cartItems.length > 0){
      // find the item in the cart based on item id
      for(let tempCartItem of this.cartItems){
        if(tempCartItem.id === theCartItem.id){
          existingCartItem = tempCartItem;
          alreadyExistsInCart = true;
          break;
        }
      }
    }

    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }else{
      this.cartItems.push(theCartItem);
    }   

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

  decrementQuantity(theCartItem: CartItem){
    theCartItem.quantity--;

    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem){

    // get the index of the item in the array
    const itemIndex = this.cartItems.findIndex(tempCartItem => theCartItem.id === theCartItem.id);

    // if found, remove the item from the array at given index
    if(itemIndex > -1){
       this.cartItems.splice(itemIndex, 1);
       this.computeCartTotals();
    }
  }


}
