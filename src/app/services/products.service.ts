import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

const PRODUCT_ROUTE = environment.host;
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private _httpClient: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(PRODUCT_ROUTE + '/products');
  }
  getSelectedProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(
      PRODUCT_ROUTE + '/products?selected=true'
    );
  }
  getAvailableProducts(): Observable<Product[]> {
    return this._httpClient.get<Product[]>(
      PRODUCT_ROUTE + '/products?available=true'
    );
  }
  getSearchProducts(keyword: string): Observable<Product[]> {
    return this._httpClient.get<Product[]>(
      PRODUCT_ROUTE + '/products?name_like=' + keyword
    );
  }

  select(product: Product): Observable<Product> {
    product.selected = !product.selected;
    return this._httpClient.put<Product>(
      PRODUCT_ROUTE + '/products/' + product.id,
      product
    );
  }

  deleteProduct(product: Product): Observable<void> {
    return this._httpClient.delete<void>(
      PRODUCT_ROUTE + '/products/' + product.id
    );
  }
}
