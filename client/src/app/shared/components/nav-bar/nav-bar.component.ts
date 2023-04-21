import { Component ,OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  items: MenuItem[];

  ngOnInit() {
    this.items = [
        {
            label: 'DSRC Data Management',
            disabled: true
        },
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            routerLink: 'login'
        },
        {
            label: 'Sign Up',
            routerLink: 'register'
        },
        {
            label: 'Sign In',
            routerLink: 'login'
        },
        {
            label: 'Grants Awarded',
            icon: 'pi pi-fw pi-table',
            routerLink: 'grantsAwarded'
        },
        {
            label: 'Proposals',
            icon: 'pi pi-fw pi-file',
            routerLink: 'proposals'
        },
        {
            label: 'Log Out',
            icon: 'pi pi-fw pi-sign-out',
            routerLink: 'login'
        }
    ];
}
}


