import { Component, OnInit, Input } from '@angular/core';
import { ShoppingCart } from 'app/models/shopping-cart';
import { ShoppingCartService } from 'app/services/firebaseCart/shopping-cart.service';
import { Observable } from 'rxjs';
// import { Order } from 'src/app/models/order';
// import { OrderService } from 'src/app/services/firebaseOrder/order.service';
// import { Shipping } from 'src/app/models/shipping';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(
    private shoppingCartService: ShoppingCartService,
    ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
  }
}
