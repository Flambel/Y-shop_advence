import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'app/models/products';
import { ShoppingCartService } from 'app/services/firebaseCart/shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart;

  constructor(private shoppingCartService : ShoppingCartService) { }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);
  }

  removeFromCart(){
    this.shoppingCartService.removeFromCart(this.product);
  }

  ngOnInit(): void {
  }

}
