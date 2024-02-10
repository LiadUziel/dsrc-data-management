import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../interfaces/product.interface';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GrantProposalService } from 'src/app/shared/services/grant-proposal.service';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  apiUrl = environment.apiUrl;

  isOtherChosen: boolean = false;

  constructor(
    private tokenService: TokenStorageService,
    private http: HttpClient,
    private grantProposalService: GrantProposalService
  ) {}

  parseTypesSet(typesSet: Set<string>, typesOfFunding: string[]) {
    for (const type of typesSet) {
      switch (type) {
        case 'DS_DOCTORAL':
          typesOfFunding.push('Data science doctoral');
          break;
        case 'POST_DOCTORAL':
          typesOfFunding.push('PhD/PostDoc fellowship');
          break;
        case 'SEED_RESEARCH':
          typesOfFunding.push('Seed research');
          break;
        case 'DATASET_COLLECTION':
          typesOfFunding.push('Dataset research');
          break;
      }
    }
    typesOfFunding.push('Project supervision by data scientist');
    typesOfFunding.push('VATAT');
  }

  getDegrees() {
    return ['MSc', 'PhD', 'Prof.', 'Other'];
  }

  addResearchTeamMember(form: FormGroup) {
    const researchTeamControl = new FormGroup({
      firstName: new FormControl<string>('', Validators.required),
      lastName: new FormControl<string>('', Validators.required),
      degree: new FormControl<string>(null, [Validators.required]),
      urlOfPersonalWebsite: new FormControl<string>(''),
    });

    this.getResearchTeam(form).push(researchTeamControl);
  }

  getResearchTeam(form: FormGroup) {
    return form.get('researchTeam') as FormArray;
  }

  removeTeamMember(form: FormGroup, index: number) {
    this.getResearchTeam(form).removeAt(index);
  }

  addPublication(form: FormGroup) {
    const publicationControl = new FormGroup({
      publicationName: new FormControl<string>(''),
      publicationStatus: new FormControl<string>(null),
      publicationTypes: new FormControl<string>(null),
      otherPublicationType: new FormControl<string>(''),
    });

    this.getPublications(form).push(publicationControl);
  }

  removePublication(form: FormGroup, index: number) {
    this.getPublications(form).removeAt(index);
  }

  getPublications(form: FormGroup) {
    return form.get('publications') as FormArray;
  }

  addResearchGrant(form: FormGroup) {
    const researchGrantControl = new FormGroup({
      coauthors: new FormControl<string>('', Validators.required),
      nameOfGrantProposal: new FormControl<string>('', Validators.required),
      grantingAgency: new FormControl<string>('', Validators.required),
      year: new FormControl<number>(null, [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
      ]),
      status: new FormControl<string>(null, Validators.required),
    });

    this.getResearchGrants(form).push(researchGrantControl);
  }

  removeResearchGrant(form: FormGroup, index: number) {
    this.getResearchGrants(form).removeAt(index);
  }

  getResearchGrants(form: FormGroup) {
    return form.get('researchGrants') as FormArray;
  }

  getResearchGrantStatuses(): string[] {
    return ['submitted', 'granted', 'not granted'];
  }

  getPublicationStatuses(): string[] {
    return ['progress', 'submitted', 'accepted'];
  }

  getPublicationTypes(): string[] {
    return [
      'Thesis',
      'Presentation',
      'Organization of events',
      'Article',
      'Media',
      'Journal paper',
      'Conference paper',
      'Web page',
      'Report',
      'Other',
    ];
  }

  createProduct(product: Product) {
    const { href } = new URL('/api/product', this.apiUrl);
    const token = this.tokenService.getToken();
    return this.http.post<Product>(href, product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  getUserProposals() {
    return this.grantProposalService.getUserProposal();
  }

  getAddFieldsForm(): FormGroup {
    const form = new FormGroup({
      fields: new FormArray([]),
    });
    return form;
  }

  // Dynamic form - add fields form
  addNewField(form: FormGroup) {
    const fieldControl = new FormGroup({
      fieldName: new FormControl<string>('', Validators.required),
      value: new FormControl<string>('', Validators.required),
    });

    this.getNewFields(form).push(fieldControl);
  }

  getNewFields(form: FormGroup) {
    return form.get('fields') as FormArray;
  }
}
