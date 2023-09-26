import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesService } from 'src/app/files/services/files.service';
import { saveAs } from 'file-saver';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { Product } from '../../submit-product/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { GrantType } from '../../manage-proposals/models/grant-type.enum';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})

export class MyProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  grantTypesKeys = this.getGrantTypeKeys();
  GrantTypeEnum = GrantType;

  constructor(
    private productsService: ProductsService,
    private filesService: FilesService
  ) {}

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts() {
    this.products$ = this.productsService.getUserProducts();
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

  getGrantTypeKeys(): string[] {
    let grantTypesKeys: string[] = Object.values(GrantType);
    grantTypesKeys.push("project supervision by data scientist");
    grantTypesKeys.push("VATAT");
    return grantTypesKeys;
  }

  clear(table: Table) {
    table.clear();
  }
}
