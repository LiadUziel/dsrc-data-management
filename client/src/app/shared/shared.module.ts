import { NgModule } from '@angular/core';

// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MenubarModule } from 'primeng/menubar';

//materials
import { MatPasswordStrengthModule } from "@angular-material-extensions/password-strength";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

//Components
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FooterComponent } from './components/footer/footer.component';
import { PagesComponent } from '../pages/pages.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, PagesComponent],
  imports: [
    // primeng
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    MenubarModule,

    //materials
    MatPasswordStrengthModule.forRoot(),
    MatSlideToggleModule
  ],
  exports: [
    // primeng
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    MenubarModule,

    //materials
    MatPasswordStrengthModule,
    MatSlideToggleModule,

    //cpmponents
    PagesComponent
  ],
})
export class SharedModule {}
