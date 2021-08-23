import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { ShoppingCartService } from '../firebaseCart/shopping-cart.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private db: AngularFireDatabase,
    private shoppingCartService: ShoppingCartService
  ) { }

  getOrders() {
    return this.db.list('/orders').valueChanges();
  }

  getOrderId(orderId: string){
    return this.db.object('/orders/' + orderId).snapshotChanges().pipe(
      map((order:any) => {
        if (order.payload.exists()){
          const data = order.payload.val();
          const key = order.payload.key;
          return {key, ...data};
        } else {
          return null;
        }
      }
    ))
  }
  
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', query =>
     query.orderByChild('userId').equalTo(userId))
      .valueChanges();
  }

  async placeOrder(order) {
    let result = await this.db.list('/orders').push(order);
    this.shoppingCartService.clearCart();
    return result;
  }

}

/*
  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref => ref.orderByChild('userId').equalTo(userId))
    .snapshotChanges()
      .pipe(map(
        changes => changes.map(
          c => {
            const data = c.payload.val() as {};
            const key = c.payload.key;
            return { key, ...data };
          })));
  }
*/





