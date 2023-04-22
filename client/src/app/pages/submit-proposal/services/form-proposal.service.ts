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
      sharedField1: new FormControl<string>('', Validators.required),
      sharedField2: new FormControl<string>('', Validators.required),
      sharedField3: new FormControl<number>(-1, Validators.required),
      sharedField4: new FormControl<boolean>(false, Validators.required),
    });

    return sharedForm;
  }

  getDsDoctoralForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

    form.addControl(
      'uniqueFieldDsDoctoral1',
      new FormControl<string>('', Validators.required)
    );
    form.addControl(
      'uniqueFieldDsDoctoral2',
      new FormControl<number>(-1, Validators.required)
    );

    return form;
  }

  getPostDoctoralForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

    form.addControl(
      'uniqueFieldPostDoctoral1',
      new FormControl<string>('', Validators.required)
    );
    form.addControl(
      'uniqueFieldPostDoctoral2',
      new FormControl<number>(-1, Validators.required)
    );

    return form;
  }

  getSeedResearchForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

    form.addControl(
      'uniqueFieldSeedResearch1',
      new FormControl<string>('', Validators.required)
    );
    form.addControl(
      'uniqueFieldSeedResearch2',
      new FormControl<number>(-1, Validators.required)
    );

    return form;
  }

  getDatasetCollectionForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

    form.addControl(
      'uniqueFieldDatasetCollection1',
      new FormControl<string>('', Validators.required)
    );
    form.addControl(
      'uniqueFieldDatasetCollection2',
      new FormControl<number>(-1, Validators.required)
    );

    return form;
  }
}
