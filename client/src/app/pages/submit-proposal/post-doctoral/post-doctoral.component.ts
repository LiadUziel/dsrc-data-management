import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';

@Component({
  selector: 'app-post-doctoral',
  templateUrl: './post-doctoral.component.html',
  styleUrls: ['./post-doctoral.component.scss'],
})
export class PostDoctoralComponent implements OnInit {
  postDoctoralForm: FormGroup;

  constructor(private formProposalService: FormProposalService) {}

  ngOnInit(): void {
    this.postDoctoralForm = this.formProposalService.getPostDoctoralForm();
  }

  onSubmit() {
    console.log(this.postDoctoralForm.value);
  }
}
