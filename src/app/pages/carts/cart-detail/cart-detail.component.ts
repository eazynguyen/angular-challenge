import { Component, OnInit } from '@angular/core';
import { ICart } from '../../../interfaces/cart';
import { CartsService } from '../../../services/carts.service';
import { AlertService } from '../../../services/-alert.service';
import { ActivatedRoute } from '@angular/router';
import { catchError, finalize, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss'],
})
export class CartDetailComponent implements OnInit {
  cart: ICart = null as any;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private cartsService: CartsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.isLoading = true;
    this.route.params
      .pipe(
        switchMap(({ id }) =>
          this.cartsService.getOne(+id).pipe(
            tap((result) => {
              this.cart = result;
            }),
            finalize(() => (this.isLoading = false)),
            catchError((error: HttpErrorResponse) =>
              this.alertService.error(error.error.message || error.message)
            )
          )
        )
      )
      .subscribe();
  }
}
