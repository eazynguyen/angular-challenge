import { Injectable } from '@angular/core';
import { BaseService } from './-base.service';
import { ICart, ICartResponse } from '../interfaces/cart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartsService extends BaseService<ICartResponse, ICart> {
  constructor(http: HttpClient) {
    super(http, 'carts');
  }
}
