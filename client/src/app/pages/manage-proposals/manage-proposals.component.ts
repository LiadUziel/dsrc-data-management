import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantType } from './models/grant-type.enum';

@Component({
  selector: 'app-manage-proposals',
  templateUrl: './manage-proposals.component.html',
  styleUrls: ['./manage-proposals.component.scss'],
})
export class ManageProposalsComponent implements OnInit {
  proposals$: Observable<GrantProposal[]>;

  // These are the columns and values that will also appear in the Excel export
  cols = [
    { field: 'type', header: 'Grant Type' },
    { field: 'user.firstName', header: 'First Name' },
    { field: 'user.lastName', header: 'Last Name' },
    { field: 'user.email', header: 'Email' },
    { field: 'department', header: 'Department' },
    { field: 'studyTitle', header: 'Study Title' },
    { field: 'amountRequested', header: 'Amount Requested' },
    { field: 'amountGiven', header: 'Amount Given' },
    { field: 'applicationDate', header: 'Application Date' },
  ];

  GrantTypeEnum = GrantType;

  constructor(private grantProposalsService: GrantProposalService) {}
  ngOnInit(): void {
    this.proposals$ = this.grantProposalsService.getAllProposals();
  }
}
