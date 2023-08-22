import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FilesService } from 'src/app/files/services/files.service';
import { saveAs } from 'file-saver';
import { BudgetPart } from 'src/app/shared/models/budget-part.interface';
import { Product } from '../../submit-product/interfaces/product.interface';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})

export class MyProductsComponent implements OnInit {
  products$: Observable<Product[]>;

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
}
