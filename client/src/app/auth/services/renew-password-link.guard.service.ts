import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenewPasswordLinkGuard implements CanActivate{
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = window.location.href.split('?')[1];
    return this.authService.verifyJwt(token).pipe(
      map((res) => {
        if (res?.email?.email) {
          return true;
        }
        this.toastr.error('The link is expired, so you will redirect to login page, if you would like to rew your password, please get to forgot password page again');
        this.router.navigate(['/login']);
        return false;
      }
    ),
    catchError((err) => { 
      this.toastr.error('The link is expired, so you will redirect to login page, if you would like to rew your password, please get to forgot password page again');
      this.router.navigate(['/login']);
      throw err;
    })
    );
  }
}
