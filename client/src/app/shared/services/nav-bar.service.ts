import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  constructor(private authService: AuthService) {}

  getItems(isLogged: boolean, role: string) {
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
        visible: !isLogged,
      },
      {
        label: 'Sign In',
        routerLink: 'login',
        visible: !isLogged,
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
        label: 'Submit Product',
        icon: 'pi pi-briefcase',
        routerLink: 'submit-product',
        visible: isLogged,
      },
      {
        label: 'My Submissions',
        icon: 'pi pi-fw pi-list',
        visible: isLogged && role !== 'admin',
        items: [
          {
            label: 'My proposals',
            routerLink: 'my-proposals',
          },
          {
            label: 'My products',
            routerLink: 'my-products',
          },
        ]
      },
      {
        label: 'Management',
        icon: 'pi pi-wrench',
        visible: isLogged && role === 'admin',
        items: [
          {
            label:'Manage Proposals',
            routerLink: 'manage-proposals'
          },
          {
            label: 'Manage Products',
            routerLink: 'manage-products'
          }
        ]
      },
      {
        label: 'Log Out',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: 'login',
        visible: isLogged,
        command: () => {
          this.authService.logout();
        },
      },
    ];
  }
}
