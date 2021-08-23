import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'app/models/shopping-cart';
import { ShoppingCartService } from 'app/services/firebaseCart/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
cart$: Observable<ShoppingCart>;
data: boolean = false;

  constructor(private shoppingCartService: ShoppingCartService) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    if (this.cart$) {
      this.data = true;
    }
  }

  clearCart(){
    this.shoppingCartService.clearCart();
  }

}
