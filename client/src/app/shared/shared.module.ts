import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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
import { ListboxModule } from 'primeng/listbox';

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
import { MultiFieldComponent } from './components/multi-field/multi-field.component';

@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent,
    PagesComponent,
    ReviewDialogComponent,
    MultiFieldComponent],
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
    ListboxModule,
    //materials
    MatPasswordStrengthModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    CommonModule
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
    ListboxModule,
    // materials
    MatPasswordStrengthModule,
    MatSlideToggleModule,

    // components
    PagesComponent,
    MultiFieldComponent
  ],

})
export class SharedModule {}
