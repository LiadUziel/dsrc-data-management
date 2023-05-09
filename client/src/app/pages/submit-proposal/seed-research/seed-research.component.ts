import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';
import { ToastrService } from 'ngx-toastr';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-seed-research',
  templateUrl: './seed-research.component.html',
  styleUrls: ['./seed-research.component.scss'],
})
export class SeedResearchComponent implements OnInit {
  seedForm: FormGroup;

  loading = false;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.seedForm = this.formProposalService.getSeedResearchForm();
  }

  onSubmit() {
    this.loading = true;
    const proposal: GrantProposal = this.seedForm.value;
    proposal.type = 'SEED_RESEARCH';
    this.grantProposalService
      .createGrantProposal(proposal)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.seedForm.reset();
          this.toastr.success('Proposal submitted successfully');
        },
        error: (err) => {
          if (err.error.message.includes('jwt')) {
            this.toastr.error(
              'You are not logged in. Please login to submit a proposal'
            );
          } else {
            this.toastr.error('Proposal submission failed');
          }
        },
      });
  }
}
