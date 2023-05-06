import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  forgotPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ])
    });
  }

  onSubmit() {
    this.toastr.info('please wait');
    this.authService.forgotPassword(this.email).subscribe({
      next: (result) => {
        this.toastr.success('Email for renew password was sent to the email address you inserted');
      },

      error: (error) => {
        this.toastr.error(error.error.message);
      },
    });
  }

  get email(): string {
    return this.forgotPasswordForm.get('email').value;
  }

}

