import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SubmitProposalService } from '../services/submit-proposal.service';

@Component({
  selector: 'app-post-doctoral',
  templateUrl: './post-doctoral.component.html',
  styleUrls: ['./post-doctoral.component.scss'],
})
export class PostDoctoralComponent implements OnInit {
  postDoctoralForm: FormGroup;

  constructor(private proposalFormService: SubmitProposalService) {}

  ngOnInit(): void {
    this.postDoctoralForm = this.proposalFormService.getDsDoctoralForm();
  }

  onSubmit() {
    console.log(this.postDoctoralForm.value);
  }
}
