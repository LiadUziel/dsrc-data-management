import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  items: MenuItem[];

  ngOnInit() {
    this.items = [
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
      },
      {
        label: 'Sign In',
        routerLink: 'login',
      },
      {
        label: 'Log Out',
        icon: 'pi pi-fw pi-sign-out',
        routerLink: 'login',
      },
      {
        label: 'Submit Proposal',
        icon: 'pi pi-plus-circle',
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
    ];
  }
}
