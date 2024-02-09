import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormProposalService } from '../services/form-proposal.service';
import { FormGroup } from '@angular/forms';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ds-doctoral',
  templateUrl: './ds-doctoral.component.html',
  styleUrls: ['./ds-doctoral.component.scss'],
})
export class DsDoctoralComponent implements OnInit {
  doctoralForm: FormGroup;

  loading = false;

  private apiUrl = environment.apiUrl;

  departments: { name: string }[];
  universities: { name: string }[];

  @ViewChildren('fileUpload') pFormUpload: QueryList<any>;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.doctoralForm = this.formProposalService.getDsDoctoralForm();
    this.grantProposalService
      .getDepartments()
      .subscribe((departments) => (this.departments = departments));
    this.grantProposalService
      .getUniversities()
      .subscribe((universities) => (this.universities = universities));
  }

  onSubmit() {
    this.loading = true;
    const proposal: GrantProposal = this.doctoralForm.value;
    proposal.type = 'DS_DOCTORAL';
    this.grantProposalService
      .createGrantProposal(proposal)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.doctoralForm.reset();
          for (let i = 0; i < this.pFormUpload['_results'].length; i++) {
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
          this.doctoralForm
            .get(formControlName)
            .patchValue(`${response.filepath}`);
          this.toastr.info(response.message);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  getDepartments(departments) {
    this.departments = departments;
  }
}
