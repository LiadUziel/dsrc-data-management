import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {
constructor(private authService: AuthService) {}

getItems(isLogged: boolean, isAdmin: boolean) {
  return [
    {
      label: 'DSRC Data Management',
      disabled: true,
    },
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: 'login',
    },
    {
      label: 'Sign Up',
      routerLink: 'register',
      visible: !isLogged
    },
    {
      label: 'Sign In',
      routerLink: 'login',
      visible: !isLogged
    },
    {
      label: 'Submit Proposal',
      icon: 'pi pi-plus-circle',
      visible: isLogged,
      items: [
        {
          label: 'Data Science Doctoral',
          routerLink: 'submit-proposal/ds-doctoral',
        },
        {
          label: 'Post-Doctoral research',
          routerLink: 'submit-proposal/post-doctoral',
        },
        {
          label: 'Seed research',
          routerLink: 'submit-proposal/seed-research',
        },
        {
          label: 'Dataset collection',
          routerLink: 'submit-proposal/dataset-collection',
        },
      ],
    },
    {
      label: 'Manage Proposals',
      icon: 'pi pi-wrench',
      routerLink: 'manage-proposals',
      visible: isLogged && isAdmin
    },
    {
      label: 'Log Out',
      icon: 'pi pi-fw pi-sign-out',
      routerLink: 'login',
      visible: isLogged,
      command: () => {this.authService.logout()} 
    },
  ];
}

}


