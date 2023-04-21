import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';
import { ToastrService } from 'ngx-toastr';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';

@Component({
  selector: 'app-seed-research',
  templateUrl: './seed-research.component.html',
  styleUrls: ['./seed-research.component.scss'],
})
export class SeedResearchComponent implements OnInit {
  seedForm: FormGroup;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.seedForm = this.formProposalService.getSeedResearchForm();
  }

  onSubmit() {
    const proposal: GrantProposal = this.seedForm.value;
    proposal.type = 'SEED_RESEARCH';
    this.grantProposalService.createGrantProposal(proposal).subscribe({
      next: (result) => {
        this.seedForm.reset();
        this.toastr.success('Proposal submitted successfully');
      },
      error: (err) => {
        this.toastr.error('Proposal submission failed');
      },
    });
  }
}
