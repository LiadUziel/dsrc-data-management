import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerationForm: FormGroup;
  passwordDetails = [
    'contains at least one lower character',
    'contains at least one upper character',
    'contains at least one digit character',
    'contains at least one special character',
    'contains at least 8 characters'
  ];
  showDetails: boolean = false;
  showDetailsMassage = 'Show password details';

  constructor() {}

  ngOnInit(): void {
    this.registerationForm = new FormGroup({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      showPasswordStrengthDetailsToggle: new FormControl(''),
      confirmPassword: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      firstName: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ]),
      lastName: new FormControl<string>('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]*')
      ]),
    },
    {
      validators: this.mustMatch('password', 'confirmPassword')
    }
    );
  }
  mustMatch(password: string, confirmPassword: string){
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
    console.log(this.registerationForm.value);
  }

  isPasswordDetailTrue(index: number): boolean{
    if(this.registerationForm?.value['password']) {
      switch(index){
        case 0:
          return /[a-z]/.test(this.registerationForm.value['password']);
        case 1:
          return /[A-Z]/.test(this.registerationForm.value['password']);
        case 2:
          return /[0-9]/.test(this.registerationForm.value['password']);
        case 3:
          return /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(this.registerationForm.value['password']);
        case 4:
          return this.registerationForm.value['password'].length >= 8;
        default:
          return false;
      }
    }
    return false;
  }

  setShowDetails() {
    this.showDetails = !this.showDetails;
    if(this.showDetails) {
      this.showDetailsMassage = "Don't show password details";
    }
    else {
      this.showDetailsMassage = "Show password details";
    }
  }
}
