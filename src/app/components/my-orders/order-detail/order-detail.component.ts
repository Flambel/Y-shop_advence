import { Component, OnInit, Input } from '@angular/core';
import { Order } from 'app/models/order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
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

  ngOnInit() {
  }

}
