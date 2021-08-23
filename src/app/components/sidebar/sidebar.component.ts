import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from 'app/models/app-user';
import { ShoppingCart } from 'app/models/shopping-cart';
import { AuthService } from 'app/services/auth.service';
import { CategoryService } from 'app/services/categories/category.service';
import { ShoppingCartService } from 'app/services/firebaseCart/shopping-cart.service';
import { Observable } from 'rxjs';
import { NotificationsService } from '../../services/notifications.service';

declare const $: any;
declare const google: any;

// interface Marker {
//     lat: number;
//     lng: number;
//     label?: string;
//     draggable?: boolean;
// }
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'Doctors', icon:'person', class: '' },
    { path: '/table-list', title: 'Patients',  icon:'group', class: '' },
    { path: '/service', title: 'Services', icon: 'group_work', class: '' },
    { path: '/typography', title: 'Documents', icon: 'library_books', class: '' },
    { path: '/notifications', title: 'Scheduler', icon: 'today', class: '' },
    { path: '/about-us', title: 'Yaba-In / SDK Games', icon: '', class: '' },
    { path: '/upgrade', title: 'Yaba-In', icon: 'Y', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
    menuItems: any[];
    note: any;
    public isCollapsed = true; // propiedad del html
    appUser: AppUser;
    cart$: Observable<ShoppingCart>;
    name: string;
  

    categories$;
    @Input('category') category: string;

    constructor(
        private notification: NotificationsService,
        categoryService: CategoryService,
        private auth: AuthService,
        private shoppingCartService: ShoppingCartService) { 
            this.categories$ = categoryService.getCategories();
        }

        logout(){
            this.auth.logout();
          }

          async ngOnInit() {
            this.name = localStorage.getItem('email');
            this.auth.appUser$.subscribe(appUser =>this.appUser = appUser);
            this.cart$ =  await this.shoppingCartService.getCart();
        this.note = this.notification;

      this.menuItems = ROUTES.filter(menuItem => menuItem);
    //   var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    //   var mapOptions = {
    //       zoom: 13,
    //     //   center: myLatlng,
    //       scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
    //       styles: [{
    //           "featureType": "water",
    //           "stylers": [{
    //               "saturation": 43
    //           }, {
    //               "lightness": -11
    //           }, {
    //               "hue": "#0088ff"
    //           }]
    //       }, {
    //           "featureType": "road",
    //           "elementType": "geometry.fill",
    //           "stylers": [{
    //               "hue": "#ff0000"
    //           }, {
    //               "saturation": -100
    //           }, {
    //               "lightness": 99
    //           }]
    //       }, {
    //           "featureType": "road",
    //           "elementType": "geometry.stroke",
    //           "stylers": [{
    //               "color": "#808080"
    //           }, {
    //               "lightness": 54
    //           }]
    //       }, {
    //           "featureType": "landscape.man_made",
    //           "elementType": "geometry.fill",
    //           "stylers": [{
    //               "color": "#ece2d9"
    //           }]
    //       }, {
    //           "featureType": "poi.park",
    //           "elementType": "geometry.fill",
    //           "stylers": [{
    //               "color": "#ccdca1"
    //           }]
    //       }, {
    //           "featureType": "road",
    //           "elementType": "labels.text.fill",
    //           "stylers": [{
    //               "color": "#767676"
    //           }]
    //       }, {
    //           "featureType": "road",
    //           "elementType": "labels.text.stroke",
    //           "stylers": [{
    //               "color": "#ffffff"
    //           }]
    //       }, {
    //           "featureType": "poi",
    //           "stylers": [{
    //               "visibility": "off"
    //           }]
    //       }, {
    //           "featureType": "landscape.natural",
    //           "elementType": "geometry.fill",
    //           "stylers": [{
    //               "visibility": "on"
    //           }, {
    //               "color": "#b8cb93"
    //           }]
    //       }, {
    //           "featureType": "poi.park",
    //           "stylers": [{
    //               "visibility": "on"
    //           }]
    //       }, {
    //           "featureType": "poi.sports_complex",
    //           "stylers": [{
    //               "visibility": "on"
    //           }]
    //       }, {
    //           "featureType": "poi.medical",
    //           "stylers": [{
    //               "visibility": "on"
    //           }]
    //       }, {
    //           "featureType": "poi.business",
    //           "stylers": [{
    //               "visibility": "simplified"
    //           }]
    //       }]

    //   };
    //   var map = new google.maps.Map(document.getElementById("map"), mapOptions);

    //   var marker = new google.maps.Marker({
    //       position: myLatlng,
    //       title: "Hello World!"
    //   });

      // To add the marker to the map, call setMap();
    //   marker.setMap(map);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
    };

    showNotification(from, align, typMsg) {
        this.note.showNotification(from, align, typMsg);
    }
}
