import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Observable, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RenewPasswordLinkGuard implements CanActivate{
  private isAuthorized: boolean = false;
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = window.location.href.split('?')[1];
    return this.authService.verifyJwt(token).pipe(
      filter((res) => res !== undefined),
      map((res) => {
        if (!res?.email?.email) {
          if (res?.result) {
            this.toastr.error(res.result);
          }
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}
