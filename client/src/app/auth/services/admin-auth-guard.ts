import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './auth.service';
import { Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard {

  private isAuthorized :boolean = false;
  constructor(private toastr: ToastrService, private authService: AuthService, private router: Router) { }
  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    this.authService.protectedAdmin().subscribe({
      next:(res) => {
        if (res.result) {
          this.isAuthorized = true;
        }
      },
      error:(error) => {
        this.toastr.info('To get to this page, you first need to log in as Admin'); 
        this.router.navigate(['login']);
      }
    }  
    );
    
    return this.isAuthorized;
  }
}
