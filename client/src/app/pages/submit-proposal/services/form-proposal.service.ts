import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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

    const teamMembers = new FormArray([]);
    form.setControl('teamMembers', teamMembers);

    return form;
  }

  getPostDoctoralForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

    const teamMembers = new FormArray([]);
    form.setControl('teamMembers', teamMembers);

    return form;
  }

  getSeedResearchForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

    const budgetParts = new FormArray([]);
    form.setControl('budgetParts', budgetParts);

    return form;
  }

  getDatasetCollectionForm(): FormGroup {
    const form = _.cloneDeep(this.parentForm);

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
}
