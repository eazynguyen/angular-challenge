import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import {map, Observable, tap} from 'rxjs';
import {UserInfoStore} from "../stores/user-info.store";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userInfoStore: UserInfoStore) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   return this.userInfoStore.token$.pipe(
      map(token => {
        console.log(token)
        if(token){
          return true
        }
        return false;
      })
    )
  }

  checkToken() {
    return !this.userInfoStore.token$.pipe(
      map(token => {
        console.log(token)
        return true;
      })
    );
  }
}
