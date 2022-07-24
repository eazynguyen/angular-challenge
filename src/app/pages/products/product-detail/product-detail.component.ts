import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { IProduct } from '../../../interfaces/product';
import { ILoadingStatus } from '../../../interfaces/loading-status';
import {
  BehaviorSubject,
  catchError,
  finalize,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { AlertService } from '../../../services/-alert.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  private subject$ = new Subject();
  private state$ = new BehaviorSubject<ProductState>({
    product: null as any,
    isLoading: ILoadingStatus.Idle,
  });
  vm$ = this.state$.asObservable();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productsService: ProductsService,
    private alertService: AlertService
  ) {
    this.patchState({ isLoading: ILoadingStatus.Pending });
  }

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy() {
    this.subject$.complete();
    this.state$.complete();
  }

  private getProduct() {
    this.route.params
      .pipe(
        takeUntil(this.subject$),
        switchMap(({ slug }) => {
          if (!slug) return of('');

          return this.productsService.getOne(slug).pipe(
            tap((product) =>
              this.patchState({
                product: product,
              })
            ),
            finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
            catchError((error: HttpErrorResponse) =>
              this.alertService.error(error.error.message || error.message)
            )
          );
        })
      )
      .subscribe();
  }

  private patchState({ product, isLoading }: Partial<ProductState>) {
    of('')
      .pipe(
        takeUntil(this.subject$),
        withLatestFrom(this.state$),
        tap(([, state]) => {
          this.state$.next({
            ...state,
            product: product || state.product,
            isLoading: isLoading || state.isLoading,
          });
        })
      )
      .subscribe();
  }
}

interface ProductState {
  product: IProduct;
  isLoading: ILoadingStatus;
}
