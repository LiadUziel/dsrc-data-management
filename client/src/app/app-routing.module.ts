import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DsDoctoralComponent } from './pages/submit-proposal/ds-doctoral/ds-doctoral.component';
import { PostDoctoralComponent } from './pages/submit-proposal/post-doctoral/post-doctoral.component';
import { SeedResearchComponent } from './pages/submit-proposal/seed-research/seed-research.component';
import { DatasetCollectionComponent } from './pages/submit-proposal/dataset-collection/dataset-collection.component';
import { ManageProposalsComponent } from './pages/manage-proposals/manage-proposals.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/services/auth.guard';
import { AdminAuthGuard } from './auth/services/admin-auth-guard';
import { RenewPasswordComponent } from './pages/renew-password/renew-password.component';
import { RenewPasswordLinkGuard } from './auth/services/renew-password-link.guard.service';
import { VerificationRegistrationGuard } from './auth/services/verification-registration.guard.service';
import { SubmittedProposalsComponent } from './pages/submitted-proposals/submitted-proposals.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ReviewersPageComponent } from './pages/reviewers-page/reviewers-page.component';
import { TeamMembersPageComponent } from './pages/team-members-page/team-members-page.component';
import { ProductFormComponent } from './pages/submit-product/product-form/product-form.component';
import { ManageProductsComponent } from './pages/manage-products/manage-products/manage-products.component';
import { MyProductsComponent } from './pages/my-products/my-products/my-products.component';

const routes: Routes = [
  // TODO - fix routing and guard
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomePageComponent },
  // auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // submit proposal
  {
    path: 'submit-proposal/ds-doctoral',
    component: DsDoctoralComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'submit-proposal/post-doctoral',
    component: PostDoctoralComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'submit-proposal/seed-research',
    component: SeedResearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'submit-proposal/dataset-collection',
    component: DatasetCollectionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'submitted-proposals',
    component: SubmittedProposalsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'reviewers',
    component: ReviewersPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'team-members',
    component: TeamMembersPageComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'manage-proposals',
    component: ManageProposalsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  { path: 'forgotPassword', component: ForgotPasswordComponent },
  {
    path: 'renewPassword',
    component: RenewPasswordComponent,
    canActivate: [RenewPasswordLinkGuard],
  },
  {
    path: 'verifyRegister',
    component: LoginComponent,
    canActivate: [VerificationRegistrationGuard],
  },
  {
    path: 'submit-product',
    component: ProductFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'manage-products',
    component: ManageProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard],
  },
  {
    path: 'my-products',
    component: MyProductsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
