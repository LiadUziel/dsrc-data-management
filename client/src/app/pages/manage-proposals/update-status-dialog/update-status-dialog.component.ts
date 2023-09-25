import { Component, OnInit, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { ProposalStatus } from '../models/proposal-status.enum';
import { ProductBlogStatus } from '../../manage-products/Models/product-blog-status.enum';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from '../../submit-product/interfaces/product.interface';

@Component({
  selector: 'app-update-status-dialog',
  templateUrl: './update-status-dialog.component.html',
  styleUrls: ['./update-status-dialog.component.scss'],
})
export class UpdateStatusDialogComponent implements OnInit {
  private readonly toastr = inject(ToastrService);
  readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly grantProposalService = inject(GrantProposalService);
  private readonly productService = inject(ProductsService);

  proposal: GrantProposal;

  product: Product;

  status: 'PENDING' | 'PARTIALLY_APPROVED' | 'APPROVED' | 'REJECTED';

  blogStatus: 'APPEARED_IN_RESEARCH_BLOG' | 'TO_APPEAR_IN_BLOG' | 'SENT_A_DRAFT' | 'DID_NOT_SUBMIT' |
              'SENT_REMINDERS';

  optionMessages = {
    PENDING: '',
    PARTIALLY_APPROVED: '',
    APPROVED: '',
    REJECTED: '',
  };

  amountGiven: number;

  ProposalStatus = ProposalStatus;

  ProductBlogStatus = ProductBlogStatus;

  loading = false;

  ngOnInit(): void {
    if (this.config.data.proposal) {
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

    else if (this.config.data.product) {
      this.product = this.config.data.product;
      this.blogStatus = this.product.blogStatus;
    }
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

  updateProductStatus() {
    this.loading = true;

    this.productService
      .updateProductBlogStatus(this.product._id, this.blogStatus)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (product: Product) => {
          this.toastr.success('Product blog status updated successfully');
          this.ref.close(product);
        },
        error: (err) => {
          this.toastr.error('Error updating product blog status');
        },
      });
  }
}
