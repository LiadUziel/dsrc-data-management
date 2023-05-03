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
import { DsDoctoralTableComponent } from './pages/manage-proposals/ds-doctoral-table/ds-doctoral-table.component';
import { PostDoctoralTableComponent } from './pages/manage-proposals/post-doctoral-table/post-doctoral-table.component';
import { SeedResearchTableComponent } from './pages/manage-proposals/seed-research-table/seed-research-table.component';
import { DatasetCollectionTableComponent } from './pages/manage-proposals/dataset-collection-table/dataset-collection-table.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { RenewPasswordComponent } from './pages/renew-password/renew-password.component';

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
