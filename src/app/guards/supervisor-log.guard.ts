import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { OuthService } from '../Services/outh.service';


@Injectable({
  providedIn: 'root'
})
export class SupervisorLogGuard implements CanActivate {
  constructor(private router: Router, private authService: OuthService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkLogging(state.url);
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }
  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    const url = `/${route.path}`;
    return this.checkLogging(url);
  }

  checkLogging(url: string){
    if (this.authService.isLoggedAdmin(url)) {
      return true;
    }
    this.router.navigate(['/login_Supervisor']);
    return false;
  }
}
