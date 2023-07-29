import { Component, Input, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormProposalService } from '../services/form-proposal.service';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';

@Component({
  selector: 'app-multi-field',
  templateUrl: './multi-field.component.html',
  styleUrls: ['./multi-field.component.scss'],
})
export class MultiFieldComponent {
  @Input() form: FormGroup;
  @Input() formArrayName: 'teamMembers' | 'budgetParts';
  @Input() displayAction: 'Team Member' | 'Budget Part';

  formProposalService = inject(FormProposalService);

  addField() {
    if (this.formArrayName === 'teamMembers') {
      this.addTeamMember();
    } else if (this.formArrayName === 'budgetParts') {
      this.addBudgetPart();
    }
  }

  removeField(index: number) {
    if (this.formArrayName === 'teamMembers') {
      this.removeTeamMember(index);
    } else if (this.formArrayName === 'budgetParts') {
      this.removeBudgetPart(index);
    }
  }

  // get all team members or budget parts
  get fields(): FormArray {
    if (this.formArrayName === 'teamMembers') {
      return this.teamMembers;
    } else if (this.formArrayName === 'budgetParts') {
      return this.budgetParts;
    }
    return null;
  }

  addTeamMember() {
    this.formProposalService.addTeamMember(this.form);
  }

  removeTeamMember(index: number) {
    this.formProposalService.removeTeamMember(this.form, index);
  }

  get teamMembers() {
    return this.form.get('teamMembers') as FormArray;
  }

  addBudgetPart() {
    this.formProposalService.addBudgetPart(this.form);
  }

  removeBudgetPart(index: number) {
    this.formProposalService.removeBudgetPart(this.form, index);
  }

  get budgetParts() {
    return this.form.get('budgetParts') as FormArray;
  }

  get totalBudget(): number {
    const budgetParts = this.budgetParts.value;
    if (budgetParts.length > 0) {
      return budgetParts.reduce(
        (acc: number, curr: BudgetPart) => acc + curr.amount,
        0
      );
    }
    return 0;
  }
}
