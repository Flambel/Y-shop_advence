import { Injectable } from '@angular/core';
import { UserService } from "./user.service";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { CanActivate } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private userService: UserService) {}

  canActivate(): Observable<boolean>{
    console.log(localStorage.getItem('email'));
    return this.auth.appUser$
      .pipe(map(appUser => appUser.isAdmin));

  }
}

