import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

    const teamMembers = new FormArray([]);
    form.setControl('teamMembers', teamMembers);

    form.addControl('uploadCV', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl('uploadDescription', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl('uploadGradeTAndC', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl('uploadWorkCommitment', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl(
      'uploadRecommendationLetter',
      new FormControl<FileUpload>(null, [Validators.required])
    );
    form.addControl(
      'uploadContactRecommenders',
      new FormControl<FileUpload>(null, [Validators.required])
    );

    return form;
  }

  getPostDoctoralForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

    const teamMembers = new FormArray([]);
    form.setControl('teamMembers', teamMembers);

    form.addControl('uploadCV', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl('uploadDescription', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl('uploadGradeTAndC', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl('uploadWorkCommitment', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl(
      'uploadRecommendationLetter',
      new FormControl<FileUpload>(null, [Validators.required])
    );
    form.addControl(
      'uploadContactRecommenders',
      new FormControl<FileUpload>(null, [Validators.required])
    );

    return form;
  }

  getSeedResearchForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

    const teamMembers = new FormArray([]);
    form.setControl('teamMembers', teamMembers);

    const budgetParts = new FormArray([]);
    form.setControl('budgetParts', budgetParts);

    form.addControl('uploadResearchIntro', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl(
      'uploadInnovationProject',
      new FormControl<FileUpload>(null, [Validators.required])
    );
    form.addControl('uploadExternalFunding', new FormControl<FileUpload>(null, [Validators.required]));

    return form;
  }

  getDatasetCollectionForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);
    const teamMembers = new FormArray([]);
    form.setControl('teamMembers', teamMembers);

    const budgetParts = new FormArray([]);
    form.setControl('budgetParts', budgetParts);
    form.addControl('uploadResearchIntro', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl(
      'uploadInnovationProject',
      new FormControl<FileUpload>(null, [Validators.required])
    );
    form.addControl('uploadDatasetInfo', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl('uploadEthics', new FormControl<FileUpload>(null, [Validators.required]));
    form.addControl('uploadCopyrights', new FormControl<FileUpload>(null, [Validators.required]));
    return form;
  }

  getAddFieldsForm(): FormGroup {
    const form = new FormGroup({
      fields: new FormArray([]),
    });
    return form;
  }

  /**
   *
   * @param form
   * add team member instance to team members array for given form
   */
  addTeamMember(form: FormGroup) {
    const teamMemberControl = new FormGroup({
      memberName: new FormControl('', Validators.required),
      memberEmail: new FormControl('', [Validators.required, Validators.email]),
      memberDepartment: new FormControl('', Validators.required),
      memberRole: new FormControl('', Validators.required),
    });

    this.getTeamMembers(form).push(teamMemberControl);
  }

  removeTeamMember(form: FormGroup, index: number) {
    this.getTeamMembers(form).removeAt(index);
  }

  /**
   *
   * @param form
   * @returns team members array from given form
   */
  getTeamMembers(form: FormGroup) {
    return form.get('teamMembers') as FormArray;
  }

  addBudgetPart(form: FormGroup) {
    const budgetPartControl = new FormGroup({
      reason: new FormControl<string>('', Validators.required),
      amount: new FormControl<number>(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
    });

    this.getBudgetParts(form).push(budgetPartControl);
  }

  removeBudgetPart(form: FormGroup, index: number) {
    this.getBudgetParts(form).removeAt(index);
  }

  getBudgetParts(form: FormGroup) {
    return form.get('budgetParts') as FormArray;
  }

  // Dynamic form - add fields form
  addNewField(form: FormGroup) {
    const fieldControl = new FormGroup({
      fieldName: new FormControl<string>('', Validators.required),
      value: new FormControl<string>('', Validators.required),
    });

    this.getNewFields(form).push(fieldControl);
  }

  removeNewField(form: FormGroup, index: number) {
    this.getNewFields(form).removeAt(index);
  }

  getNewFields(form: FormGroup) {
    return form.get('fields') as FormArray;
  }
}
