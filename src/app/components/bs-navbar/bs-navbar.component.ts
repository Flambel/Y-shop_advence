import { Component, OnInit} from '@angular/core';
import { AppUser } from 'app/models/app-user';
import { ShoppingCart } from 'app/models/shopping-cart';
import { AuthService } from 'app/services/auth.service';
import { ShoppingCartService } from 'app/services/firebaseCart/shopping-cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit{
  public isCollapsed = true; // propiedad del html
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  name: string;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
    ) {

   }

  logout(){
    this.auth.logout();
  }

  async ngOnInit() {
    this.name = localStorage.getItem('email');
    this.auth.appUser$.subscribe(appUser =>this.appUser = appUser);

    this.cart$ =  await this.shoppingCartService.getCart();
 }

}
