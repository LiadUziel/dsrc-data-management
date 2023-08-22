import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GrantProposalService } from '../../services/grant-proposal.service';
import { GrantProposal } from '../../models/grant-proposal.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.scss'],
})
export class ReviewDialogComponent implements OnInit {
  proposal: GrantProposal;
  loggedUser;

  reviewText: string;

  loading = false;

  private readonly toastr = inject(ToastrService);
  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly grantProposalService = inject(GrantProposalService);
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.proposal = this.config.data.proposal;

    this.authService.getLoggedUser().subscribe({
      next: (user) => {
        this.loggedUser = user;
        const { email } = user;

        this.initReviewText(email);
      },
    });
  }

  private initReviewText(email: string) {
    this.reviewText = '';

    // find review of logged user
    if (this.proposal.reviews) {
      for (const review of this.proposal.reviews) {
        const { reviewText, writerEmail } = review;

        if (writerEmail === email) {
          this.reviewText = reviewText;
        }
      }
    }
  }

  onSendReview() {
    this.loading = true;
    if (!this.reviewText) {
      this.reviewText = 'This review was deleted or empty';
    }
    const id = this.proposal._id;

    const { email } = this.loggedUser;

    this.grantProposalService
      .sendReview(id, this.reviewText, email)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.toastr.success('Proposal reviews updated successfully');
          this.ref.close(this.proposal);
        },
        error: (err) => {
          this.toastr.error('Some error occurred');
        },
      });
  }
}
