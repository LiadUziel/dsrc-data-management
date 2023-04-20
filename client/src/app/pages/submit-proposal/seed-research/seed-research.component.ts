import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';

@Component({
  selector: 'app-seed-research',
  templateUrl: './seed-research.component.html',
  styleUrls: ['./seed-research.component.scss'],
})
export class SeedResearchComponent implements OnInit {
  seedForm: FormGroup;

  constructor(private formProposalService: FormProposalService) {}

  ngOnInit(): void {
    this.seedForm = this.formProposalService.getSeedResearchForm();
  }

  onSubmit() {
    console.log(this.seedForm.value);
  }
}
