import { Component, OnInit, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { FormProposalService } from '../../submit-proposal/services/form-proposal.service';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';
import { CustomFieldRaw } from 'src/app/shared/models/new-field-raw.interface';
import { ToastrService } from 'ngx-toastr';
import { ProductFormService } from '../../submit-product/services/product-form-service.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from '../../submit-product/interfaces/product.interface';

@Component({
  selector: 'app-custom-fields-dialog',
  templateUrl: './custom-fields-dialog.component.html',
  styleUrls: ['./custom-fields-dialog.component.scss'],
})
export class CustomFieldsDialogComponent implements OnInit {
  private readonly toastr = inject(ToastrService);
  readonly config = inject(DynamicDialogConfig);
  private readonly ref = inject(DynamicDialogRef);
  private readonly formProposalService = inject(FormProposalService);
  private readonly grantProposalService = inject(GrantProposalService);

  private readonly formProductService = inject(ProductFormService);
  private readonly productsService = inject(ProductsService);

  product: Product;

  proposal: GrantProposal;

  dynamicForm: FormGroup;

  // Custom fields from structure: {fieldName: string, value: string}[]
  rawExistsCustomFields: CustomFieldRaw[] = [];

  ngOnInit(): void {
    if (this.config.data.proposal) {
      this.proposal = this.config.data.proposal;
      this.dynamicForm = this.formProposalService.getAddFieldsForm();
      this.initProposalExistsCustomFields();
    }
    else if (this.config.data.product) {
      this.product = this.config.data.product;
      this.dynamicForm = this.formProductService.getAddFieldsForm();
      this.initProductExistsCustomFields();
    }

    
  }

  get fields() {
    return this.dynamicForm.get('fields') as FormArray;
  }

  addField() {
    if (this.config.data.proposal) {
      this.formProposalService.addNewField(this.dynamicForm);
    }
    else if (this.config.data.product) {
      this.formProductService.addNewField(this.dynamicForm);
    }
  }

  removeField(index: number) {
    this.formProposalService.removeNewField(this.dynamicForm, index);
  }

  private initProposalExistsCustomFields() {
    if (this.proposal?.customFields) {
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
  }

  private initProductExistsCustomFields() {
    if (this.product?.customFields) {
      this.rawExistsCustomFields = Object.entries(this.product.customFields).map(
        ([fieldName, value]) => ({ fieldName, value })
      );
      let i = 0;
      for (const customField of this.rawExistsCustomFields) {
        this.formProductService.addNewField(this.dynamicForm);
        this.fields.at(i).patchValue(customField);
        i++;
      }
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
    if (this.config.data.proposal) {
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
    
    else if (this.config.data.product) {
      this.productsService
      .updateCustomFields(this.product, fields)
      .subscribe({
        next: (product) => {
          this.toastr.success(
            `The fields for ${product.projectTitleThatWasGranted} were added!`
          );
          this.ref.close();
        },
        error: (err) => {
          this.toastr.error(`Something went wrong!`);
        },
      });
    }
  }
}
