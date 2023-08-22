import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Observable, Subject, map } from 'rxjs';
import { GrantType } from '../../manage-proposals/models/grant-type.enum';
import { FilesService } from 'src/app/files/services/files.service';
import { saveAs } from 'file-saver';
import { DialogService } from 'primeng/dynamicdialog';
import { CustomFieldsDialogComponent } from '../../manage-proposals/custom-fields-dialog/custom-fields-dialog.component';
import { Product } from '../../submit-product/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Table } from 'primeng/table';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
  providers: [DialogService],
})
export class ManageProductsComponent implements OnInit {

  @ViewChild('productsTable') productsTable!: Table;

  products$: Observable<Product[]>;

  // These are the columns and values that will also appear in the Excel export
  cols = [
    { field: 'typeOfFundingsReceivedFromDsrc', header: 'Grant Type' },
    { field: 'user.firstName', header: 'First Name' },
    { field: 'user.lastName', header: 'Last Name' },
    { field: 'user.email', header: 'Email' },
    { field: 'projectTitleThatWasGranted', header: 'Study Title' },
    { field: 'catchyTitle', header: 'Catchy Title' },
    { field: 'applicationDate', header: 'Application Date' },
    { field: 'openingMotivatingSentence', header: 'opening motivating sentence for your research' },
    { field: 'presentLink', header: 'present a link to a fact from the media that is related and invokes interest' },
    { field: 'urlToAdd', header: 'URL to add to the previous sentence' },
    { field: 'oneSentenceSummarizing', header: 'One sentence summarizing what your research did to address that motivating need' },
    // { field: 'researchTeam', header: 'Resaerch team' },
    { field: 'summarizingSentences', header: '2-3 sentences that summarize the contribution and links to papers or abstracts that resulted' },
    { field: 'conclusion', header: 'Conclusion' },
    { field: 'uploadBlog', header: 'upload blog' },
    { field: 'uploadFigureOrVideo', header: 'upload figure or video' },
    // { field: 'publications', header: 'publications' },
    // { field: 'researchGrants', header: 'researchGrants' },
    { field: 'SDG', header: 'SDG (Sustainable Development Goals)' },
    { field: 'government', header: 'Is your project related to cooperation with government (local  or national) or with non-profit organizations in order to develop policies?' },
    { field: 'internationalCoopreration', header: 'Did the project lead to international cooperation?' },
    { field: 'volunteerWork', header: 'Does the project include students volunteer work?' },
    { field: 'developCourses', header: 'Are you developing courses related to the research?' },
  ];

  GrantTypeEnum = GrantType;
  private readonly dialogService = inject(DialogService);
  private studyTitleQueryParam: string = '';
  private emailQueryParam: string = '';

  constructor(
    private ProductsService: ProductsService,
    private filesService: FilesService,
    private route: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.studyTitleQueryParam = this.route.snapshot.queryParams['studyTitle'] ?? '';
      this.emailQueryParam = this.route.snapshot.queryParams['email'] ?? '';
      this.initProducts();
    });
  }

  initProducts() {
    if (this.studyTitleQueryParam !== '' && this.emailQueryParam !== '') {
      this.products$ = this.ProductsService.getUserProductsByUser(this.emailQueryParam).pipe(
        map((products: Product[]) => {
          return products.filter(product => product.projectTitleThatWasGranted === this.studyTitleQueryParam);
        }));
    }
    else {
      this.products$ = this.ProductsService.getAllProducts();
    }
  }

  getFile(filePath: string): void {
    this.filesService.downloadFile(filePath).subscribe(
      (data) => {
        saveAs(data, filePath);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openCustomFieldsDialog(product: Product) {
    const ref = this.dialogService.open(CustomFieldsDialogComponent, {
      header: `Manage Custom Fields For ${product.projectTitleThatWasGranted} product`,
      width: '60%',
      data: { product },
  
    });

    // render table after dialog is closed
    ref.onClose.subscribe(() => {
      this.initProducts();
    });
  }
}




  

