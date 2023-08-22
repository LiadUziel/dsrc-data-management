import { NgModule } from '@angular/core';

// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TabMenuModule } from 'primeng/tabmenu';
import { FileUploadModule } from 'primeng/fileupload';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { TabViewModule } from 'primeng/tabview';

// ngx-toastr
import { ToastrModule } from 'ngx-toastr';

//materials
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

//Components
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagesComponent } from '../pages/pages.component';
import { ReviewDialogComponent } from './components/review-dialog/review-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    PagesComponent,
    ReviewDialogComponent,
  ],
  imports: [
    // ngx-toastr
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      progressAnimation: 'increasing',
      closeButton: true,
    }),
    FormsModule,

    // primeng
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    MenubarModule,
    TableModule,
    TabMenuModule,
    FileUploadModule,
    InputNumberModule,
    InputTextareaModule,
    DynamicDialogModule,
    RadioButtonModule,
    TagModule,
    DropdownModule,
    TabViewModule,

    //materials
    MatPasswordStrengthModule.forRoot(),
    MatSlideToggleModule,
  ],
  exports: [
    // primeng
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    MenubarModule,
    TableModule,
    TabMenuModule,
    FileUploadModule,
    InputNumberModule,
    InputTextareaModule,
    DynamicDialogModule,
    RadioButtonModule,
    TagModule,
    DropdownModule,
    TabViewModule,

    // materials
    MatPasswordStrengthModule,
    MatSlideToggleModule,

    // components
    PagesComponent,
  ],
})
export class SharedModule {}
