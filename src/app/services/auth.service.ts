import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/internal/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { map, switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';


export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  db: any;
  user$: Observable<firebase.User>;
  constructor(
    public afs: AngularFirestore,
    private userService: UserService,
    private afireAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router) {
    this.user$ = afireAuth.authState;
  }
  loginWithGoogle() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/products';
    localStorage.setItem('returnUrl', returnUrl);
    this.afireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afireAuth.auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('email');
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .pipe(switchMap(
        user => {
          if (user) { return this.userService.get(user.uid).valueChanges(); }

          return of(null);

        })
      )

  }


  /////////

  signIn(email: string, password: string) {
    return this.afireAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        // this.SetUserData(result.user);
        localStorage.setItem('email', email);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/products';
        localStorage.setItem('returnUrl', returnUrl);
        console.log('signIn Ok!');
      })
      .catch((err) => {
        window.alert(err.message);
        console.log('Something went wrong: ', err.message);
      });
  }


  signUp(email: string, password: string) {
    return this.afireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((value) => {
        this.SetUserData(value.user);
        localStorage.setItem('email', email);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/products';
        localStorage.setItem('returnUrl', returnUrl);
        console.log('signUp Ok!');
        // console.log('Sucess', value);
        // emal ezekiastMood123@gmail.com
        // pass gmail 123EzMood
        // Pass 000webhostapp ezekiastMood123
        // console.log(value.user);
      })
      .catch((error) => {
        window.alert(error.message)
        console.log('Something went wrong: ', error);
      });
  }

  // logout() {
  //   this.afAuth.auth.signOut().then(() => {
  //     this.router.navigate(['/']);
  //   });
  // }

  private oAuthLogin(provider) {
    return this.afireAuth.auth.signInWithPopup(provider);
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userState: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    }
    return userRef.set(userState, {
      merge: true
    });
  }





  signInNewUser(email: string, password: string, name: string, user: User) {
    this.afireAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        return this.addUser(user);
      });
  }
  addUser(user: User) {
    // console.log("User ",user.toString())
    this.set(`users/${user.uid.toString()}`, user.toString());
  }

  set(url: string, value: any) {
    this.db.ref(url).set(value).then(() => {
    }).catch((err) => {
      return err;
    })
  }
}



