import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavBarService } from '../../services/nav-bar.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  items: MenuItem[];
  constructor(private authService: AuthService, private navBarService: NavBarService){}

  ngOnInit() {
    this.authService.isLogin().subscribe({
      next: (decryptToken) => {
        if (decryptToken) {
          this.items = this.navBarService.getItems(true, decryptToken.role)
        }
        else {
          this.items = this.navBarService.getItems(false, 'member')
        }
      },
      error: (err) => {
        console.log(err)
      }
    });

    this.authService.gonnaLogIn$.subscribe((res) => {
      this.authService.isLogin().subscribe({
        next: (decryptToken) => {
          if (decryptToken && res) {
            this.items = this.navBarService.getItems(true, decryptToken.role)
          }
          else {
            this.items = this.navBarService.getItems(false, 'member')
          }
        },
        error: (err) => {
          console.log(err)
        }
      });
    });
  }
}
