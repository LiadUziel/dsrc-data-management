import { Component, OnInit } from '@angular/core';
import { FormProposalService } from '../services/form-proposal.service';
import { FormGroup } from '@angular/forms';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environments';

@Component({
  selector: 'app-ds-doctoral',
  templateUrl: './ds-doctoral.component.html',
  styleUrls: ['./ds-doctoral.component.scss'],
})
export class DsDoctoralComponent implements OnInit {
  doctoralForm: FormGroup;

  loading = false;

  apiUrl = environment.apiUrl;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.doctoralForm = this.formProposalService.getDsDoctoralForm();
  }

  onSubmit() {
    this.loading = true;
    const proposal: GrantProposal = this.doctoralForm.value;
    proposal.type = 'DS_DOCTORAL';
    this.grantProposalService
      .createGrantProposal(proposal)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.doctoralForm.reset();
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

  onUpload(event) {
    this.toastr.info('File uploaded successfully');
  }
}
