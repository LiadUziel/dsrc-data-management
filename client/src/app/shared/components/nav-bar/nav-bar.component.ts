import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NavBarService } from '../../services/nav-bar.service';
import { User } from 'src/app/auth/interfaces/user-interface';
import { of, switchMap } from 'rxjs';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  items: MenuItem[];

  user: User;

  isDarkTheme = false;

  constructor(
    private authService: AuthService,
    private navBarService: NavBarService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.authService.isLogin().subscribe({
      next: (decryptToken) => {
        if (decryptToken) {
          this.items = this.navBarService.getItems(true, decryptToken.roles);
        } else {
          this.items = this.navBarService.getItems(false, ['submitter']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.authService
      .isLogin()
      .pipe(
        switchMap((decryptToken) => {
          if (decryptToken) {
            return this.authService.getLoggedUser();
          }
          return of(null);
        })
      )
      .subscribe({
        next: (user) => {
          if (user) {
            this.items = this.navBarService.getItems(true, user.roles);
            this.user = user;
          } else {
            this.items = this.navBarService.getItems(false, ['submitter']);
            this.user = null;
          }
        },
      });

    this.authService.gonnaLogIn$
      .pipe(
        switchMap((isLogged) => {
          if (isLogged) {
            return this.authService.getLoggedUser();
          }
          return of(null);
        })
      )
      .subscribe({
        next: (user) => {
          if (user) {
            this.items = this.navBarService.getItems(true, user.roles);
            this.user = user;
          } else {
            this.items = this.navBarService.getItems(false, ['submitter']);
            this.user = null;
          }
        },
      });

    const theme = localStorage.getItem('theme') as
      | 'light-purple'
      | 'dark-purple';
    this.isDarkTheme = theme === 'dark-purple' ? true : false;
    this.switchTheme();
  }

  switchTheme() {
    const theme: 'light-purple' | 'dark-purple' = this.isDarkTheme
      ? 'dark-purple'
      : 'light-purple';
    this.themeService.switchTheme(theme);
  }
}
