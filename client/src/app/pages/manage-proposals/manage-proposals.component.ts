import { Component, OnInit, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantType } from './models/grant-type.enum';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { FilesService } from 'src/app/files/services/files.service';
import { saveAs } from 'file-saver';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomFieldsDialogComponent } from './custom-fields-dialog/custom-fields-dialog.component';
import { UpdateStatusDialogComponent } from './update-status-dialog/update-status-dialog.component';
import { ProposalStatus } from './models/proposal-status.enum';
import { RoleEnum } from 'src/app/shared/enums/role.enum';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-proposals',
  templateUrl: './manage-proposals.component.html',
  styleUrls: ['./manage-proposals.component.scss'],
  providers: [DialogService],
})
export class ManageProposalsComponent implements OnInit {
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
  ];

  GrantTypeEnum = GrantType;
  private productsService = inject(ProductsService);

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

  constructor(
    private grantProposalsService: GrantProposalService,
    private filesService: FilesService
  ) {}
  ngOnInit(): void {
    this.initProposals();
  }

  initProposals() {
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
    const queryParams = {studyTitle: proposal.studyTitle,email: proposal.user.email};
    this.router.navigate(['manage-products'], {queryParams});
  }
}
