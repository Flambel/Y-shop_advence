import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService,
              public auth: AuthService,
              public db: AngularFireDatabase,
              config: NgbCarouselConfig,
              private firestore: AngularFirestore,
              public router: Router) {
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = false;

    auth.user$.subscribe(user => {
      if (!user) { return; }
      userService.save(user);
      const returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
    });

    for (let i = 0; i < 4; i++) {
      this.addSlide();
    }
    // this.cathegorie();
  }
  data = [{ categories: 'Désistances', Déserts: 'Boissons' }];

  myInterval: number | false = 6000;
  slides: any[] = [];
  activeSlideIndex = 0;
  noWrapSlides = false;

  cathegorie(product?) {
    // return new Promise<any>((resolve, reject) =>{
    //     this.firestore
    //         .collection("categories")
    //         .add(this.data)
    //         .then(res => {}, err => reject(err));
    // });
    // return this.db.list('categories').push(this.data);
    //   this.firestore.collection('categories').doc('qnsjqsdqssd').update( {
    //     array: firebase.firestore.FieldValue.arrayUnion( 'newItem' )
    //  });
    // firebase.database().ref("categories").orderByChild("SubCategoryParentId").equalTo("Pass your Subcategory Id here");

  }

  ngOnDestroy(): void {
    this.myInterval = 0;
    this.noWrapSlides = true;
    this.myInterval = false;
  }

  addSlide(): void {
    setTimeout(() => {
      const seed = Math.random().toString(36).slice(-6);
      this.slides.push({
        image: `https://picsum.photos/seed/${seed}/900/500`
      });
    }, 500);
  }

  removeSlide(index?: number): void {
    const toRemove = index ? index : this.activeSlideIndex;
    this.slides.splice(toRemove, 1);
  }


}
