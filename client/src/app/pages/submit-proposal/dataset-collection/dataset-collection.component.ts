import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { ToastrService } from 'ngx-toastr';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';

@Component({
  selector: 'app-dataset-collection',
  templateUrl: './dataset-collection.component.html',
  styleUrls: ['./dataset-collection.component.scss'],
})
export class DatasetCollectionComponent implements OnInit {
  dsCollectionForm: FormGroup;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.dsCollectionForm = this.formProposalService.getDatasetCollectionForm();
  }

  onSubmit() {
    const proposal: GrantProposal = this.dsCollectionForm.value;
    proposal.type = 'DATASET_COLLECTION';
    this.grantProposalService.createGrantProposal(proposal).subscribe({
      next: (result) => {
        this.dsCollectionForm.reset();
        this.toastr.success('Proposal submitted successfully');
      },
      error: (err) => {
        this.toastr.error('Proposal submission failed');
      },
    });
  }
}
