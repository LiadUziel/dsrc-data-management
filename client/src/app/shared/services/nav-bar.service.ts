import { Injectable } from '@angular/core';
import { Role } from 'src/app/auth/interfaces/user-interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NavBarService {
  constructor(private authService: AuthService) {}

  getItems(isLogged: boolean, roles: Role[]) {
    const isAdmin = roles.includes('admin');
    const isReviewer = roles.includes('reviewer');
    const isTeamMember = roles.includes('teamMember');
    return [
      {
        label: 'DSRC Data Management',
        disabled: true,
      },
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: 'home',
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
        visible: isLogged && !isAdmin,
        items: [
          {
            label: 'My proposals',
            routerLink: 'submitted-proposals',
          },
          {
            label: 'My products',
            routerLink: 'my-products',
          },
          {
            label: 'Proposals to review',
            routerLink: 'reviewers',
            visible: isLogged && isReviewer,
          },

          {
            label: 'Proposals I am a Team Member',
            routerLink: 'team-members', 
            visible: isLogged && isTeamMember,
          },
        ]
      },
      {
        label: 'Management',
        icon: 'pi pi-wrench',
        visible: isLogged && isAdmin,
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
