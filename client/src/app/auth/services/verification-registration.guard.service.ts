import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VerificationRegistrationGuard implements CanActivate{
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = window.location.href.split('?')[1];
    return this.authService.verifyJwt(token).pipe(
      map((res) => {
        if (res?.user?.user?.email) {
              const email = res.user.user.email;
              const password = res.user.user.password;
              const firstName = res.user.user.firstName;
              const lastName = res.user.user.lastName;
              this.authService.register(email, password, firstName, lastName)
            .subscribe({
                next: (result) => {
                this.router.navigate(['/login']);
                this.toastr.success('Registration successful!');
                },
                error: (error) => {
                if (error.error.message.includes('duplicate key error')) {
                    this.toastr.error('Email already exists!');
                } else {
                    this.toastr.error('Registration failed!');
                }
                },
            });
            return true;
        }
        this.toastr.error('The link is expired, so your registration personal details were not created at DSRC system, please register to DSRC again');
        this.router.navigate(['/login']);
        return false;
      }
    ),
    catchError((err) => { 
      this.toastr.error('The link is expired, so your registration personal details were not created at DSRC system, please register to DSRC again');
      this.router.navigate(['/login']);
      throw err;
    })
    );
  }
}
