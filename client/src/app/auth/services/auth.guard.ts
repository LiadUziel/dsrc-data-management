import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  private isAuthorized :boolean = false;
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.protected().subscribe({
      next:(res) => {
        if (res.result) {
          this.isAuthorized = true;
        }
      },
      error:(error) => {
        this.toastr.info('To get to this page, you first need to log in'); 
        this.router.navigate(['login']);
      }
    }  
    );
    
    return this.isAuthorized;
  }
}
