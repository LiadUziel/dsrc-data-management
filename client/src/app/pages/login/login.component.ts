import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/services/auth.service';
import { TokenStorageService } from '../../auth/services/token-storage.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  loading = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenStorageService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rememberMe: new FormControl<boolean>(false),
    });
  }

  onSubmit() {
    this.loading = true;
    this.authService
      .login(this.email, this.password, this.rememberMe)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.tokenService.setToken(result.token);
          this.toastr.success('Login successful!');
          this.authService.gonnaLogIn$.next(true);
          // TODO - navigate to home page
        },
        error: (error) => {
          this.toastr.error(error.error.message);
        },
      });
  }

  get email(): string {
    return this.loginForm.get('email').value;
  }
  get password(): string {
    return this.loginForm.get('password').value;
  }
  get rememberMe(): boolean {
    return this.loginForm.get('rememberMe').value;
  }
}
