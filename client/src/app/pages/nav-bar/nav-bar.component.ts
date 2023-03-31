import { Component ,OnInit } from '@angular/core';
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
        },
        {
            label: 'Sign Up'
        },
        {
            label: 'Sign In'
        },
        {
            label: 'Log Out',
            icon: 'pi pi-fw pi-sign-out'
        }
    ];
}
}


