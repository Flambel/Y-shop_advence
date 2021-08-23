import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'app/services/firebaseOrder/order.service';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$: Observable<any[]>;
  userId: string;
  // button for showing extra content
  showingOrder: any;
  showingInfo: boolean = false;
  // order:any;
  // orderId: string; 

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {
    authService.user$.subscribe(
      u => {
        this.userId = u.uid;
        this.orders$ = orderService.getOrdersByUser(this.userId);
      });
      
  }

  expandOrder(event, order){
    //console.log(order);
    this.showingInfo = !this.showingInfo;
    this.showingOrder = order;
  }

   async ngOnInit() {
  //  this.order = await this.orderService.getOrderId(this.orderId);
  //  this.orders$ = await this.orderService.getOrderId(this.orderId);
  }
}
