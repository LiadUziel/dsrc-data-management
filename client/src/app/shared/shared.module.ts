import { NgModule } from '@angular/core';

// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastrModule } from 'ngx-toastr';

// ngx-toastr

@NgModule({
  declarations: [],
  imports: [
    // ngx-toastr
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left',
    }),

    // primeng
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
  ],
  exports: [
    // primeng
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
  ],
})
export class SharedModule {}
