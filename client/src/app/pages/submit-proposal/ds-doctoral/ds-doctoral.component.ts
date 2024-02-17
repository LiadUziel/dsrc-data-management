import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormProposalService } from '../services/form-proposal.service';
import { FormGroup } from '@angular/forms';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { ToastrService } from 'ngx-toastr';
import { finalize } from 'rxjs';
import { FilesService } from '../../../files/services/files.service';

@Component({
  selector: 'app-ds-doctoral',
  templateUrl: './ds-doctoral.component.html',
  styleUrls: ['./ds-doctoral.component.scss'],
})
export class DsDoctoralComponent implements OnInit {
  doctoralForm: FormGroup;

  loading = false;

  departments: { name: string }[];
  universities: { name: string }[];

  @ViewChildren('fileUpload') pFormUpload: QueryList<any>;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService,
    private filesService: FilesService
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

  onUpload(event: { files: File[] }, formControlName: string) {
    if (event.files.length) {
      const file = event.files[0];
      this.filesService.uploadFile(file).subscribe({
        next: ({ fileName }) => {
          this.doctoralForm.get(formControlName).patchValue(fileName);
          this.toastr.info('File uploaded successfully');
        },
        error: () => {
          this.toastr.error('Error in upload file');
        },
      });
    }
  }

  getDepartments(departments) {
    this.departments = departments;
  }
}
