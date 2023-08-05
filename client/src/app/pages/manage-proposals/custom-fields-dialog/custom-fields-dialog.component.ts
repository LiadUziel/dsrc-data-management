import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { FormProposalService } from '../../submit-proposal/services/form-proposal.service';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { CustomFieldRaw } from 'src/app/shared/models/new-field-raw.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-custom-fields-dialog',
  templateUrl: './custom-fields-dialog.component.html',
  styleUrls: ['./custom-fields-dialog.component.scss'],
})
export class CustomFieldsDialogComponent implements OnInit {
  private readonly toastr = inject(ToastrService);
  private readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly formProposalService = inject(FormProposalService);
  private readonly grantProposalService = inject(GrantProposalService);

  proposal: GrantProposal;

  dynamicForm: FormGroup;

  // Custom fields from structure: {fieldName: string, value: string}[]
  rawExistsCustomFields: CustomFieldRaw[] = [];

  ngOnInit(): void {
    this.proposal = this.config.data.proposal;

    this.dynamicForm = this.formProposalService.getAddFieldsForm();

    this.initExistsCustomFields();
  }

  get fields() {
    return this.dynamicForm.get('fields') as FormArray;
  }

  addField() {
    this.formProposalService.addNewField(this.dynamicForm);
  }

  removeField(index: number) {
    this.formProposalService.removeNewField(this.dynamicForm, index);
  }

  private initExistsCustomFields() {
    this.rawExistsCustomFields = Object.entries(this.proposal.customFields).map(
      ([fieldName, value]) => ({ fieldName, value })
    );
    let i = 0;
    for (const customField of this.rawExistsCustomFields) {
      this.formProposalService.addNewField(this.dynamicForm);
      this.fields.at(i).patchValue(customField);
      i++;
    }
  }

  private hasDuplicateFieldNames() {
    const fieldNames = this.fields.value.map(
      (field: CustomFieldRaw) => field.fieldName
    );
    const uniqueFieldNames = new Set(fieldNames);
    return fieldNames.length !== uniqueFieldNames.size;
  }

  onSubmit() {
    if (this.hasDuplicateFieldNames()) {
      this.toastr.warning(`Field names must be unique!`);
      return;
    }

    const fields: CustomFieldRaw[] = this.dynamicForm.value.fields;
    this.grantProposalService
      .updateCustomFields(this.proposal, fields)
      .subscribe({
        next: (proposal) => {
          this.toastr.success(
            `The fields for ${proposal.studyTitle} were added!`
          );
          this.ref.close();
        },
        error: (err) => {
          this.toastr.error(`Something went wrong!`);
        },
      });
  }
}
