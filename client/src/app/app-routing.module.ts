import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { GrantsAwardedComponent } from './pages/grants-awarded/grants-awarded.component';
import { ProposalsComponent } from './pages/proposals/proposals.component'; 
import { AuthGuard } from './auth/services/auth.guard';
import { AdminAuthGuard } from './auth/services/admin-auth-guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'proposals', component: ProposalsComponent, canActivate: [AuthGuard]}, // example of AuthGuard,TODO: remove component
  { path: 'grantsAwarded', component: GrantsAwardedComponent, canActivate: [AdminAuthGuard]}, // example of AdminAuthGuard,TODO: remove (/ work on) component
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
