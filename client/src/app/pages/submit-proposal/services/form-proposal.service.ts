import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';
import { FileUpload } from 'primeng/fileupload';

@Injectable({
  providedIn: 'root',
})
export class FormProposalService {
  parentForm: FormGroup = this.getParentForm();

  constructor() {}

  getParentForm() {
    const sharedForm: FormGroup = new FormGroup({
      department: new FormControl<string>('', Validators.required),
      studyTitle: new FormControl<string>('', Validators.required),
      amountRequested: new FormControl<number>(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    return sharedForm;
  }

  getDsDoctoralForm(): FormGroup {
    const form: FormGroup = _.cloneDeep(this.parentForm);
    form.addControl('uploadCV', new FormControl<FileUpload>(null));
    form.addControl('uploadDescription', new FormControl<FileUpload>(null));
    form.addControl('uploadGradeTAndC', new FormControl<FileUpload>(null));
    form.addControl('uploadWorkCommitment', new FormControl<FileUpload>(null));
    form.addControl('uploadRecommendationLetter', new FormControl<FileUpload>(null));
    form.addControl('uploadContactRecommenders', new FormControl<FileUpload>(null));    
    return form;
  }

  getPostDoctoralForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);
    form.addControl('uploadCV', new FormControl<FileUpload>(null));
    form.addControl('uploadDescription', new FormControl<FileUpload>(null));
    form.addControl('uploadGradeTAndC', new FormControl<FileUpload>(null));
    form.addControl('uploadWorkCommitment', new FormControl<FileUpload>(null));
    form.addControl('uploadRecommendationLetter', new FormControl<FileUpload>(null));
    form.addControl('uploadContactRecommenders', new FormControl<FileUpload>(null)); 
    return form;
  }

  getSeedResearchForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);
    form.addControl('uploadResearchIntro', new FormControl<FileUpload>(null));
    form.addControl('uploadInnovationProject', new FormControl<FileUpload>(null));
    form.addControl('uploadTeam', new FormControl<FileUpload>(null));
    form.addControl('uploadBudget', new FormControl<FileUpload>(null));
    form.addControl('uploadExternalFunding', new FormControl<FileUpload>(null)); 
    return form;
  }

  getDatasetCollectionForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);
    form.addControl('uploadResearchIntro', new FormControl<FileUpload>(null));
    form.addControl('uploadInnovationProject', new FormControl<FileUpload>(null));
    form.addControl('uploadDatasetInfo', new FormControl<FileUpload>(null));
    form.addControl('uploadTeam', new FormControl<FileUpload>(null));
    form.addControl('uploadBudget', new FormControl<FileUpload>(null)); 
    form.addControl('uploadEthics', new FormControl<FileUpload>(null)); 
    form.addControl('uploadCopyrights', new FormControl<FileUpload>(null)); 
    return form;
  }
}
