import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';

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
    const form = _.cloneDeep(this.parentForm);
    // TODO - add unique fields for DS Doctoral
    return form;
  }

  getPostDoctoralForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);
    // TODO - add unique fields for Post Doctoral
    return form;
  }

  getSeedResearchForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);
    // TODO - add unique fields for Seed Research

    return form;
  }

  getDatasetCollectionForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);
    // TODO - add unique fields for Dataset Collection

    return form;
  }
}
