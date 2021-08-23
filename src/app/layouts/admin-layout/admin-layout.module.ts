import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
//import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { BsNavbarComponent } from 'app/components/bs-navbar/bs-navbar.component';
import { AdminOrdersComponent } from 'app/components/admin/admin-orders/admin-orders.component';
import { AdminProductComponent } from 'app/components/admin/admin-product/admin-product.component';
import { ProductFormComponent } from 'app/components/admin/product-form/product-form.component';
import { CheckOutComponent } from 'app/components/check-out/check-out.component';
import { ShippingFormComponent } from 'app/components/check-out/shipping-form/shipping-form.component';
import { DemoComponent } from 'app/components/demo/demo/demo.component';
import { SecondFooterComponent } from 'app/components/second-footer/second-footer.component';
import { HomeComponent } from 'app/components/home/home.component';
import { LoginComponent } from 'app/components/login/login.component';
import { MyOrdersComponent } from 'app/components/my-orders/my-orders.component';
import { OrderDetailComponent } from 'app/components/my-orders/order-detail/order-detail.component';
import { OrderTotalPriceComponent } from 'app/components/my-orders/order-total-price/order-total-price.component';
import { OrderSuccessComponent } from 'app/components/order-success/order-success.component';
import { ProductQuantityComponent } from 'app/components/product-quantity/product-quantity.component';
import { ProductFilterComponent } from 'app/components/products/product-filter/product-filter.component';
import { ProductsComponent } from 'app/components/products/products.component';
import { RegisterComponent } from 'app/components/register/register.component';
import { ProductCardComponent } from 'app/components/shareUsersAdmin/product-card/product-card.component';
import { ShoppingCartSummaryComponent } from 'app/components/shopping-cart/shopping-cart-summary/shopping-cart-summary.component';
import { ShoppingCartComponent } from 'app/components/shopping-cart/shopping-cart.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    // LoginComponent,
    ProductFilterComponent,
    DemoComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShippingFormComponent,
    ShoppingCartSummaryComponent,
    OrderDetailComponent,
    OrderTotalPriceComponent,
    SecondFooterComponent,
    // RegisterComponent,
//    NotificationsComponent,
    UpgradeComponent,
  ]
})

export class AdminLayoutModule {}
