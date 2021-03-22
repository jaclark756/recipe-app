import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class RouterGuard implements CanActivate {

  activeUser$: any;
  constructor( 
    private userService: UserService, 
    private tokenService: TokenService, 
    public router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Comment this block out during development to remove guard
    // const user = this.tokenService.getUser();
    // if (!user){
    //   this.router.navigateByUrl("/login");
    //   return false;
    // }
    // End bock
    
    return true;
  }
  
}
