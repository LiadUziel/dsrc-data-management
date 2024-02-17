import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { ToastrService } from 'ngx-toastr';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { finalize } from 'rxjs';
import { FilesService } from '../../../files/services/files.service';

@Component({
  selector: 'app-dataset-collection',
  templateUrl: './dataset-collection.component.html',
  styleUrls: ['./dataset-collection.component.scss'],
})
export class DatasetCollectionComponent implements OnInit {
  dsCollectionForm: FormGroup;

  loading = false;

  @ViewChildren('fileUpload') pFormUpload: QueryList<any>;

  constructor(
    private formProposalService: FormProposalService,
    private grantProposalService: GrantProposalService,
    private toastr: ToastrService,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this.dsCollectionForm = this.formProposalService.getDatasetCollectionForm();
  }

  onSubmit() {
    this.loading = true;
    const proposal: GrantProposal = this.dsCollectionForm.value;
    proposal.type = 'DATASET_COLLECTION';
    this.grantProposalService
      .createGrantProposal(proposal)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.dsCollectionForm.reset();
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
          this.dsCollectionForm.get(formControlName).patchValue(fileName);
          this.toastr.info('File uploaded successfully');
        },
        error: () => {
          this.toastr.error('Error in upload file');
        },
      });
    }
  }
}
