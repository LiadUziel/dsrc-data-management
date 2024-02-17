import { Component, inject } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable, delay, finalize } from 'rxjs';
import { RoleEnum } from 'src/app/shared/enums/role.enum';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantType } from '../manage-proposals/models/grant-type.enum';
import { ProposalStatus } from '../manage-proposals/models/proposal-status.enum';
import { ReviewDialogComponent } from 'src/app/shared/components/review-dialog/review-dialog.component';
import { Table } from 'primeng/table';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-reviewers-page',
  templateUrl: './reviewers-page.component.html',
  styleUrls: ['./reviewers-page.component.scss'],
  providers: [DialogService],
})
export class ReviewersPageComponent {
  downloadUrl = environment.apiUrl + '/api/file/download/';

  proposals$: Observable<GrantProposal[]>;

  RoleEnum = RoleEnum;

  GrantTypeEnum = GrantType;
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
    this.proposals$ = this.grantProposalsService.getReviewerProposals().pipe(
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

  clear(table: Table) {
    table.clear();
  }
}
