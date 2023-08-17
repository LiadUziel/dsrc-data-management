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
        label: 'My Proposals',
        icon: 'pi pi-fw pi-list',
        routerLink: 'my-proposals',
        visible: isLogged && !isAdmin,
      },
      {
        label: 'Manage Proposals',
        icon: 'pi pi-wrench',
        routerLink: 'manage-proposals',
        visible: isLogged && isAdmin,
      },
      {
        label: 'For Reviewer',
        routerLink: 'home', // TODO - change
        visible: isLogged && isReviewer,
      },
      {
        label: 'For Team Members',
        routerLink: 'home', // TODO - change
        visible: isLogged && isTeamMember,
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
