import { Component, OnInit } from '@angular/core';
import { SubmitProposalService } from '../services/submit-proposal.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-ds-doctoral',
  templateUrl: './ds-doctoral.component.html',
  styleUrls: ['./ds-doctoral.component.scss'],
})
export class DsDoctoralComponent implements OnInit {
  doctoralForm: FormGroup;

  constructor(private proposalFormService: SubmitProposalService) {}

  ngOnInit(): void {
    this.doctoralForm = this.proposalFormService.getDsDoctoralForm();
  }

  onSubmit() {
    console.log(this.doctoralForm.value);
  }
}
