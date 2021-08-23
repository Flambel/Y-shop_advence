import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DemoComponent } from './components/demo/demo/demo.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AdminProductComponent } from './components/admin/admin-product/admin-product.component';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: 'demo', component: DemoComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'shopping-cart', component: ShoppingCartComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegisterComponent },
  { path: 'check-out', component: CheckOutComponent
    // , canActivate: [AuthGuardService] 
  },
  { path: 'order-success/:id', component: OrderSuccessComponent
    // , canActivate: [AuthGuardService] 
  },
  { path: 'my/orders', component: MyOrdersComponent
    // , canActivate: [AuthGuardService]
  },
  { path: 'admin/products', component: AdminProductComponent
    // , canActivate: [AuthGuardService, AdminAuthGuardService] 
  },
  { path: 'admin/products/new', component: ProductFormComponent
    // , canActivate: [AuthGuardService, AdminAuthGuardService] 
  },
  { path: 'admin/orders', component: AdminOrdersComponent
    // , canActivate: [AuthGuardService, AdminAuthGuardService] 
  },
  {
     path: '',
     redirectTo: 'dashboard',
     pathMatch: 'full',
 }, {
 path: '',
 component: AdminLayoutComponent,
 children: [{
   path: '',
   loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
 }]
},

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
    ],
})
export class AppRoutingModule { }
