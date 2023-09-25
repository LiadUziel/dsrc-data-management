import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Router, UrlTree } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard {
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
    return this.authService.protectedAdmin().pipe(
      catchError((err) => {
        this.toastr.info(
          'To access this page you need to be logged in as an admin'
        );
        this.router.navigate(['home']);
        return EMPTY;
      }),
      map((res) => {
        if (res.result) {
          return true;
        }
        this.toastr.info(
          'To access this page you need to be logged in as an admin'
        );
        this.router.navigate(['home']);
        return false;
      })
    );
  }
}
