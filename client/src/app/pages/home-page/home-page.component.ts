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
      path: 'assets/lottie/home-page.json',
      autoplay: true,
      loop: true,
    },
    login: {
      path: 'assets/lottie/login.json',
      autoplay: true,
      loop: true,
    },
    register: {
      path: 'assets/lottie/register.json',
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
