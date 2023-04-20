import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';

@Component({
  selector: 'app-dataset-collection',
  templateUrl: './dataset-collection.component.html',
  styleUrls: ['./dataset-collection.component.scss'],
})
export class DatasetCollectionComponent implements OnInit {
  dsCollectionForm: FormGroup;

  constructor(private formProposalService: FormProposalService) {}

  ngOnInit(): void {
    this.dsCollectionForm = this.formProposalService.getDatasetCollectionForm();
  }

  onSubmit() {
    console.log(this.dsCollectionForm.value);
  }
}
