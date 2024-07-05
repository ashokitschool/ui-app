import { Component, OnInit } from '@angular/core';
import { OrderHistory } from '../common/order-history';
import { OrdersService } from '../services/orders.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit{

  orderHistoryList: OrderHistory[] = [];
  storage: Storage = sessionStorage;

  constructor(private orderService: OrdersService){}

  ngOnInit(): void {
    this.loadCustomerOrders();
  }

  loadCustomerOrders(){
    const theEmailId = this.storage.getItem('customerEmail');
    this.orderService.getCustomerOrders(theEmailId!).subscribe(data => {
        this.orderHistoryList = data._embedded.orders;
        console.log(this.orderHistoryList);
    });
  }

}
