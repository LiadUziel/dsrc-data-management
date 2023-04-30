import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GrantsAwardedComponent } from './pages/grants-awarded/grants-awarded.component';
import { ProposalsComponent } from './pages/proposals/proposals.component'; 
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/services/auth.guard';
import { AdminAuthGuard } from './auth/services/admin-auth-guard';
import { RenewPasswordComponent } from './pages/renew-password/renew-password.component';
import { RenewPasswordLinkGuard } from './auth/services/renew-password-link.guard.service';

const routes: Routes = [
  { path: '', redirectTo:'/login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent },
  { path:'forgotPassword', component: ForgotPasswordComponent},
  { path: 'proposals', component: ProposalsComponent, canActivate: [AuthGuard]}, // example of AuthGuard,TODO: remove component
  { path: 'grantsAwarded', component: GrantsAwardedComponent, canActivate: [AdminAuthGuard]}, // example of AdminAuthGuard,TODO: remove (/ work on) component
  { path: 'renewPassword', component: RenewPasswordComponent, canActivate: [RenewPasswordLinkGuard]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
