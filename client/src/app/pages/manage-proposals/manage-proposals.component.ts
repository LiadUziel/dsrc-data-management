import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';

@Component({
  selector: 'app-manage-proposals',
  templateUrl: './manage-proposals.component.html',
  styleUrls: ['./manage-proposals.component.scss'],
})
export class ManageProposalsComponent implements OnInit {
  // items for menu tab
  items: MenuItem[];
  activeItem: MenuItem = { label: '' };

  constructor(private grantProposalsService: GrantProposalService) {}
  ngOnInit(): void {
    this.initTabMenuItems();
  }

  initTabMenuItems() {
    this.items = [
      { label: 'Data Science Doctoral' },
      { label: 'Post Doctoral' },
      { label: 'Seed Research' },
      { label: 'Dataset Collection' },
    ];
  }

  // update the active tab
  onActiveItemChange(event: MenuItem) {
    this.activeItem = event;
  }
}
