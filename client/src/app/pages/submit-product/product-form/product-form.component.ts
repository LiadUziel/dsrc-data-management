import { Component, QueryList, ViewChildren } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductFormService } from '../services/product-form-service.service';
import { FileUpload } from 'primeng/fileupload';
import { Product } from '../interfaces/product.interface';
import { finalize } from 'rxjs';
import { GrantProposal } from 'src/app/shared/models/grant-proposal.interface';
import { FilesService } from '../../../files/services/files.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent {
  productForm: FormGroup;

  loading = false;

  public typeOfFundings: string[] = [];

  public SDGArray: string[] = [];
  studyTitles: string[] = [];

  @ViewChildren('fileUpload') pFormUpload: QueryList<any>;
  @ViewChildren('sdgOption') pFormSDGOptions: QueryList<any>;

  constructor(
    private toastr: ToastrService,
    private productFormService: ProductFormService,
    private filesService: FilesService
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

  onUpload(event: { files: File[] }, formControlName: string) {
    if (event.files.length) {
      const file = event.files[0];
      this.filesService.uploadFile(file).subscribe({
        next: ({ fileName }) => {
          this.productForm.get(formControlName).patchValue(fileName);
          this.toastr.info('File uploaded successfully');
        },
        error: () => {
          this.toastr.error('Error in upload file');
        },
      });
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
