import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output,} from '@angular/core';
import {IProduct} from '../../../interfaces/product';
import {
  BehaviorSubject,
  catchError,
  concatMap,
  finalize,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
  withLatestFrom,
} from 'rxjs';
import {ProductsService} from '../../../services/products.service';
import {AlertService} from '../../../services/-alert.service';
import {HttpErrorResponse} from '@angular/common/http';
import {ILoadingStatus} from "../../../interfaces/loading-status";

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDeleteComponent implements OnInit, OnDestroy {
  @Input() product: IProduct = null as any;
  @Output() onClose = new EventEmitter<boolean>(false);

  private subject$ = new Subject();
  private state$ = new BehaviorSubject<ProductState>({
    product: null as any,
    isLoading: ILoadingStatus.Idle,
  });

  vm$ = this.state$.asObservable();

  constructor(
    private productsService: ProductsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.patchState({ product: this.product });
  }

  ngOnDestroy() {
    this.state$.complete();
    this.subject$.complete();
  }

  closeDialog(status = false) {
    this.onClose.emit(status);
  }

  deleteProduct() {
    of('')
      .pipe(
        takeUntil(this.subject$),
        tap(() => this.patchState({ isLoading: ILoadingStatus.Pending })),
        withLatestFrom(this.state$),
        switchMap(([, { product }]) =>
          this.productsService.delete(+product.id).pipe(
            tap(() => this.closeDialog(true)),
            finalize(() => this.patchState({ isLoading: ILoadingStatus.Done })),
            concatMap(() => this.alertService.success('Delete Successfully!')),
            catchError((error: HttpErrorResponse) =>
              this.alertService.error(error.error.message || error.message)
            )
          )
        )
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
