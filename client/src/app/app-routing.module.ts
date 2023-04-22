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
import { ProposalsComponent } from './pages/proposals/proposals.component';
import { AuthGuard } from './auth/services/auth.guard';
import { AdminAuthGuard } from './auth/services/admin-auth-guard';

const routes: Routes = [
  { path: '', component: LoginComponent },

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
    path: 'proposals',
    component: ProposalsComponent,
    canActivate: [AuthGuard],
  }, // example of AuthGuard,TODO: remove component
  {
    path: 'grantsAwarded',
    component: GrantsAwardedComponent,
    canActivate: [AdminAuthGuard],
  }, // example of AdminAuthGuard,TODO: remove (/ work on) component
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
