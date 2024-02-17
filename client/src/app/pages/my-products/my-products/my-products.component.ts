import { Component, OnInit } from '@angular/core';
import { Observable, delay, finalize } from 'rxjs';
import { Product } from '../../submit-product/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';
import { GrantType } from '../../manage-proposals/models/grant-type.enum';
import { Table } from 'primeng/table';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss'],
})
export class MyProductsComponent implements OnInit {
  downloadUrl = environment.apiUrl + '/api/file/download/';

  products$: Observable<Product[]>;
  grantTypesKeys = this.getGrantTypeKeys();
  GrantTypeEnum = GrantType;

  loading = true;
  rowsSkeleton = new Array(5);
  colsSkeleton = new Array(8);

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.initProducts();
  }

  initProducts() {
    this.loading = true;
    this.products$ = this.productsService.getUserProducts().pipe(
      delay(1500),
      finalize(() => {
        this.loading = false;
      })
    );
  }

  getGrantTypeKeys(): string[] {
    let grantTypesKeys: string[] = Object.values(GrantType);
    grantTypesKeys.push('project supervision by data scientist');
    grantTypesKeys.push('VATAT');
    return grantTypesKeys;
  }

  clear(table: Table) {
    table.clear();
  }
}
