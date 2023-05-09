import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, concatMap, finalize } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-renew-password',
  templateUrl: './renew-password.component.html',
  styleUrls: ['./renew-password.component.scss'],
})
export class RenewPasswordComponent {
  renewPassword$: Observable<any>;
  renewPasswordForm: FormGroup;
  passwordDetails = [
    'contains at least one lower character',
    'contains at least one upper character',
    'contains at least one digit character',
    'contains at least one special character',
    'contains at least 8 characters',
  ];
  showDetails: boolean = false;
  showDetailsMassage = 'Show password details';

  loading = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    let token = window.location.href.split('?')[1];
    token = token.substring(0, token.length - 1);
    this.renewPassword$ = this.authService
      .verifyJwt(token)
      .pipe(
        concatMap((res) =>
          this.authService.renewPassword(res.user.email, this.password)
        )
      );
  }

  ngOnInit(): void {
    this.renewPasswordForm = new FormGroup(
      {
        password: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        showPasswordStrengthDetailsToggle: new FormControl(''),
        confirmPassword: new FormControl<string>('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      },
      {
        validators: this.mustMatch('password', 'confirmPassword'),
      }
    );
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  onSubmit() {
    this.loading = true;
    this.renewPassword$
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.router.navigate(['/login']);
          this.toastr.success('Password updated successfully');
        },

        error: (error) => {
          console.log(error);
          this.toastr.error('Password update failed');
        },
      });
  }

  isPasswordDetailTrue(index: number): boolean {
    if (this.renewPasswordForm?.value['password']) {
      switch (index) {
        case 0:
          return /[a-z]/.test(this.renewPasswordForm.value['password']);
        case 1:
          return /[A-Z]/.test(this.renewPasswordForm.value['password']);
        case 2:
          return /[0-9]/.test(this.renewPasswordForm.value['password']);
        case 3:
          return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
            this.renewPasswordForm.value['password']
          );
        case 4:
          return this.renewPasswordForm.value['password'].length >= 8;
        default:
          return false;
      }
    }
    return false;
  }

  setShowDetails() {
    this.showDetails = !this.showDetails;
    if (this.showDetails) {
      this.showDetailsMassage = "Don't show password details";
    } else {
      this.showDetailsMassage = 'Show password details';
    }
  }

  get password(): string {
    return this.renewPasswordForm.get('password').value;
  }
}
