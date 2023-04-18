import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubmitProposalService } from '../services/submit-proposal.service';

@Component({
  selector: 'app-dataset-collection',
  templateUrl: './dataset-collection.component.html',
  styleUrls: ['./dataset-collection.component.scss'],
})
export class DatasetCollectionComponent implements OnInit {
  dsCollectionForm: FormGroup;

  constructor(private proposalFormService: SubmitProposalService) {}

  ngOnInit(): void {
    this.dsCollectionForm = this.proposalFormService.getDsDoctoralForm();
  }

  onSubmit() {
    console.log(this.dsCollectionForm.value);
  }
}
