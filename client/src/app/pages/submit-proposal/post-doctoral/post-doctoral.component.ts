import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';
import { ToastrService } from 'ngx-toastr';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-doctoral',
  templateUrl: './post-doctoral.component.html',
  styleUrls: ['./post-doctoral.component.scss'],
})
export class PostDoctoralComponent implements OnInit {
  postDoctoralForm: FormGroup;

  loading = false;

  private apiUrl = environment.apiUrl;

  @ViewChildren('fileUpload') pFormUpload: QueryList<any>;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.postDoctoralForm = this.formProposalService.getPostDoctoralForm();
  }

  onSubmit() {
    this.loading = true;
    const proposal: GrantProposal = this.postDoctoralForm.value;
    proposal.type = 'POST_DOCTORAL';
    this.grantProposalService
      .createGrantProposal(proposal)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.postDoctoralForm.reset();
          for(let i = 0; i < this.pFormUpload['_results'].length; i++) {
            this.pFormUpload['_results'][i].clear();
          }
          this.toastr.success('Proposal submitted successfully');
        },
        error: (err) => {
          if (err.error.message.includes('jwt')) {
            this.toastr.error(
              'You are not logged in. Please login to submit a proposal'
            );
          } else {
            this.toastr.error('Proposal submission failed');
          }
        },
      });
  }

  onUpload(event, formControlName: string) {
    if (event.files.length > 0) {
      const file = event.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.http.post<any>(this.apiUrl + '/api/file/upload', formData).subscribe(
        (response) => {
          this.postDoctoralForm.get(formControlName).patchValue(`${response.filepath}`);
          this.toastr.info(response.message);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
}
}
