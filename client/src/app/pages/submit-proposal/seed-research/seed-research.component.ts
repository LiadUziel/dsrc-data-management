import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubmitProposalService } from '../services/submit-proposal.service';

@Component({
  selector: 'app-seed-research',
  templateUrl: './seed-research.component.html',
  styleUrls: ['./seed-research.component.scss'],
})
export class SeedResearchComponent implements OnInit {
  seedForm: FormGroup;

  constructor(private proposalFormService: SubmitProposalService) {}

  ngOnInit(): void {
    this.seedForm = this.proposalFormService.getSeedResearchForm();
  }

  onSubmit() {
    console.log(this.seedForm.value);
  }
}
