import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  lotties: { [name: string]: AnimationOptions } = {
    home: {
      path: 'assets/lottie/welcome.json',
      autoplay: true,
      loop: false,
    },
    login: {
      path: 'assets/lottie/login-purple.json',
      autoplay: true,
      loop: true,
    },
    register: {
      path: 'assets/lottie/register-purple.json',
      autoplay: true,
      loop: true,
    },
  };

  isLogged = false;

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.authService.isLogin().subscribe((user) => {
      this.isLogged = !!user;
    });

    // Handle logout case
    this.authService.gonnaLogIn$.subscribe((gonnaLogIn) => {
      if (!gonnaLogIn) {
        this.isLogged = false;
      }
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
