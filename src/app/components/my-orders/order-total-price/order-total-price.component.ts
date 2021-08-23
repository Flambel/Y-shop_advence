import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'app/models/order';

@Component({
  selector: 'app-order-total-price',
  templateUrl: './order-total-price.component.html',
  styleUrls: ['./order-total-price.component.css']
})
export class OrderTotalPriceComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input("order") order: Order;
  constructor() { }

  getTotalOrderPrice(){
    let sum = 0; 
    if (this.order){
      this.order.items.forEach((item) => 
        sum= sum + item.totalPrice
        )
    } return sum; 
  }

  ngOnInit(): void {
  }

}
