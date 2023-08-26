import { Component, Input, OnInit, inject } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { FormProposalService } from '../../../pages/submit-proposal/services/form-proposal.service';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { ProductFormService } from '../../../pages/submit-product/services/product-form-service.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Role, User } from 'src/app/auth/interfaces/user-interface';
import { RoleEnum } from '../../enums/role.enum';

@Component({
  selector: 'app-multi-field',
  templateUrl: './multi-field.component.html',
  styleUrls: ['./multi-field.component.scss'],
})

export class MultiFieldComponent implements OnInit{
  @Input() form: FormGroup;
  @Input() formArrayName: 'teamMembers' | 'budgetParts' | 'researchTeam' | 'publications' | 'researchGrants';
  @Input() displayAction: 'Team Member' | 'Budget Part' | 'Research Team Member' |
   'publication resulting from the funding' | 'research grant that submitted to external granting agencies';

  formProposalService = inject(FormProposalService);
  productFormService = inject(ProductFormService);
  authService = inject(AuthService);

  users: User[];

  roles: Role[];
  RoleEnum = RoleEnum;

  ngOnInit(): void {
    // init users list
    this.authService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });

    // init roles list
    this.authService.getLoggedUser().subscribe({
      next: (loggedUser) => {
        this.roles = ['reviewer', 'submitter', 'teamMember'];
        if (loggedUser.roles.includes('admin')) {
          this.roles.push('admin');
        }
      },
    });
  }

  addField() {
    if (this.formArrayName === 'teamMembers') {
      this.addTeamMember();
    } else if (this.formArrayName === 'budgetParts') {
      this.addBudgetPart();
    }
    else if (this.formArrayName === 'researchTeam') {
      this.addResearchTeamMember();
    }
    else if (this.formArrayName === 'publications') {
      this.addPublication();
    }
    else if (this.formArrayName === 'researchGrants') {
      this.addResearchGrant();
    }
  }

  removeField(index: number) {
    if (this.formArrayName === 'teamMembers') {
      this.removeTeamMember(index);
    } else if (this.formArrayName === 'budgetParts') {
      this.removeBudgetPart(index);
    } else if (this.formArrayName === 'researchTeam') {
      this.removeResearchTeamMember(index);
    } else if (this.formArrayName === 'publications') {
      this.removePublication(index);
    }
    else if (this.formArrayName === 'researchGrants') {
      this.removeResearchGrant(index);
    }
  }

  // get all team members or budget parts or researchTeam or publications
  get fields(): FormArray {
    if (this.formArrayName === 'teamMembers') {
      return this.teamMembers;
    } else if (this.formArrayName === 'budgetParts') {
      return this.budgetParts;
    } else if (this.formArrayName === 'researchTeam') {
      return this.researchTeam;
    } else if (this.formArrayName === 'publications') {
      return this.publications;
    } else if (this.formArrayName === 'researchGrants') {
      return this.researchGrants;
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

  get researchTeam() {
    return this.form.get('researchTeam') as FormArray;
  }

  addResearchTeamMember() {
    return this.productFormService.addResearchTeamMember(this.form);
  }

  removeResearchTeamMember(index: number) {
    this.productFormService.removeTeamMember(this.form, index);
  }

  addPublication() {
    this.productFormService.addPublication(this.form);
  }

  removePublication(index: number) {
    this.productFormService.removePublication(this.form, index);
  }

  get publications() {
    return this.form.get('publications') as FormArray;
  }

  addResearchGrant() {
    this.productFormService.addResearchGrant(this.form);
  }

  removeResearchGrant(index: number) {
    this.productFormService.removeResearchGrant(this.form, index);
  }

  get researchGrants() {
    return this.form.get('researchGrants') as FormArray;
  }

  get statuses(): string[] {
    return this.productFormService.getResearchGrantStatuses();
  }

  get publicationStatuses(): string[] {
    return this.productFormService.getPublicationStatuses();
  }

  get publicationTypes(): string[] {
    return this.productFormService.getPublicationTypes();
  }

  get degrees(): string[] {
    return this.productFormService.getDegrees();
  }

  setIsOther(event) {
    this.productFormService.isOtherChosen = event.value === 'Other';
  }

  isOtherChosen(): boolean {
    return this.productFormService.isOtherChosen;
  }
}
