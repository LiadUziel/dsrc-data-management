import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantType } from './models/grant-type.enum';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { FilesService } from 'src/app/files/services/files.service';
import { saveAs } from 'file-saver';

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

  constructor(
    private grantProposalsService: GrantProposalService,
    private filesService: FilesService
  ) {}
  ngOnInit(): void {
    this.proposals$ = this.grantProposalsService.getAllProposals();
  }

  // get the total amount of the budget parts1
  getTotalBudget(budgetParts: BudgetPart[]): number {
    return budgetParts.reduce((acc, curr) => acc + curr.amount, 0);
  }

  getFile(filePath: string): void {
    this.filesService.downloadFile(filePath).subscribe(
      (data) => {
        saveAs(data, filePath);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  isDsDoctorlOrPostDocProposal(proposalType: string) {
    return (
      this.GrantTypeEnum[proposalType] === 'Data Science Doctoral' ||
      this.GrantTypeEnum[proposalType] === 'Post Doctoral'
    );
  }

  isSeedOrDatasetCollectionProposal(proposalType: string) {
    return (
      this.GrantTypeEnum[proposalType] === 'Seed Research' ||
      this.GrantTypeEnum[proposalType] === 'Dataset Collection'
    );
  }
}
