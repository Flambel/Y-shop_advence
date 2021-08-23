import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'app/models/products';
import { ShoppingCart } from 'app/models/shopping-cart';
import { ShoppingCartService } from 'app/services/firebaseCart/shopping-cart.service';


@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('product') product: Product;
  // tslint:disable-next-line:no-input-rename
  @Input('shopping-cart') shoppingCart: ShoppingCart;
  
  constructor(private shoppingCartService : ShoppingCartService) { }

  addToCart(){
    this.shoppingCartService.addToCart(this.product);
  }

  ngOnInit(): void {
  }

}
