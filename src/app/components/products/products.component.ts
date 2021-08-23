import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'app/models/products';
import { ShoppingCart } from 'app/models/shopping-cart';
import { ProductService } from 'app/services/firebase/product.service';
import { ShoppingCartService } from 'app/services/firebaseCart/shopping-cart.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  category: string;
  products: Product[] = [];
  filteredProducts: Product[] = [] ;
  
  cart$:Observable<ShoppingCart>;


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) {}
  
  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){
      this.productService.getProducts().subscribe(products => { this.products = products; 

      this.route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
  
        this.applyFilter();
      });
    });
  }

  private applyFilter(){
    this.filteredProducts = (this.category) ?
    this.products.filter(p => p.category === this.category) :
    this.products;
  }

}
