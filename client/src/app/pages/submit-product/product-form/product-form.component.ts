import { HttpClient } from '@angular/common/http';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { ProductFormService } from '../services/product-form-service.service';
import { FileUpload } from 'primeng/fileupload';
import { Product } from '../interfaces/product.interface';
import { finalize } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup;

  loading = false;

  private apiUrl = environment.apiUrl;

  public typeOfFundings: string[] = [];

  public SDGArray: string[] = [];
  studyTitles: string[] = [];

  @ViewChildren('fileUpload') pFormUpload: QueryList<any>;
  @ViewChildren('sdgOption') pFormSDGOptions: QueryList<any>;

  constructor(
    private toastr: ToastrService,
    private http: HttpClient,
    private productFormService: ProductFormService
  ) {}

  ngOnInit(): void {
    this.productForm = new FormGroup({
      projectTitleThatWasGranted: new FormControl<string>('', [
        Validators.required,
      ]),
      typeOfFundingsReceivedFromDsrc: new FormControl<string>(null, [
        Validators.required,
      ]),
      catchyTitle: new FormControl<string>('', Validators.required),
      openingMotivatingSentence: new FormControl<string>(''),
      presentLink: new FormControl<string>(''),
      urlToAdd: new FormControl<string>(''),
      researchTeam: new FormArray([], Validators.required),
      oneSentenceSummarizing: new FormControl<string>(''),
      summarizingSentences: new FormControl<string>(''),
      conclusion: new FormControl<string>(''),
      uploadBlog: new FormControl<FileUpload>(null, [Validators.required]),
      uploadFigureOrVideo: new FormControl<FileUpload>(null, [
        Validators.required,
      ]),
      publications: new FormArray([], Validators.required),
      researchGrants: new FormArray([], Validators.required),
      SDG: new FormControl<string[]>([], Validators.required),
      government: new FormControl<string>(''),
      internationalCoopreration: new FormControl<string>(''),
      volunteerWork: new FormControl<string>(''),
      developCourses: new FormControl<string>(''),
    });
    this.getUserProposalsTitles();
  }

  onSubmit() {
    this.loading = true;
    const product: Product = this.productForm.value;
    this.productFormService
      .createProduct(product)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (result) => {
          this.productForm.reset();
          for (let i = 0; i < this.pFormUpload['_results'].length; i++) {
            this.pFormUpload['_results'][i].clear();
          }
          for (let i = 0; i < this.pFormSDGOptions['_results'].length; i++) {
            this.pFormSDGOptions['_results'][i].checkboxValue = false;
          }
          this.toastr.success('Product submitted successfully');
        },
        error: (err) => {
          if (err.error.message.includes('jwt')) {
            this.toastr.error(
              'You are not logged in. Please login to submit a product'
            );
          } else {
            this.toastr.error('Product submission failed');
          }
        },
      });
  }

  onUpload(event, formControlName: string) {
    if (event.files.length > 0) {
      const file = event.files[0];
      const formData = new FormData();
      formData.append('file', file);
      this.http.post<any>(this.apiUrl + '/api/file/upload', formData).subscribe(
        (response) => {
          this.productForm
            .get(formControlName)
            .patchValue(`${response.filepath}`);
          this.toastr.info(response.message);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }

  onChangeSDGOption(event, value: string) {
    if (event?.checked.length === 0) {
      const index = this.SDGArray.indexOf(value);
      if (index !== -1) {
        this.SDGArray.splice(index, 1);
      }
    } else {
      this.SDGArray.push(value);
    }
    this.productForm.get('SDG').patchValue(this.SDGArray);
  }

  getUserProposalsTitles() {
    let typesSet: Set<string> = new Set<string>();
    this.productFormService
      .getUserProposals()
      .pipe(
        finalize(() => {
          this.productFormService.parseTypesSet(typesSet, this.typeOfFundings);
        })
      )
      .subscribe((grantProposals: GrantProposal[]) => {
        grantProposals
          .filter(
            (grantProposal) =>
              grantProposal.status !== 'REJECTED' &&
              grantProposal.status !== 'PENDING'
          )
          .forEach((gp) => {
            this.studyTitles.push(gp.studyTitle);
            typesSet.add(gp.type);
          });
      });
  }
}
