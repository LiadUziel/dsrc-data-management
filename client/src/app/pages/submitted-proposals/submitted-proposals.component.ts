import { Component, OnInit, inject } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantType } from '../manage-proposals/models/grant-type.enum';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { FilesService } from 'src/app/files/services/files.service';
import { saveAs } from 'file-saver';
import { DialogService } from 'primeng/dynamicdialog';
import { ProposalStatus } from '../manage-proposals/models/proposal-status.enum';
import { RoleEnum } from 'src/app/shared/enums/role.enum';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-submitted-proposals',
  templateUrl: './submitted-proposals.component.html',
  styleUrls: ['./submitted-proposals.component.scss'],
  providers: [DialogService],
})
export class SubmittedProposalsComponent implements OnInit {
  proposals$: Observable<GrantProposal[]>;

  GrantTypeEnum = GrantType;

  RoleEnum = RoleEnum;

  ProposalStatus = ProposalStatus;

  statusSeverity = {
    PENDING: 'info',
    PARTIALLY_APPROVED: 'warning',
    APPROVED: 'success',
    REJECTED: 'danger',
  };
  statusIcon = {
    PENDING: 'pi pi-clock',
    PARTIALLY_APPROVED: 'pi pi-code',
    APPROVED: 'pi pi-check',
    REJECTED: 'pi pi-times',
  };

  statusesKeys = Object.keys(ProposalStatus);

  grantTypesKeys = Object.keys(GrantType);

  departments: { name: string }[];

  loading = true;
  rowsSkeleton = new Array(5);
  colsSkeleton = new Array(8);

  constructor(
    private grantProposalsService: GrantProposalService,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this.initProposals();

    this.grantProposalsService.getDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
    });
  }

  initProposals() {
    this.loading = true;
    this.proposals$ = this.grantProposalsService.getUserProposal().pipe(
      delay(1500),
      finalize(() => {
        this.loading = false;
      })
    );
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

  clear(table: Table) {
    table.clear();
  }
}
