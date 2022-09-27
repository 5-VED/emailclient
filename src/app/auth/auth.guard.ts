import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { skipWhile, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let temp = this.authService.isSignedIn$.pipe(
      skipWhile((value) => value === null),
      take(1),
      tap((authenticated) => {
        debugger
        if (authenticated) {
          this.router.navigateByUrl('/');
        }
      })
    );
    console.log(temp)
    return temp
  }
}             