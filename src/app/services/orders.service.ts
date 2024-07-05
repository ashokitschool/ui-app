import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistory } from '../common/order-history';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  private orderUrl = 'http://localhost:8080/api/orders'

  constructor(private httpClient: HttpClient) { }

  getCustomerOrders(theEmailId: string): Observable<GetOrdersHistory>{
    const apiUrl  = `${this.orderUrl}/search/findByCustomerEmail?email=${theEmailId}`;
    return this.httpClient.get<GetOrdersHistory>(apiUrl);
  }
}

interface GetOrdersHistory{
    _embedded:{
      orders: OrderHistory[];
    }
}
