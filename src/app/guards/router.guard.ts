import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserServiceService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {

  constructor( private userService: UserServiceService, public router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    const user = this.userService.activeUser;
    // if (user) {
    //   return true;
    // } else {
    //   this.router.navigate([''])
    //   return false;
    // }


  }
  
}
