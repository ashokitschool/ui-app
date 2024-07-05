import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private RAZORPAY_KEY = "";

  constructor() { }

  processPayment(orderId: string, amount: number, successCallback: (response: any)=> void): void {
    const options: any = {
        key: this.RAZORPAY_KEY,
        amount: amount,
        currency: 'INR',
        name: 'Ashok IT',
        description: 'e-commerce order',
        order_id: orderId,
        handler: successCallback,
        prefill: {
          name: 'Ashok IT',
          email: '',
          contact: ''
        },
        notes: {
          address: 'Customer Address'
        },
        theme:{
          "color" : "#3399cc"
        }
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  };



}
