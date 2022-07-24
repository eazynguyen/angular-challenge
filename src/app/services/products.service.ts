import {Injectable} from '@angular/core';
import {BaseService} from './-base.service';
import {IProduct, IProductResponse} from '../interfaces/product';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Params} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService<IProductResponse, IProduct> {
  constructor(http: HttpClient) {
    super(http, 'products');
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.url}/products/categories`);
  }

  searchProduct(params: Params) {
    return this.http.get(`${this.url}/products/search`, { params });
  }
}
