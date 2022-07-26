import { Component, OnInit } from '@angular/core';
import { ICart } from '../../../interfaces/cart';
import { CartsService } from '../../../services/carts.service';
import { PAGE_LIMIT } from '../../../utils/constant';
import { IPagination } from '../../../interfaces/response';
import { catchError, finalize, tap } from 'rxjs';
import { AlertService } from '../../../services/-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss'],
})
export class CartsComponent implements OnInit {
  carts: ICart[] = [];
  pagination: IPagination = null as any;
  isLoading = false;

  constructor(
    private cartsService: CartsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getCarts();
  }

  getCarts(page = '0') {
    this.isLoading = true;
    this.cartsService
      .getPagination(page, PAGE_LIMIT)
      .pipe(
        tap((result) => {
          this.carts = result.carts;
          this.pagination = {
            currentPage: Math.floor(+page / PAGE_LIMIT),
            totalPage: Math.ceil(result.total / PAGE_LIMIT),
            totalResult: result.total,
          };
        }),
        finalize(() => (this.isLoading = false)),
        catchError((error: HttpErrorResponse) =>
          this.alertService.error(error.error.message || error.message)
        )
      )
      .subscribe();
  }

  goToPage(index: number): void {
    this.getCarts(`${index * PAGE_LIMIT}`);
  }
}
