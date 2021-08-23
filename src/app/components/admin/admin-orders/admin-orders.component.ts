import { Component, OnInit } from '@angular/core';
import { OrderService } from 'app/services/firebaseOrder/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders$;
  showingOrder: any;
  showingInfo: boolean = false;

  constructor( private orderService: OrderService) { 
    this.orders$ = this.orderService.getOrders();
  }

  expandOrder(event, order){
    //console.log(order);
    this.showingInfo = !this.showingInfo;
    this.showingOrder = order;
  }

  ngOnInit(): void {
  }

}
