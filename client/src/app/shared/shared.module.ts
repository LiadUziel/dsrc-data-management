import { NgModule } from '@angular/core';

// primeng
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { MenubarModule } from 'primeng/menubar';
//Components
import { NavBarComponent } from '../pages/nav-bar/nav-bar.component';
import { FooterComponent } from '../pages/footer/footer.component';
import { PagesComponent } from '../pages/pages.component';

@NgModule({
  declarations: [NavBarComponent, FooterComponent, PagesComponent],
  imports: [
    // primeng
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    MenubarModule
  ],
  exports: [
    // primeng
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    MenubarModule,

    //cpmponents
    PagesComponent
  ],
})
export class SharedModule {}
