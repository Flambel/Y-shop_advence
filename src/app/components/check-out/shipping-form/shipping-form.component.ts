import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ShoppingCart } from 'app/models/shopping-cart';
import { OrderService } from 'app/services/firebaseOrder/order.service';
import { AuthService } from 'app/services/auth.service';
import { Order } from 'app/models/order';
import { Shipping } from 'app/models/shipping';
import { NotificationService } from 'app/services/notification/notification.service';

@Component({
  selector: 'app-shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  // tslint:disable-next-line:no-input-rename
  @Input('cart') cart: ShoppingCart;
  userId: string;
  userSubscription: Subscription;
  shipping = new Shipping();

  constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router,
    private notification: NotificationService
  ) { }

  async placeOrder() {
    let order = new Order(this.userId, this.shipping, this.cart);
    let result = await this.orderService.placeOrder(order);
    this.notification.showNotification('top', 'center', 'success', 'fa fa-good',
    '\<b>Votre commande a été passé!\</b>\<br> Vous serez livré d\'ici peut', + result.key);
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
