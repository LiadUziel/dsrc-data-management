import { Component, inject } from '@angular/core';
import * as saveAs from 'file-saver';
import { DialogService } from 'primeng/dynamicdialog';
import { Observable } from 'rxjs';
import { FilesService } from 'src/app/files/services/files.service';
import { RoleEnum } from 'src/app/shared/enums/role.enum';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantType } from '../manage-proposals/models/grant-type.enum';
import { ProposalStatus } from '../manage-proposals/models/proposal-status.enum';
import { ReviewDialogComponent } from 'src/app/shared/components/review-dialog/review-dialog.component';

@Component({
  selector: 'app-reviewers-page',
  templateUrl: './reviewers-page.component.html',
  styleUrls: ['./reviewers-page.component.scss'],
  providers: [DialogService],
})
export class ReviewersPageComponent {
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

  constructor(
    private grantProposalsService: GrantProposalService,
    private filesService: FilesService
  ) {}
  ngOnInit(): void {
    this.initProposals();
  }

  initProposals() {
    this.proposals$ = this.grantProposalsService.getReviewerProposals();
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
}
