import { ShoppingCart } from './shopping-cart';

export interface IOrderItem {
  product: { imageUrl: string; price: number, title: string; };
  quantity: number;
  totalPrice: number;
}

export class Order{
  datePlaced:number;
  items: IOrderItem[];

  constructor (public userId:string, public shipping: any, shoppingCart: ShoppingCart){
    this.datePlaced = new Date().getTime();

   this. items =  shoppingCart.items.map(i => {
      return {
          product:{
              title: i.title,
              imageUrl: i.imageUrl,
              price: i.price
          },
          quantity: i.quantity,
          totalPrice: i.subTotalPrice
      };  
    });
  }

  get totalOrderPrice1(){
    let sum = 0; 
    for (const orderId in this.items)
       sum= sum + this.items[orderId].totalPrice
       console.log(sum)
    return sum; 
  }

}