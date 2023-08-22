import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ParentFormComponent } from './pages/submit-proposal/parent-form/parent-form.component';
import { DsDoctoralComponent } from './pages/submit-proposal/ds-doctoral/ds-doctoral.component';
import { PostDoctoralComponent } from './pages/submit-proposal/post-doctoral/post-doctoral.component';
import { SeedResearchComponent } from './pages/submit-proposal/seed-research/seed-research.component';
import { DatasetCollectionComponent } from './pages/submit-proposal/dataset-collection/dataset-collection.component';
import { GrantsAwardedComponent } from './pages/grants-awarded/grants-awarded.component';
import { ManageProposalsComponent } from './pages/manage-proposals/manage-proposals.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RenewPasswordComponent } from './pages/renew-password/renew-password.component';
import { CustomFieldsDialogComponent } from './pages/manage-proposals/custom-fields-dialog/custom-fields-dialog.component';
import { UpdateStatusDialogComponent } from './pages/manage-proposals/update-status-dialog/update-status-dialog.component';
import { SubmittedProposalsComponent } from './pages/submitted-proposals/submitted-proposals.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LottieModule } from 'ngx-lottie';
import { ReviewersPageComponent } from './pages/reviewers-page/reviewers-page.component';
import { TeamMembersPageComponent } from './pages/team-members-page/team-members-page.component';
import { ProductFormComponent } from './pages/submit-product/product-form/product-form.component';
import { SGDOptionComponent } from './pages/submit-product/sdg-option/sgdoption/sgdoption.component';
import { MarkAsteriskDirective } from './pages/submit-product/directives/mark-asterisk/mark-asterisk.directive';
import { ManageProductsComponent } from './pages/manage-products/manage-products/manage-products.component';
import { MyProductsComponent } from './pages/my-products/my-products/my-products.component';  

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PageNotFoundComponent,
    ParentFormComponent,
    DsDoctoralComponent,
    PostDoctoralComponent,
    SeedResearchComponent,
    DatasetCollectionComponent,
    GrantsAwardedComponent,
    ManageProposalsComponent,
    ForgotPasswordComponent,
    RenewPasswordComponent,
    CustomFieldsDialogComponent,
    UpdateStatusDialogComponent,
    SubmittedProposalsComponent,
    HomePageComponent,
    ReviewersPageComponent,
    TeamMembersPageComponent,
    ProductFormComponent,
    SGDOptionComponent,
    MarkAsteriskDirective,
    ManageProductsComponent,
    MyProductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

export function playerFactory() {
  return import('lottie-web');
}
