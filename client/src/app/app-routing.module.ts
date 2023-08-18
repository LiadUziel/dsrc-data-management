import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { DsDoctoralComponent } from './pages/submit-proposal/ds-doctoral/ds-doctoral.component';
import { PostDoctoralComponent } from './pages/submit-proposal/post-doctoral/post-doctoral.component';
import { SeedResearchComponent } from './pages/submit-proposal/seed-research/seed-research.component';
import { DatasetCollectionComponent } from './pages/submit-proposal/dataset-collection/dataset-collection.component';
import { GrantsAwardedComponent } from './pages/grants-awarded/grants-awarded.component';
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

const routes: Routes = [
  // TODO - fix routing and guard
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomePageComponent },
  // auth
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // submit proposal
  { path: 'submit-proposal/ds-doctoral', component: DsDoctoralComponent },
  { path: 'submit-proposal/post-doctoral', component: PostDoctoralComponent },
  { path: 'submit-proposal/seed-research', component: SeedResearchComponent },
  {
    path: 'submit-proposal/dataset-collection',
    component: DatasetCollectionComponent,
  },
  {
    path: 'submitted-proposals',
    component: SubmittedProposalsComponent,
  },
  {
    path: 'reviewers',
    component: ReviewersPageComponent,
  },
  {
    path: 'team-members',
    component: TeamMembersPageComponent,
  },

  {
    path: 'manage-proposals',
    component: ManageProposalsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'grantsAwarded',
    component: GrantsAwardedComponent,
    canActivate: [AdminAuthGuard],
  }, // example of AdminAuthGuard,TODO: remove (/ work on) component
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
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
