import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { ShoppingCart } from 'app/models/shopping-cart';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';
import {Product} from '../../models/products';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

   // Sirve para obtener el cart de cada usuario y pasarlo al componente del product.component.ts, Asi obtiene la cantidad de cada producto

   async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((x: any) => {
          const items = x.items;
          return new ShoppingCart(items);
        })
      )
  }

  public async addToCart(product: Product){
    this.updateItem(product,1);
   }
 
   public async removeFromCart(product: Product){
     this.updateItem(product,-1);
   }
 
  public async clearCart(){
   let cartId = await this.getOrCreateCartId();
   this.db.object('/shopping-carts/' + cartId + '/items').remove();
  }


  private create(){
   return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }


  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    //console.log(cartId);

    if (cartId)
      return cartId;
    
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


  private async updateItem(product: Product, change:number ){
    let cartId = await this.getOrCreateCartId();
    let item$ =  this.getItem(cartId, product.key);
    
    item$.valueChanges().pipe(take(1)).subscribe(
      i => {
      let quantity = ((i) ? i['quantity'] + change : 1);
      if (quantity === 0) item$.remove(); 
      else {
      item$.update({title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: quantity
        });
      }
      }
    )
  }


}
