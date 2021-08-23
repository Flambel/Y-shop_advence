import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { AgmCoreModule } from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { IndexComponent } from './index/index.component';
import { FourHoFourComponent } from './four-ho-four/four-ho-four.component';
import { NotificationsService } from './services/notifications.service';
import { AngularFireDatabase } from '@angular/fire/database'
import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { CategoryService } from './services/categories/category.service';
import { ProductService } from './services/firebase/product.service';
import { ShoppingCartService } from './services/firebaseCart/shopping-cart.service';
import { OrderService } from './services/firebaseOrder/order.service';
import { ImageService } from './services/image.service';
import { UserService } from './services/user.service';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from './components/spinner/spinner.module';
import { environment } from 'environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule, AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule,
    CommonModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    IndexComponent,
    FourHoFourComponent,
    NotificationsComponent,

  ],
    providers: [
        NotificationsService,
        AngularFireDatabase,
        AngularFirestore,
        AuthService,
        AuthGuardService,
        UserService,
        AdminAuthGuardService,
        CategoryService,
        ProductService,
        ShoppingCartService,
        OrderService,
        ImageService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
