import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit{

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService){ }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  updateCartStatus(){
    this.cartService.totalPrice.subscribe(data => {
        this.totalPrice = data;
    })

    this.cartService.totalQuantity.subscribe(data => {
        this.totalQuantity = data;
    })
  }
}
