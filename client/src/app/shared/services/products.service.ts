import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenStorageService } from 'src/app/auth/services/token-storage.service';
import { Product } from 'src/app/pages/submit-product/interfaces/product.interface';
import { environment } from 'src/environments/environments';
import { CustomFieldRaw } from '../models/new-field-raw.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  apiUrl = environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private tokenService: TokenStorageService
  ) { }

  getAllProducts() {
      const { href } = new URL(`/api/product`, this.apiUrl);
      const token = this.tokenService.getToken();
      return this.http.get<Product[]>(href, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  }

  // get products from api by user email
  getUserProductsByUser(email: string) {
    const { href } = new URL(`/api/product/?email=${email}`, this.apiUrl);
      const token = this.tokenService.getToken();
      return this.http.get<Product[]>(href, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  }

  // get products of logged in user from api by email
  getUserProducts() {
    const { href } = new URL(`/api/product/logged-user`, this.apiUrl);
    const token = this.tokenService.getToken();
    return this.http.get<Product[]>(href, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  /**
   *
   * @param product product to update
   * @param fields new fields to add to product
   * @returns updated product with new fields
   */
  updateCustomFields(product: Product, fields: CustomFieldRaw[]) {
    const { href } = new URL(
      `/api/product/add-fields/${product._id}`,
      this.apiUrl
    );
    const token = this.tokenService.getToken();
    return this.http.patch<Product>(
      href,
      { fields },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  updateProductBlogStatus(
    id: string,
    blogStatus: 'APPEARED_IN_RESEARCH_BLOG' | 'TO_APPEAR_IN_BLOG' | 'SENT_A_DRAFT' | 'DID_NOT_SUBMIT' |
    'SENT_REMINDERS'
  ) {
    const { href } = new URL(
      `/api/product/update-blog-status/${id}`,
      this.apiUrl
    );
    const token = this.tokenService.getToken();
    return this.http.patch<Product>(
      href,
      { blogStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

}

