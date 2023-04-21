import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';
import { ToastrService } from 'ngx-toastr';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';

@Component({
  selector: 'app-post-doctoral',
  templateUrl: './post-doctoral.component.html',
  styleUrls: ['./post-doctoral.component.scss'],
})
export class PostDoctoralComponent implements OnInit {
  postDoctoralForm: FormGroup;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.postDoctoralForm = this.formProposalService.getPostDoctoralForm();
  }

  onSubmit() {
    const proposal: GrantProposal = this.postDoctoralForm.value;
    proposal.type = 'POST_DOCTORAL';
    this.grantProposalService.createGrantProposal(proposal).subscribe({
      next: (result) => {
        this.postDoctoralForm.reset();
        this.toastr.success('Proposal submitted successfully');
      },
      error: (err) => {
        this.toastr.error('Proposal submission failed');
      },
    });
  }
}
