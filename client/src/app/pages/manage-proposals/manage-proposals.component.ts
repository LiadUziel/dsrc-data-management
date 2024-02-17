import { Component, OnInit, inject } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantType } from './models/grant-type.enum';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomFieldsDialogComponent } from './custom-fields-dialog/custom-fields-dialog.component';
import { UpdateStatusDialogComponent } from './update-status-dialog/update-status-dialog.component';
import { ProposalStatus } from './models/proposal-status.enum';
import { RoleEnum } from 'src/app/shared/enums/role.enum';
import { Router } from '@angular/router';
import { Table } from 'primeng/table';
import { ReviewDialogComponent } from 'src/app/shared/components/review-dialog/review-dialog.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-manage-proposals',
  templateUrl: './manage-proposals.component.html',
  styleUrls: ['./manage-proposals.component.scss'],
  providers: [DialogService],
})
export class ManageProposalsComponent implements OnInit {
  downloadUrl = environment.apiUrl + '/api/file/download/';

  proposals$: Observable<GrantProposal[]>;

  RoleEnum = RoleEnum;

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
    { field: 'BADepartment', header: 'BA Department' },
    { field: 'BAUniversity', header: 'BA University' },
    { field: 'BAAvg', header: 'BA Average' },
    { field: 'MADepartment', header: 'MA Department' },
    { field: 'MAUniversity', header: 'MA University' },
    { field: 'MAAvg', header: 'MA Average' },
    { field: 'PhDDepartment', header: 'PhD Department' },
    { field: 'PhDUniversity', header: 'PhD University' },
    { field: 'PhDAvg', header: 'PhD Average' },
  ];

  GrantTypeEnum = GrantType;

  private router = inject(Router);

  private readonly dialogService = inject(DialogService);

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
  colsSkeleton = new Array(12);

  constructor(private grantProposalsService: GrantProposalService) {}
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
    this.proposals$ = this.grantProposalsService.getAllProposals().pipe(
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
  openCustomFieldsDialog(proposal: GrantProposal) {
    const ref = this.dialogService.open(CustomFieldsDialogComponent, {
      header: `Manage Custom Fields For ${proposal.studyTitle}`,
      width: '60%',
      data: { proposal },
    });

    // render table after dialog is closed
    ref.onClose.subscribe(() => {
      this.initProposals();
    });
  }

  openReviewDialog(proposal: GrantProposal) {
    const ref = this.dialogService.open(ReviewDialogComponent, {
      header: `Review For "${proposal.studyTitle}"`,
      width: '60%',
      data: { proposal },
    });

    // render table after dialog is closed
    ref.onClose.subscribe(() => {
      this.initProposals();
    });
  }

  openUpdateStatusDialog(proposal: GrantProposal) {
    const ref = this.dialogService.open(UpdateStatusDialogComponent, {
      header: `Update Status For ${proposal.studyTitle}`,
      width: '60%',
      data: { proposal },
    });

    // render table after dialog is closed
    ref.onClose.subscribe(() => {
      this.initProposals();
    });
  }

  navigateToProposalProducts(proposal: GrantProposal) {
    const queryParams = {
      studyTitle: proposal.studyTitle,
      email: proposal.user.email,
    };
    this.router.navigate(['manage-products'], { queryParams });
  }

  clear(table: Table) {
    table.clear();
  }
}
