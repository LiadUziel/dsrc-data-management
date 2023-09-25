import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.protected().pipe(
      catchError((err) => {
        this.toastr.info('To access this page you need to log in');
        this.router.navigate(['home']);
        return EMPTY;
      }),
      map((res) => {
        if (res.result) {
          return true;
        }
        this.toastr.info('To access this page you need to log in');
        this.router.navigate(['home']);
        return false;
      })
    );
  }
}
