import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { ProposalStatus } from '../models/proposal-status.enum';

@Component({
  selector: 'app-update-status-dialog',
  templateUrl: './update-status-dialog.component.html',
  styleUrls: ['./update-status-dialog.component.scss'],
})
export class UpdateStatusDialogComponent implements OnInit {
  private readonly toastr = inject(ToastrService);
  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly grantProposalService = inject(GrantProposalService);

  proposal: GrantProposal;

  status: 'PENDING' | 'PARTIALLY_APPROVED' | 'APPROVED' | 'REJECTED';

  optionMessages = {
    PENDING: '',
    PARTIALLY_APPROVED: '',
    APPROVED: '',
    REJECTED: '',
  };

  amountGiven: number;

  ProposalStatus = ProposalStatus;

  loading = false;

  ngOnInit(): void {
    this.proposal = this.config.data.proposal;

    this.status = this.proposal.status;

    const { amountRequested } = this.proposal;
    const { firstName, lastName } = this.proposal.user;
    this.optionMessages = {
      PENDING: `In this option, no amount has yet been approved for this grant proposal`,
      PARTIALLY_APPROVED: `In this option you can choose a given amount between 0 and ${amountRequested}₪ (which is the amount requested by ${firstName} ${lastName})`,
      APPROVED: `This option means that the entire amount requested has been received (${amountRequested}₪)`,
      REJECTED: `This option means that the proposal was rejected and the applicant did not receive any money at all`,
    };
  }

  updateProposalStatus() {
    this.loading = true;

    if (this.status === 'PENDING' || this.status === 'REJECTED') {
      this.amountGiven = 0;
    } else if (this.status === 'APPROVED') {
      this.amountGiven = this.proposal.amountRequested;
    }

    this.grantProposalService
      .updateProposalStatus(this.proposal._id, this.status, this.amountGiven)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (proposal: GrantProposal) => {
          this.toastr.success('Proposal status updated successfully');
          this.ref.close(proposal);
        },
        error: (err) => {
          this.toastr.error('Error updating proposal status');
        },
      });
  }
}
