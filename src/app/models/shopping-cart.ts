import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './products';

export class ShoppingCart{
   // items: ShoppingCartItem[] = []; 
   items: ShoppingCartItem[] = []; 

   constructor(private itemsMap: { [producId:string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
       for(const productId in itemsMap) {
           let item = itemsMap[productId];

            this.items.push(new ShoppingCartItem({...item, key: productId}));
        }
    }
/*
    get productIDs(){
        return Object.keys(this.items);
    }
*/

getQuantity(product: Product){
    //console.log( product);
    let item = this.itemsMap[product.key];
    return item ? item.quantity: 0 ;
  }

get totalPrice(){
        let sum = 0; 
        for (const productId in this.items)
           sum= sum + this.items[productId].subTotalPrice
        return sum; 
}

    get totalItemsCount(){
        let count = 0;
        for (const productId in this.items){
        count = count + this.items[productId].quantity;
        }
        return count;
    }
 }